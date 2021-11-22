var express = require('express')
var { graphqlHTTP } = require('express-graphql')
var { buildSchema } = require('graphql')
var cors = require('cors')
const { default: RandomDie } = require('./components/RandomDie')

var schema = buildSchema(`
    type RandomDie{
        numSides : Int!
        rollOnce : Int!
        roll(numRolls: Int!): [Int]
    }

    type Mutation{
        setMessage(message: String) : String
    }

    type Query{
        getDie(numSides : Int) : RandomDie
        getMessage : String
    }
`)

var fakeDatabase = {};

var root ={
    getDie: ({numSides}) =>{
        return new RandomDie(numSides || 6)
    },
    setMessage : ({message})=>{
        fakeDatabase.message = message;
        return message;
    },
    getMessage : ()=>{
        return fakeDatabase.message;
    }
}


var app = express()
app.use(cors())
app.use('/graphql',graphqlHTTP({
    schema : schema,
    rootValue : root,
    graphiql : true
}))
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql')