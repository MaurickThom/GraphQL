const userTypes = `
    type User{
        id:ID
        email:String!
        password:String!
        token:String!
        courses:[Course]
    }

    extend type Query{
        getAllUsers :[User]
        getUserById(id: ID!) : User
    }

    input UserInput{
        email: String
        password: String
    }

    extend type Mutation {
        signUp(input: UserInput): User
        logIn(input : UserInput) : User
        signOut : Alert
    }
`


module.exports = {
    userTypes
}