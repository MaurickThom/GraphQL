// Mocking de datos : Esto es una tecnica la cual consiste
// en hacer pasar datos como si fueran los verdaderos para realizar el testeo de la app

/**
 * Input types : Nos permiten definir tipos o estructuras
 * para argumentos que se vayan a recibir
 */

const express = require('express'),
    app = express(),
    {buildSchema} = require('graphql'),
    graphqlHttp = require('express-graphql')

let courses = require('./courses')

app.set('port',process.env.PORT || 8080)

const schema = buildSchema(`
    type Course{
        id:ID!
        title:String!
        views:Int
    }
    input CourseInput{
        title:String
        views:Int
    }
    type Message{
        content:String!
    }
    type Query{
        getAllCourses:[Course]
        getCourseById(id:ID!):Course
    }
    type Mutation {
        addCourse(title:String!,views:Int):Course!
        updateCourse(id:ID!,courseInput:CourseInput):Course!
        deleteCourse(id:ID!):String
    }
`)
const rootV = {
    getAllCourses(){
        if(!courses.length) return {
            message:'La lista de curso está vacia'
        }
        return courses
    },
    getCourseById({ id }){
        const course = courses.find(course=>course.id===id)
        if(!course) return {
            err:{
                message:`El curso con el id ${id} no existe`
            }
        }
        return course
    },
    addCourse({title,views}){
        let isNotNaN = Number(courses.slice(-1)[0].id)
        const lastID =  isNotNaN ? String(++isNotNaN):"1"
        const course = {
            id:lastID,
            title,
            views
        }
        courses.push(course)
        return course
    },
    updateCourse({id,courseInput}){
        const course = courses.find(course=>course.id===id)
        if(!course) return {
            err:{
                message:`El curso con el id ${id} no existe`
            }
        }
        const {title,views} = courseInput
        if(!title && !views ) return course
        !title ? course.views = views : course.title = title
        courses = courses.map(cours=>(
            cours.id===id ?
                course : cours
        ))
        return course
    },
    deleteCourse({id}){
        const course = courses.find(course=>course.id===id)
        if(!course) return {
            err:{
                message:`El curso con el id ${id} no existe`
            }
        }
        courses = courses.map(cours=>cours.id!==id)
        return "Eliminado"
    }
}

// middleware
/**
 * Este middleware lo que hará es montar un `servidor` en nuestro propio 
 * servidor
 */
app.use('/graphql-api',graphqlHttp({
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
