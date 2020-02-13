const express = require('express'),
    mongoose = require('mongoose') // es un ODM (Object Data Model)

const { graphqlExpress,graphiqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools')

mongoose.connect('mongodb://localhost/graphql_db_course',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const app = express()

const typeDefs = `
    type Alert{
        message : String
    }

    type Query{
        _ : Boolean
    }

    type Mutation {
        _ : Boolean
    }
`

const schema = makeExecutableSchema({
    typeDefs,
    resolvers:{

    }
})

app.use(express.json())
app.use('/api/graphql',graphqlExpress({ schema }))
app.use('/api/graphiql',graphiqlExpress({ endpointURL:'/api/graphql'}))


app.listen(8080,()=>console.log(`servidor iniciado`))