const express = require('express'),
    app = express(),
    {GraphQLSchema,GraphQLObjectType,GraphQLString,graphql,GraphQLInt} = require('graphql');


const courseType = new GraphQLObjectType({
    name:'Course',
    fields:{
        title:{
            type:GraphQLString
        },
        views:{
            type:GraphQLInt
        }
    }
})



const schema = new GraphQLSchema({
    query:new GraphQLObjectType({
        name:'RootQueryType',
        fields:{
            message:{
                type:GraphQLString,
                resolve(){
                    return 'Hello world'
                }
            },
            course:{
                type:courseType,
                resolve(){
                    return {
                        title:'GraphQL',
                        views:1000
                    }
                }
            }
        }
    })
})

app.get('/',async(req,res)=>{
    const response = await graphql(schema,
        `{ 
            message, 
            course{ 
                title,
                views
            } 
        }`
    )

    res.json(response)
})

app.listen(8080)