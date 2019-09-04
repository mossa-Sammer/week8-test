// Write a query to get the user and their password from the database
const connection = require('../config/connection');

const queryUser = ({email}) => {
  const sql = {
    text:"SELECT email, password FROM users WHERE email=$1",
    values :[
      email
    ]
  }
  return connection.query(sql);
}
module.exports = queryUser;
