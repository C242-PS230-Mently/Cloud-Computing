import { Sequelize } from "sequelize";

// Database Detail
const dbHost = process.env.DB_HOST;
const dbUser = "root";
const dbPass = "rexus";
const dbName = process.env.DB_NAME;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    
    dialect: "mysql",
    port: 3306,
    
    
});



// sequelize.sync({ alter: true,force: false })
//     .then(() => console.log("Database diupdate"))
//     .catch((error) => console.error("sinkronisasi gagal", error));



export default sequelize;       