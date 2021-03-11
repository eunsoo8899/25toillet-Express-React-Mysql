const db = require('../components/db')

module.exports.insert = async (connection, options) => {
    console.log('options : ',options)    
    let query = 'INSERT INTO about SET ?'
    let values = options;        
    return await db.query({
        connection:connection,
        query:query,
        values:values
    })  
};

module.exports.update = async (connection, options) => {
    console.log('options : ',options) // {idx :2, name:'ssdf'}
    let query = 'UPDATE about SET ? WHERE about_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: [options, options.about_idx]
    })  
};

module.exports.delete = async (connection, options) => {
    console.log('options : ',options.idx) // {idx :2, name:'ssdf'}
    let query = 'DELETE FROM about WHERE about_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: options.about_idx
    })  
};

module.exports.getList = async (options) => {
    console.log('options : ',options)
    const {
        about_idx
    } = options
    let query = 'SELECT * FROM about'
    let values;    
    if(about_idx) {
        query += ' WHERE about_idx = ?'
        values = about_idx
    }
    return await db.query({
        // connection:connection,
        query:query,
        values:values
    })    
};


