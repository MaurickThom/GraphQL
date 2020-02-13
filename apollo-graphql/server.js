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
    type Query{
        getAllCourses(page:Int,limit:Int):[Course]
        getCourseById(id:ID!):Course
    }
`
// definicion de schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers: { // este objeto nos dirá como tiene que actuar los queries y las mutaciones
        Query:{
            getAllCourses(){ // cada función dentro de query necesita 4 argumentos
            /**
             * primero -> obj : Está el objeto que contiene el resultado retornado por el resolver del padre
                * rootValue : resolver del padre
                    * si quisiera crear un resolver para title del tipo Course , el rootValue serían todos los 
                    queries que contengan el tipo donde se encuentra la propiedad que corresponde al resolver (title) , entonces los primeros providers en ejecutarse seria los rootValue
             * 
             * 
             * 
             */

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