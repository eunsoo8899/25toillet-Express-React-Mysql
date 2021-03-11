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
    let query = 'UPDATE board SET ? WHERE board_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: [options, options.board_idx]
    })  
};

module.exports.delete = async (connection, options) => {
    console.log('options : ',options.idx) // {idx :2, name:'ssdf'}
    let query = 'DELETE FROM board WHERE board_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: options.board_idx
    })  
};

module.exports.getList = async (options) => {
    console.log('options : ',options)
    const {
        board_idx
    } = options
    let query = 'SELECT * FROM board'
    let values;    
    if(board_idx) {
        query += ' WHERE board_idx = ?'
        values = board_idx
    }
    return await db.query({
        // connection:connection,
        query:query,
        values:values
    })    
};


