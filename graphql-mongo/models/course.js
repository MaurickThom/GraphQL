const mongoose = require('mongoose')

const { Schema } = mongoose
/**
 * Relacion de cursos y usuarios (alumno)
 * 
 * Un curso lo puede tomar muchos usuarios
 * Un usuario puede tomar muchos cursos
 * 
 * M - M
 * 
 * para ello se utilizará documentos en referencia y no embebidos
 * https://github.com/MaurickThom/MongoDB/blob/master/INSTAGRAM.md
 * https://mongoosejs.com/docs/populate.html
 * https://stackoverflow.com/questions/11117854/many-to-many-mapping-with-mongoose
 */

const courseSchema = new Schema({
    title:String,
    views:Number,
    users:[{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }]
})

module.exports = mongoose.model('Course',courseSchema)

