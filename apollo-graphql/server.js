const { ApolloServer } = require('apollo-server')

const courses = require('./courses')

/* La definicion del schema en apollo utiliando las graphql-tools
    se compone en dos partes
    La defincion de los tipos y la definicion de los resolvers
*/

// definicion de schema
const { makeExecutableSchema } = require('graphql-tools')

// definicion de tipos
const typeDefs = `
    type Course{
        id:ID!
        title:String!
        views:Int
    }
    input CourseInput{
        title:String
        views:Int
    }
    type Query{
        getAllCourses(page:Int,limit:Int):[Course]
        getCourseById(id:ID!):Course
    }
    type Mutation {
        addCourse(title:String!,views:Int):Course!
        updateCourse(id:ID!,courseInput:CourseInput):Course!
        deleteCourse(id:ID!):String
    }
`
// definicion de schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers: { // este objeto nos dirá como tiene que actuar los queries y las mutaciones
        Query:{
            getAllCourses(obj,{page,limit}){ // cada función dentro de query necesita 4 argumentos
            /**
             * primero -> obj : Está el objeto que contiene el resultado retornado por el resolver del padre
                * rootValue : resolver del padre
                    * si quisiera crear un resolver para title del tipo Course , el rootValue serían todos los 
                    queries que contengan el tipo donde se encuentra la propiedad que corresponde al resolver (title) , entonces los primeros providers en ejecutarse seria los del rootValue
             * segundo args {} -> contiene los argumentos del query
             * context -> esto se definira para todos los resolvers es decir un ambiente en la cual todos los resolver
                            comiencen con un contexto en comun
             */
                if(!courses.length) return {
                    message:'La lista de curso está vacia'
                }
                if(!limit && !page)
                    return courses
                limit = limit || courses.length
                page = page || 1
                const start = limit*(page - 1)
                return courses.slice(start,start+limit)
            },
            getCourseById(obj,{id}){
                const course = courses.find(course=>course.id === id)
                if(!course) return {
                    err:{
                        message:`El curso con el id ${id} no existe`
                    }
                }
                return course
            }
        },
        Mutation:{
            addCourse(obj,{title,views}){
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
            updateCourse(obj,{id,courseInput}){
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
            deleteCourse(obj,{id}){
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
    }
})

// para correr el servidor , no se utilizará express
const server = new ApolloServer({
    schema : schema
})

// cuando el servidor este escuchando los request lanzará una promesa
// promesa que en cuando se resulva nos devolverá un objeto
server.listen().then(({url})=>console.log(`Servidor iniciado en ${url}`))


/**
 * 
 * mutation{
 *  addCourse(title:"asdasd",views:199){
 *  title
 *  views
 *  id
 * }
 * }
 * 
 */