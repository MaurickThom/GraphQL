const CourseModel = require('./../models/course')
const { Schema:{Types:{ObjectId}} } = require('mongoose')
const UserModel = require('../models/course')
const courseResolver = {
    Query:{
        async getAllCourses(obj,{page,limit}){
            if(!limit && !page)
                return await CourseModel.find() //.populate('user')
            page = page || 1
            const start = limit*(page - 1)
            return await CourseModel.find()
                                    //.populate('user')
                                    .skip(start)
                                    .limit(limit)
        },
        async getCourseById(obj,{id}){
            // const course = courses.find(course=>course.id === id)
            const course = await CourseModel.findById(id) //.populate('user')
            if(!course) return {
                err:{
                    message:`El curso con el id ${id} no existe`
                }
            }
            return course
        }
    },
    Mutation:{
        async addCourse(obj,{title,views,user}){
            const course = {
                title,
                views,
                user
            }       
            const userObj = await UserModel.findById(user)
            const newCourse = new CourseModel(course)
            await newCourse.save()
            userObj.courses.push(newCourse)
            await userObj.save()
            return newCourse
        },
        async updateCourse(obj,{id,courseInput}){
            const updatedCourse = await CourseModel.findByIdAndUpdate(id,{...courseInput})
            return updatedCourse
        },
        async deleteCourse(obj,{id}){
            const deletedCourse = await CourseModel.findByIdAndRemove(id)
            return 'Course removed'
        }
    },
    // resolvers personalizados
    Course:{ // hace referencia al Type User
        async user(parentCourse){ // campo
            // return [{title:"Hello world"}]
            return await UserModel.find({ // para esto ya no es necesario populate
                _id: parentCourse.user // lo que está pasando en que si en mi query no necesito el campo user este resolver
                    // nunca se ejecutará por lo que la data será mas ligera
            })
        }
    }
}


/**
 db.courses.update({_id:ObjectId("5e4620ff5412ee2e44545100")},{"$set":{"users":[]}})
 */


module.exports = {
    courseResolver
}