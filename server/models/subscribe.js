const db = require('../components/db')

module.exports.insert = async (connection, options) => {
    console.log('options : ',options)    
    let query = 'INSERT INTO subscribe SET ?'
    let values = options;        
    return await db.query({
        connection:connection,
        query:query,
        values:values
    })  
};

module.exports.update = async (connection, options) => {
    console.log('options : ',options) // {idx :2, name:'ssdf'}
    let query = 'UPDATE subscribe SET ? WHERE subscribe_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: [options, options.subscribe_idx]
    })  
};

module.exports.delete = async (connection, options) => {
    console.log('options : ',options.idx) // {idx :2, name:'ssdf'}
    let query = 'DELETE FROM subscribe WHERE subscribe_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: options.subscribe_idx
    })  
};

module.exports.getList = async (options) => {
    console.log('options : ',options)
    const {
        subscribe_idx
    } = options
    let query = 'SELECT * FROM subscribe'
    let values;    
    if(subscribe_idx) {
        query += ' WHERE subscribe_idx = ?'
        values = subscribe_idx
    }
    return await db.query({
        // connection:connection,
        query:query,
        values:values
    })    
};


