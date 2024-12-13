# Cloud Computing Repository
This repository is the Back-End for our Capstone Project
## Requirements
Node.js 20.18

## How to run this code
````bash
  npm start
````

  
root/
├── config/ 
│   └── database.js         # Database configuration (e.g., connection setup)
├── controller/             
│   ├── dashboard/    
│   │   └── routeDashboard.js   # Handles dashboard-related logic
│   ├── auth/
│   │   ├── Auth.js            # Authentication-related logic (login, register)
│   │   ├── forgotPass.js      # Password recovery logic
│   │   ├── secret.js          # Secret management (tokens, keys)
│   │   └── validator.js       # Validation for authentication inputs
│   ├── consult/  
│   │   ├── consult.js         # Consultation logic
│   │   ├── history.js         # Consultation history handling
│   │   └── question.js        # Handles questions related to consultation
│   ├── doctor/  
│   │   └── dokter.js          # Doctor-related logic (profile, appointments)
│   └── user/    
│       ├── Users.js           # User profile and management logic
│       └── notif.js           # User notifications logic
├── middleware/ 
│   └── checkAuth.js          # Middleware to check authentication
├── models/      
│   └── userModel.js          # User database schema/model
├── postman_test/    
│   ├── Postman_Collection    # API collection for Postman
│   └── Postman_Environment   # Postman environment configuration
├── routes/  
│   └── index.js              # Main route definitions
├── .gitignore                # Specifies files to ignore in Git
├── Dockerfile                # Docker configuration
├── README.md                 # Project documentation
└── package.json              # Project metadata and dependencies


