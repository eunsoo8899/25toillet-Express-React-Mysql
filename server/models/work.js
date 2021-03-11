const db = require('../components/db')

module.exports.insert = async (connection, options) => {
    console.log('options : ',options)    
    let query = 'INSERT INTO work SET ?'
    let values = options;        
    return await db.query({
        connection:connection,
        query:query,
        values:values
    })  
};

module.exports.update = async (connection, options) => {
    console.log('options : ',options) // {idx :2, name:'ssdf'}
    let query = 'UPDATE work SET ? WHERE work_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: [options, options.work_idx]
    })  
};

module.exports.delete = async (connection, options) => {
    console.log('options : ',options.idx) // {idx :2, name:'ssdf'}
    let query = 'DELETE FROM work WHERE work_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: options.work_idx
    })  
};

module.exports.getList = async (options) => {
    console.log('options : ',options)
    const {
        work_idx
    } = options
    let query = 'SELECT * FROM work'
    let values;    
    if(work_idx) {
        query += ' WHERE work_idx = ?'
        values = work_idx
    }
    return await db.query({
        // connection:connection,
        query:query,
        values:values
    })    
};


