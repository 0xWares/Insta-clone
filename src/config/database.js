const mongoose = require('mongoose')

async function connectToDB(){
    try{
        mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Database initialized successfully');
            
        })
    }catch(e){
        console.log('Database initialization failed', e);
        
    }
}

module.exports = connectToDB