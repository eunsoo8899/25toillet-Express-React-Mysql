
const db = require('../components/db')

module.exports.insert = async (connection, options) => {
    console.log('options : ',options)    
    let query = 'INSERT INTO users SET ?'
    let values = options;        
    return await db.query({
        connection:connection,
        query:query,
        values:values
    })  
};

module.exports.update = async (connection, options) => {
    console.log('options : ',options)
    let query = 'UPDATE users SET ? WHERE users_id = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: [options, options.users_id]
    })  
};

module.exports.delete = async (connection, options) => {
    console.log('options : ',options.users_idx) // {idx :2, name:'ssdf'}
    let query = 'DELETE FROM users WHERE users_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: options.users_idx
    })  
};


module.exports.getList = async (options) => {
    const {
        users_idx,
        users_id
    } = options
    let query = 'SELECT * FROM users '
    // let query = 'SELECT * FROM users WHERE 1=1 '
    let values = [];    
    let keys = Object.keys(options)
    if(users_idx) {
        query += ' WHERE users_idx = ?'
        values.push(users_idx)
    }
    if(users_id) {
        if(keys.length == 1){
            query += ' WHERE users_id = ?'
            values.push(users_id)
        } else {
            query += ' AND users_id = ?'
            values.push(users_id)
        }        
    }    
    return await db.query({
        // connection:connection,
        query:query,
        values:values
    })    
};
