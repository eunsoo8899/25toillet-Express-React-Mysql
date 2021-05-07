const db = require('../components/db')



module.exports.insert = async (connection, options) => {
    console.log('options : ',options)    
    let query = 'INSERT INTO images SET ?'
    let values = options;        
    return await db.query({
        connection:connection,
        query:query,
        values:values
    })  
};

module.exports.profile = async (connection, options) => {
    console.log('options : ',options)    
    let query = 'UPDATE users SET ? WHERE users_id = ?'
    let values = options;        
    return await db.query({
        connection:connection,
        query:query,
        values:[options, options.users_id]
    })  
};

module.exports.update = async (connection, options) => {
    console.log('options : ',options) // {idx :2, name:'ssdf'}
    let query = 'UPDATE images SET ? WHERE images_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: [options, options.images_idx]
    })  
};

module.exports.delete = async (connection, options) => {
    console.log('options : ',options.idx) 
    let query = 'DELETE FROM images WHERE images_idx = ?'    

    if(idx_array){
        whereClause += ` AND images_idx IN (?)`
        values.push(idx_array)
    }

    return await db.query({
        connection:connection,
        query:query,
        values: options.images_idx
    })  
};


module.exports.getList = async (options) => {
    console.log('options : ',options)
    try {
        const {
            users_idx,
            users_id
        } = options
        let query = 'SELECT * FROM images'
        let values;    
        if(users_idx) {
            query += ' WHERE users_idx = ?'
            values = users_idx
        }
        if(users_id) {
            query += ' WHERE users_id = ?'
            values = users_id
        }
        
        return await db.query({
            // connection:connection,
            query:query,
            values:values
        })    
    } catch (err) {
        throw new Error(err)
    }
};


module.exports.multipleInsert = async (options, connection) => {
    try{
        
        
        let sql = `INSERT INTO images
                                (
                                    users_idx, 
                                    img_path
                                ) 
                    VALUES ?`

        return await db.query({
            connection: connection,
            sql: sql,
            values: [options]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getRecently = async () => {    
    try {        
        let query = 'SELECT * FROM images order by images_idx DESC limit 0, 12'
        let values;

        return await db.query({
            // connection:connection,
            query:query,
            values:values
        })    
    } catch (err) {
        throw new Error(err)
    }
};