const mongoose = require('mongoose')

const { Schema } = mongoose
/**
 * Relacion de cursos y usuarios (profesor)
 * 
 * Un profesor puede impartir varios cursos
 * pero un curso solo le pertenece a un porfesor
 * 
 * 1 - M
 * 
 * para ello se utilizará documentos embebido y no en referencia
 * https://github.com/MaurickThom/MongoDB/blob/master/INSTAGRAM.md
 * https://mongoosejs.com/docs/populate.html
 * https://stackoverflow.com/questions/11117854/many-to-many-mapping-with-mongoose
 */

const courseSchema = new Schema({
    title:String,
    views:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model('Course',courseSchema)

