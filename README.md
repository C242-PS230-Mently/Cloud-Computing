# Cloud Computing Repository
This repository is the Back-End for our Capstone Project
## Requirements
Node.js 20.18

## How to run this code
````bash
  npm start
````

## Folder Structure
root/
├── config/ 
    └── database.js/  
├── controller/             
    ├── dashboard/    
        └──routeDashboard.js        
    ├── auth/
        ├──Auth.js
        ├──forgotPass.js
        ├──secret.js
        └──validator.js
    ├── consult/  
        ├──consult.js
        ├──history.js
        └──question.js
    ├── doctor/  
        └──dokter.js
    └── user/    
        ├──Users.js
        └──notif.js
├── middleware/ 
    └──checkAuth.js
├── models/      
    └──userModel.js
├── postman_test/    
    ├──Postman_Collection
    └──Postman_Environment
├── routes/  
    └──index.js
├── .gitignore              
├── Dockerfile              
├── README.md               
├── cloudbuild.yaml         
├── index.js                
└── package.json 
