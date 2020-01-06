const express = require('express'),
    app = express(),
    {graphql} = require('graphql'),
    { b_root,b_schema } = require('./../build-schema/buildSchema'),
    { g_schema } = require('./../graphql-schema/graphqlSchema')

// con BuildSchema
// graphql(b_schema,'{hello}',b_root).then(response=>console.log(response))

// con GraphQLSchema
graphql(g_schema,'{hello}').then(response=>console.log(response))