
const db = require('../components/db')

module.exports.insert = async (connection, options) => {
    console.log('options : ',options)    
    let query = 'INSERT INTO review SET ?'
    let values = options;        
    return await db.query({
        connection:connection,
        query:query,
        values:values
    })  
};

module.exports.update = async (connection, options) => {
    console.log('options : ',options) // {idx :2, name:'ssdf'}
    let query = 'UPDATE review SET ? WHERE review_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: [options, options.review_idx]
    })  
};

module.exports.delete = async (connection, options) => {
    console.log('options : ',options.idx) // {idx :2, name:'ssdf'}
    let query = 'DELETE FROM review WHERE review_idx = ?'    
    return await db.query({
        connection:connection,
        query:query,
        values: options.review_idx
    })  
};

module.exports.getList = async (options) => {
    console.log('options : ',options)
    try {

        const {
            review_idx,
            goods_idx,
            user_idx
        } = options
        let query = 'SELECT * FROM review'
        let values = [];   
        const keys = Object.keys(options)
        console.log('keys : ',keys)
        if(keys && keys.length > 0){
            for(let i=0;i<keys.length;i++){
                if(i==0){
                    query += ` WHERE ${keys[i]} = ?`                    
                    values.push(options[keys[i]])
                } else {
                    query += ` AND ${keys[i]} = ?`
                    values.push(options[keys[i]])
                }            
            }
        }    
        return await db.query({            
            query:query,
            values:values
        })    
    } catch (err) {
        throw new Error(err)
    }
    
};


