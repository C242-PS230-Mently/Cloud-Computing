import { User,UserNotif } from "../../models/UserModel.js";
import {nanoid} from 'nanoid';
import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { editPass, joiEdit } from "../auth/validator.js";
import { getServiceAccountKey } from "../auth/secret.js";



export const getProfileByToken = async (req,res) =>{
  const user = req.user;  

  try {

    const userData = await User.findOne({
      where: { id: user.id },  
    });

    if (!userData) {
      return res.status(404).json({ message: 'User Tidak Ditemukan.' });
    }

    return res.status(200).json({
      message: 'User profile fetched successfully',
      data: {
        fullName: user.full_name,
        username: user.username,
        email: user.email,
        age: user.age,
        gender: user.gender
        
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export const getDashboardById = (req, res) => {

    const { user } = req;
    const greetMessage = `Hai,${user.username}!`
    return res.status(200).json({
        msg: 'Dashboard data',
        greet: greetMessage,
        userId: user.id,
        username: user.username,
        fullName: user.full_name,
        email: user.email,
    });
};

export const getNotifications = async (req, res) => {
    const { user } = req; 


    if (!user) {
        return res.status(401).json({ msg: 'No user logged in. Cannot retrieve notifications.' });
    }

    try {
    
        const notifications = await UserNotif.findAll({
            where: { user_id: user.id },
            order: [['createdAt', 'DESC']]
        });

        
        if (notifications.length === 0) {
            return res.status(404).json({ msg: 'No notifications found for this user.' });
        }

        
        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

export const createNotification = async ({ user_id, notif_type, notif_content, is_read, createdAt, updatedAt }) => {
    try {
        await UserNotif.create({
            notif_id: nanoid(21), 
            user_id,
            notif_type,
            notif_content,
            is_read,
            createdAt,
            updatedAt
        });
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};


const limitPhoto =  2097152 ;
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage,
          limits: {fileSize: limitPhoto}
 });

 async function initializeStorage() {
  const serviceAccount = getServiceAccountKey();
  const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    credentials: serviceAccount, 
  });

  const bucket = storage.bucket(process.env.GCLOUD_BUCKET);

  
  return { storage, bucket };
}


export const updatePhoto = async (req, res) => {
  upload.single('file')(req, res, async (err) => {
    const { bucket } = await initializeStorage();

    // Handle file size limit error
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send({
          error: 'File terlalu besar. Maksimal ukuran file adalah 2 MB.',
        });
      }
      return res.status(500).send({ error: err.message });
    }

    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).send({
        error: 'Tidak ada file yang diupload. Pastikan file disertakan.',
      });
    }

    // Check if more than one file is uploaded
    if (req.files) {
      return res.status(400).send({
        error: 'Hanya diperbolehkan mengupload satu file. Pastikan hanya satu file yang dipilih.',
      });
    }

    const user = req.user;  
    const userId = user.id;  

    try {
      const blob = bucket.file(`userProfile/${userId}-profile-pic-${Date.now()}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: req.file.mimetype,
      });

      // Log when the stream starts
      console.log('Stream started');
      
      blobStream.on('finish', async () => {
        console.log('Stream finished');
        const publicUrl = `https://storage.googleapis.com/${process.env.GCLOUD_BUCKET}/${blob.name}`;

        // Update the user profile with the uploaded image URL
        await User.update(
          { profile_photo: publicUrl },
          { where: { id: userId } }
        );

        res.status(200).send({
          message: 'Foto profil berhasil diupload.',
          url: publicUrl,
        });
      });

      blobStream.on('error', (err) => {
        console.error('Stream error:', err);  
        res.status(500).send({ error: err.message });
      });

      // Check if the file buffer exists before ending the stream
      if (!req.file.buffer) {
        return res.status(400).send({ error: 'File buffer is missing.' });
      }

      // Log the file buffer
      console.log('File buffer length:', req.file.buffer.length);

      // Write to the stream and end it
      console.log('Ending the stream');
      blobStream.end(req.file.buffer);  
    } catch (err) {
      console.error('Error uploading file:', err);   
      res.status(500).send({ error: err.message });
    }
  });
};





export const getprofileById = async (req, res) => {
  try {
    const userId = req.params.id; 
    console.log('User ID:', userId); 
    const user = await User.findByPk(userId);

    if (!user || !user.profile_photo) {
      return res.status(404).send({ message: 'Profile photo not found.' });
    }


    res.status(200).send({
      message: 'Profile photo found',
      url: user.profile_photo,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send({ message: 'Internal server error.' });
  }
};



export const editProfile = async (req, res) => {
  try {
    const user = req.user;

    const { full_name, email,username, gender, age } = req.body;

    if (email && email !== user.email) {
      const existMail = await User.findOne({ where: { email } });
      if (existMail) {
        return res.status(400).json({ msg: 'Email ini telah digunakan!' });
      }
    }

   
    if (username && username !== user.username) {
      const existUser = await User.findOne({ where: { username } });
      if (existUser) {
        return res.status(400).json({ msg: 'Username ini telah digunakan!' });
      }
    }
    const { error } = joiEdit.validate({ full_name, age,gender, email,username});
    if (error) return res.status(400).json({ msg: error.details[0].message });

    // Update user data
    user.full_name = full_name || user.full_name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.age = age || user.age;

    // Save changes
    await user.save();

    const userEdit = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      username: user.username,
      gender: user.gender,
      age: user.age
    }

    res.status(200).json({ message: 'Profile updated successfully', data: userEdit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const changePassword = async (req,res) =>{
  try {
    
    const user = req.user
    const {password} = req.body;

    const { error } = editPass.validate({ password});
    if (error) return res.status(400).json({ msg: error.details[0].message });

    const salt = await bcrypt.genSalt(10);
    const hashPassword =await bcrypt.hash(password,salt)

    user.password = hashPassword ;

    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
        console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const url='https://storage.googleapis.com/mently-bucket/gif/twittervid.com_hamukukka_123938.gif';







