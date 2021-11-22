var express = require('express')
var { graphqlHTTP } = require('express-graphql')
var { buildSchema } = require('graphql')
var cors = require('cors')

var schema = buildSchema(`
    type Query{
        quoteOfTheDay:String
        random: Float!
        rollThreeDice : [Int]
        rollDice(numDice: Int!, numSides: Int) : [Int]
    }
`)

var root ={
    quoteOfTheDay : () =>{
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within'
    },
    random: ()=>{
        return Math.random()
    },
    rollThreeDice : ()=>{
        return [1,2,3].map(_ => 1 + Math.floor(Math.random() * 6))
    },
    rollDice: (args) =>{
        //  rollDice(numDice: 3, numSides: 6)
        var output = [];
        for(var i =0;i<args.numDice;i++){
            output.push(1+Math.floor(Math.random() * (args.numSides || 6)));
        }
        return output;
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