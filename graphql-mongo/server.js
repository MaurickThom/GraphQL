const express = require('express'),
    mongoose = require('mongoose') // es un ODM (Object Data Model)

const { graphqlExpress,graphiqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const { merge } = require('lodash')

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

// Types Definitions
const { courseTypes } = require('./types/course.type')
const { userTypes } = require('./types/user.types')

// Resolvers
const { courseResolver } = require('./resolvers/course.resolver')
const { userResolver } = require('./resolvers/user.resolver')
const serverResolver = {}

const schema = makeExecutableSchema({
    typeDefs:[typeDefs,courseTypes,userTypes],
    resolvers: merge(serverResolver,courseResolver,userResolver)
})

app.use(express.json())
app.use('/api/graphql',graphqlExpress({ schema }))
app.use('/api/graphiql',graphiqlExpress({ endpointURL:'/api/graphql'}))


app.listen(8080,()=>console.log(`servidor iniciado`))