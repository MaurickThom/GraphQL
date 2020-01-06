const { buildSchema } = require('graphql')

const b_schema = buildSchema(`
    type Query{
        hello:String
    }
`)

const _root = {
    hello:()=>'Hello world'
}

module.exports = {
    b_schema,
    _root
}

/**
 * Resolvers
 * 
 * proporciona las instrucciones para convertir una operacion GraphQL (ya sea un Query , un Mutation o un Subscription) en datos
 * o devuelven el mismo tipo de dato que especificamos en nuestro esquema o un Promise de datos
 * 
 * https://www.apollographql.com/docs/tutorial/resolvers/
 */