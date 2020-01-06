const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

const g_schema = new GraphQLSchema({
    query:new GraphQLObjectType({
        name:'Query',
        fields: ()=>({ //definir los campos de los cuales se compone este objeto
            hello:{
                type:GraphQLString,
                resolve:()=>'Hello world'
            }
        })
    })
})

module.exports = {
    g_schema
}