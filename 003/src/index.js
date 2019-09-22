// Mocking de datos : Esto es una tecnica la cual consiste
// en hacer pasar datos como si fueran los verdaderos para realizar el testeo de la app

const express = require('express'),
    app = express(),
    {buildSchema} = require('graphql'),
    graphqlHttp = require('express-graphql'),
    courses = require('./courses')

app.set('port',process.env.PORT || 8080)


const schema = buildSchema(`
    type Course{
        id:ID!
        title:String!
        views:Int
    }
    type Query{
        getAllCourses:[Course!]!
        getCourseById(id:ID!):Course
    }
    type Message{
        message:String!
    }
    Type Mutation{
        addCourse(title:String!,views:Int):Course!
        deleteCourse(id:ID!):Message
    }
`)
const rootV = {
    getAllCourses(){
        return courses
    },
    getCourseById({ id }){
        return courses.find(course=>course.id===id)
    },
    addCourse({title,views}){
        let isNaN = !Number(courses.slice(-1)[0])
        let id =  isNaN ?
            "1" : String(isNaN++)
        const course = {
            id,
            title,
            views
        }
        courses.push(course)
        return course
    }
}

// middleware
/**
 * Este middleware lo que hará es montar un `servidor` en nuestro propio 
 * servidor
 */
app.use('/graphqlapi',graphqlHttp({
    schema,
    rootValue:{ // dentro de este objeto tiene que ir lo resolvers
                // los resolvers deben tener el mismo nombre
                // que nuestro query para que haga match
        ...rootV
    },
    graphiql:true // este es una interfaz grafica que nos permitira
                    // realizar consultas graphql a nuestro servidor
}))

app.listen(app.get('port'),err=>{
    if(err) return console.log('Ocurrio un error ',err)
    console.log(`corriendo en el puerto ${app.get('port')}`) 
})
