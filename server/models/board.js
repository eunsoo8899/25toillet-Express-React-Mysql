const db = require('../components/db')

module.exports.insert = async (connection, options) => {
    console.log('options : ',options)    
    let query = 'INSERT INTO board SET ?'
    let values = options;        
    return await db.query({
        connection:connection,
        query:query,
        values:values
    })  
};

module.exports.update = async (connection, options) => {
    console.log('options : ',options) // {idx :2, name:'ssdf'}
    let query = 'UPDATE board SET ? WHERE users_id = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: [options, options.users_id]
    })  
};

module.exports.delete = async (connection, options) => {
    console.log('options : ',options.idx) // {idx :2, name:'ssdf'}
    let query = 'DELETE FROM board WHERE users_id = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: options.users_id
    })  
};

module.exports.getList = async (options) => {
    console.log('options : ',options)
    const {
        users_id
    } = options
    let query = 'SELECT * FROM board'
    let values;    
    if(users_id) {
        query += ' WHERE users_id = ?'
        values = users_id
    }
    return await db.query({
        // connection:connection,
        query:query,
        values:values
    })    
};


