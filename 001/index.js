const express = require('express'),
    app = express(),
    {GraphQLSchema,GraphQLObjectType,GraphQLString,graphql} = require('graphql')


// esta instancia require de una configuracion
// esta configuracion será la definición de nuestro schema
// que nosostros indiquemos que tipos de solicitudes podemos responder
// que tipos de datos tenemos , cuales son los tipos de propiedad de cada objeto
const schema = new GraphQLSchema({
    query:new GraphQLObjectType({
        name:'RootQueryType',
        fields:{ // definir los campos de los cuales se compone este objeto
            message:{
                type:GraphQLString,
                resolve(){ //esta funcion tiene que indicar como se debe de responder cuando se solicite este mensaje
                    return 'Hello world'
                }
            }
        }
    })
})




app.get('/',async (req,res)=>{

    // esta funcion nos permite hacer consultas a nuestro schema
    // como primer parametro se le pasa el schema que se va a consultar
    // y como segundo parametro el query o la consulta que se va a realizar
    // graphql(schema,`{
    //     message
    // }`).then(response=>res.json(response))

    const response = await graphql(schema,`{message}`)


    res.json(response)
})

// existen dos formas de crear schemas en graphql : con objetos o con build schema 


app.listen(8080)

/**
 * Primero se define un schema
 * Luego de que tipos seran los campos que podamos solicitar del lado del cliente
 */