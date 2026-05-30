const db = require('../config/db');

async function isCorrectUsername (value){
            
            const [rows] = await db.query('SELECT * from users where username = ?',[value]);
            console.log(rows.length)
            if (rows.length > 0) {
                throw new Error('username already exists');
            }
            return value.trim() !== '';
        }

async function isCorrectRole (value){
            const ok = ['client', 'admin'].includes(value.toLowerCase())
            
            return ok && value.trim() !== '';
        }
module.exports = {isCorrectUsername,isCorrectRole}