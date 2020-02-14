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
 */

const courseSchema = new Schema({
    title:String,
    views:Number
})

module.exports = mongoose.model('Course',courseSchema)

