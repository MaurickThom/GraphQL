const CourseModel = require('./../models/course')
const { Schema:{Types:{ObjectId}} } = require('mongoose')

const courseResolver = {
    Query:{
        async getAllCourses(obj,{page,limit}){
            if(!limit && !page)
                return await CourseModel.find()
            page = page || 1
            const start = limit*(page - 1)
            return await CourseModel.find()
                                    .skip(start)
                                    .limit(limit)
        },
        async getCourseById(obj,{id}){
            // const course = courses.find(course=>course.id === id)
            const course = await CourseModel.findById(id) 
            if(!course) return {
                err:{
                    message:`El curso con el id ${id} no existe`
                }
            }
            return course
        }
    },
    Mutation:{
        async addCourse(obj,{title,views}){
            const course = {
                title,
                views
            }            
            const newCourse = new CourseModel(course)
            await newCourse.save()
            return newCourse
        },
        async updateCourse(obj,{id,courseInput}){
            const updatedCourse = await CourseModel.findByIdAndUpdate(id,{...courseInput})
            return updatedCourse
        },
        async deleteCourse(obj,{id}){
            const deletedCourse = await CourseModel.findByIdAndRemove(id)
            return 'Course removed'
        },
        async addUserToTheCourseList(obj,{input}){
            console.log("TCL: addUserToTheCourseList -> idUser", input.idUser)
            console.log("TCL: addUserToTheCourseList -> idCourse", input.idCourse)
            
            const updateCourse = await CourseModel.updateOne({
                _id:input.idCourse
            },{
                $push :{ users: input.idUser}
            })
            console.log("TCL: addUserToTheCourseList -> updateCourse", updateCourse)
            return await CourseModel.findById(input.idCourse) 
        }
    }      
}


/**
 db.courses.update({_id:ObjectId("5e4620ff5412ee2e44545100")},{"$set":{"users":[]}})
 */


module.exports = {
    courseResolver
}