// Write a query to add the user and their password to the database
const connection = require('../config/connection');


const insertUser = (data)=>{

  const sql = {
    text:"INSERT INTO users (email,password) VALUES ($1,$2) returning *",
    values:[
      data.email,
      data.password
    ]
  }
  return connection.query(sql);
};

module.exports = insertUser;
