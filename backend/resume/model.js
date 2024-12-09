const db = require("../db");

function get_user_resume(user_id){
    const params = [user_id];
    const sql = "SELECT * FROM resume WHERE user_id = ?";
    return new Promise((resolve,reject)=>{
        db.getConnection((err,connection)=>{
            if(err){
                reject(err);
                return;
            }
            connection.query(sql, params, (err,results) =>{
                connection.release();
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            })
        })
    })
}

function add_user_resume(user_id,username,birthdate,education,residence,license,introduction,phone){
    const params = [user_id,username,birthdate,education,residence,license,introduction,phone];
    const sql = "INSERT INTO resume (user_id,username,birthdate,education,residence,license,introduction,phone) VALUES (?,?,?,?,?,?,?,?)";
    return new Promise((resolve,reject)=>{
        db.getConnection((err,connection)=>{
            if(err){
                reject(err);
                return;
            }
            connection.query(sql, params, (err,results) =>{
                connection.release();
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            })
        })
    })
}

function update_user_resume(user_id,username,birthdate,education,residence,license,introduction,phone){
    const params = [username,birthdate, education, residence, license, introduction, phone, user_id];
    console.log("params",params)
    const sql = "UPDATE resume SET username = ?,birthdate = ?, education = ?,residence = ?,license = ?,introduction = ?, phone = ? WHERE user_id = ?";
    console.log(birthdate)
    return new Promise((resolve,reject)=>{
        db.getConnection((err,connection)=>{
            if(err){
                reject(err);
                return;
            }
            connection.query(sql, params, (err,results) =>{
                connection.release();
                if (err) {
                    console.error("SQL execution error:", err.message);
                    reject(err);
                } else {
                    console.log("SQL execution results:", results);
                    resolve(results);
                }
            })
        })
    })
}

function delete_user_resume(user_id){
    
}

module.exports = {get_user_resume, add_user_resume, update_user_resume, delete_user_resume}