const courseTypes = `
    type Course{
        id:ID!
        title:String!
        views:Int
        users:[ID]
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
        addCourse(title:String!,views:Int):Course!
        updateCourse(id:ID!,courseInput:CourseInput):Course!
        deleteCourse(id:ID!):String
        addUserToTheCourseList(input:InputAddUser):Course
    }
`

module.exports = {
    courseTypes
}