const courseTypes = `
    type Course{
        id:ID!
        title:String!
        views:Int
        user:User
    }
    input CourseInput{
        title:String
        views:Int
    }
    extend type Query{
        getAllCourses(page:Int,limit:Int):[Course]
        getCourseById(id:ID!):Course
    }
    input InputAddUser{
        idCourse:ID!
        idUser:ID!
    }
    extend type Mutation {
        addCourse(title:String!,views:Int,user_id:ID!):Course!
        updateCourse(id:ID!,courseInput:CourseInput):Course!
        deleteCourse(id:ID!):String
    }
`

module.exports = {
    courseTypes
}