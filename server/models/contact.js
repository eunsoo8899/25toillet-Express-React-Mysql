const db = require('../components/db')

module.exports.insert = async (connection, options) => {
    console.log('options : ',options)    
    let query = 'INSERT INTO contact SET ?'
    let values = options;        
    return await db.query({
        connection:connection,
        query:query,
        values:values
    })  
};

module.exports.update = async (connection, options) => {
    console.log('options : ',options) // {idx :2, name:'ssdf'}
    let query = 'UPDATE contact SET ? WHERE contact_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: [options, options.contact_idx]
    })  
};

module.exports.delete = async (connection, options) => {
    console.log('options : ',options.idx) // {idx :2, name:'ssdf'}
    let query = 'DELETE FROM contact WHERE contact_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: options.contact_idx
    })  
};

module.exports.getList = async (options) => {
    console.log('options : ',options)
    const {
        contact_idx
    } = options
    let query = 'SELECT * FROM contact'
    let values;    
    if(contact_idx) {
        query += ' WHERE contact_idx = ?'
        values = contact_idx
    }
    return await db.query({
        // connection:connection,
        query:query,
        values:values
    })    
};


