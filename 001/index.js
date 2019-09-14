const express = require('express'),
    app = express(),
    {GraphQLSchema,GraphQLObjectType,GraphQLString} = require('graphql')


// esta instancia require de una configuracion
// esta configuracion será la definición de nuestro schema
// que nosostros indiquemos que tipos de solicitudes podemos responder
// que tipos de datos tenemos , cuales son los tipos de propiedad de cada objeto
const schema = new GraphQLSchema({
    query:new GraphQLObjectType({
        name:'RootQueryType',
        fields:{
            message:{
                type:GraphQLString,
                resolve(){
                    
                }
            }
        }
    })
})




app.get('/',(req,res)=>{
    res.json({
        ok:true,
        message:'asdasd'
    })
})

// existen dos formas de crear schemas en graphql : con objetos o con build schema 


app.listen(8080)