const dotenv = require('dotenv').config()
const database = require('./src/config/database')
const app = require('./src/app')

database()

app.listen(3000, () => {
    console.log("Port is running on port: 3000");    
})