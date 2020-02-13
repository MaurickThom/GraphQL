const mongoose = require('mongoose')

const { Schema } = mongoose

const courseSchema = new Schema({
    title:String,
    views:Number
})

module.exports = mongoose.model('Course',courseSchema)

