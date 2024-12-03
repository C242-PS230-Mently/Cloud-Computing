import { Sequelize, DataTypes,Op } from "sequelize";
import sequelize from "../config/database.js";

export const User = sequelize.define("User", {
    id: { type: DataTypes.STRING, primaryKey: true },
    full_name: { type: DataTypes.STRING, allowNull: false },
    username: {type: DataTypes.STRING,allowNull: false},
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING },
    profile_photo: { type: DataTypes.STRING },
    gender: {type: DataTypes.ENUM('Laki Laki','Perempuan')},
    age: { type: DataTypes.INTEGER },
    gender: {type: DataTypes.ENUM('Laki Laki','Perempuan')},
    createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
}, {
    tableName: "user",
});

export const UserOtp = sequelize.define("UserOtp", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false },
    otp: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
}, {
    tableName: "user_otp",
});

export const UserNotif = sequelize.define("UserNotif", {
    notif_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.STRING, allowNull: false },
    history_id: { type: DataTypes.INTEGER, allowNull: true },
    notif_type: { type: DataTypes.STRING, allowNull: false },
    notif_content: { type: DataTypes.TEXT, allowNull: false },
    is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
}, {
    tableName: "User_notif",
});

export const Question = sequelize.define("Question", {
    question_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    question_text: { type: DataTypes.TEXT, allowNull: false },
    disorders_id: { type: DataTypes.INTEGER, allowNull: true },
}, {
    tableName: "question",
    timestamps: false,
});




// model dasboard
export const Article = sequelize.define('Article', {
    id: {type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true, allowNull: false},
    title: {type: DataTypes.STRING,allowNull: false},
    publisher: {type: DataTypes.STRING,allowNull: true},
    image_url: {type: DataTypes.STRING,allowNull: true},
    snippet: {type: DataTypes.TEXT,allowNull: true},
    full_article_link: {type: DataTypes.STRING,allowNull: false},
    created_at: {type: DataTypes.DATE,defaultValue: DataTypes.NOW},
    category: { type: DataTypes.ENUM('article', 'workshop'), allowNull: false },
}, {tableName: 'articles',timestamps: false});

// model Doctor
export const Doctor = sequelize.define('Doctor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false },
  specialization: { type: DataTypes.STRING(100), allowNull: false },
  image_url: { type: DataTypes.STRING(255), allowNull: false },
  location: { type: DataTypes.STRING(150), allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW, allowNull: true }
}, { tableName: 'doctors', timestamps: false });

export const Consultation = sequelize.define('Consultation', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    user_id: {type: DataTypes.STRING(255), allowNull: false, references: {model: User, key: 'id'}, onDelete: 'CASCADE', onUpdate: 'CASCADE'},
    predictions: {type: DataTypes.JSON, allowNull: false},
    created_at: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    total_consult: {type: DataTypes.STRING, allowNull: false}
}, {tableName: 'consultations', timestamps: false});
// export const Solution = sequelize.define('solutions',{
//     id: {type: DataTypes.}
// })

// Relasi with Constraints
User.hasMany(UserNotif, { foreignKey: { name: "user_id", allowNull: false }, onDelete: "CASCADE", onUpdate: "CASCADE" });
UserNotif.belongsTo(User, { foreignKey: { name: "user_id", allowNull: false }, onDelete: "CASCADE", onUpdate: "CASCADE" });

User.hasOne(UserOtp, { foreignKey: { name: "email", allowNull: false }, sourceKey: "email", onDelete: "CASCADE", onUpdate: "CASCADE" });
UserOtp.belongsTo(User, { foreignKey: { name: "email", allowNull: false }, targetKey: "email", onDelete: "CASCADE", onUpdate: "CASCADE" });



