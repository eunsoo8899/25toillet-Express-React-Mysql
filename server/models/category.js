
const db = require('../components/db')

module.exports.insert = async (connection, options) => {
    console.log('options : ',options)    
    let query = 'INSERT INTO category SET ?'
    let values = options;        
    return await db.query({
        connection:connection,
        query:query,
        values:values
    })  
};

module.exports.update = async (connection, options) => {
    console.log('options : ',options) // {idx :2, name:'ssdf'}
    let query = 'UPDATE category SET ? WHERE category_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: [options, options.category_idx]
    })  
};

module.exports.delete = async (connection, options) => {
    console.log('options : ',options.idx) // {idx :2, name:'ssdf'}
    let query = 'DELETE FROM category WHERE category_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: options.category_idx
    })  
};

module.exports.getList = async (options) => {
    console.log('options : ',options)
    const {
        category_idx
    } = options
    let query = 'SELECT * FROM category'
    let values;    
    if(category_idx) {
        query += ' WHERE category_idx = ?'
        values = category_idx
    }
    return await db.query({
        // connection:connection,
        query:query,
        values:values
    })    
};


