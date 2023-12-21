const mongoose = require("mongoose")
const mongodbUrl = "mongodb://localhost:27017/e-commerce"

const connectDb=()=>{
    return mongoose.connect(mongodbUrl)
}

module.exports={connectDb}