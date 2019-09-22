// Mocking de datos : Esto es una tecnica la cual consiste
// en hacer pasar datos como si fueran los verdaderos para realizar el testeo de la app

const express = require('express'),
    app = express(),
    {buildSchema} = require('graphql'),
    graphqlHtpp = require('express-graphql'),
    courses = require('./courses')

app.set('port',process.env.PORT || 8080)

// middleware
/**
 * Este middleware lo que hará es montar un `servidor` en nuestro propio 
 * servidor
 */


const schema = buildSchema(`
    type Course{
        id:ID!
        title:String!
        views:Int
    }
    type Query{
        getAllCourses:[Course!]!
        getCourseByID(id:Int!):Course!
    }
`)
const rootV = {
    getAllCoures(){
        return courses
    }
}

app.use('/graphqlapi',graphqlHtpp({
    schema,
    rootValue:{ // dentro de este objeto tiene que ir lo resolvers
                // los resolvers deben tener el mismo nombre
                // que nuestro query para que haga match
        ...rootV
    },
    graphiql:true // este es una interfaz grafica que nos permitira
                    // realizar consultas grapql a nuestro servidor
}))

app.listen(app.get('port'),err=>{
    if(err) return console.log('Ocurrio un error ',err)
    console.log(`corriendo en el puerto ${app.get('port')}`) 
})
