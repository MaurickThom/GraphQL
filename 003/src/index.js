const express = require('express'),
    app = express(),
    {buildSchema} = require('graphql')

app.use('port',process.env.PORT || 8080)

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



app.listen(app.get('port'),err=>{
    if(err) return console.log('Ocurrio un error ',err)
    console.log(`corriendo en el puerto ${app.get('port')}`) 
})