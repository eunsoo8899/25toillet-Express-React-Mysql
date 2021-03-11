const config = require('../config')
const mysql = require('mysql');

const pool  = mysql.createPool({
    connectionLimit : config.database.connectionLimit,
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
})


module.exports.beginTransaction = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) reject(err) // not connected!
            connection.beginTransaction(function(err) {
                if (err) { 
                    reject(err)
                }
                resolve(connection)
            })
        })        
    })
}


module.exports.getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) reject(err) // not connected!
            resolve(connection)            
        })        
    })
}

module.exports.query = async (options) => {
    const connection = options.connection ? options.connection : pool
    const query = options.query
    const values = options.values  
    // console.log('query : ',query)   
    // console.log('values : ',values)   
    return new Promise((resolve, reject) => {
        connection.query(
            query, 
            values, 
            function (error, result, fields) {
                // console.log('fields : ',fields)
                if (error) {
                    reject(error)
                }
                resolve(result)
               
            }
        )      
    })
}


module.exports.commit = (connection) => {
    return new Promise((resolve, reject) => {
        connection.commit(function(err) {
            
            if (err) {
               
                reject(this.rollback(connection)) 
            }
            connection.release()
            resolve()
        });   
    })
}
module.exports.rollback = (connection) => {
    return new Promise((resolve, reject) => {
        connection.rollback(function(err) {
            if(err){
                reject(err)
            } else {
                connection.release();
                resolve()
            }
            
        });
    })
}


