const db = require('../components/db')

module.exports.insert = async (connection, options) => {
    console.log('options : ',options)    
    let query = 'INSERT INTO profile SET ?'
    let values = options;        
    return await db.query({
        connection:connection,
        query:query,
        values:values
    })  
};

module.exports.update = async (connection, options) => {
    console.log('options : ',options) // {idx :2, name:'ssdf'}
    let query = 'UPDATE profile SET ? WHERE profile_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: [options, options.profile_idx]
    })  
};

module.exports.delete = async (connection, options) => {
    console.log('options : ',options.idx) // {idx :2, name:'ssdf'}
    let query = 'DELETE FROM profile WHERE profile_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: options.profile_idx
    })  
};

module.exports.getList = async (options) => {
    console.log('options : ',options)
    const {
        users_id
    } = options
    let query = 'SELECT * FROM profile'
    let values;    
    if(users_id) {
        query += ' WHERE users_id = ? ORDER BY profile_idx DESC'
        values = users_id
    }
    return await db.query({
        // connection:connection,
        query:query,
        values:values
    })    
};


