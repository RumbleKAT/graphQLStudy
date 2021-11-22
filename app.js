const { graphql, buildSchema } = require('graphql')

var schema = buildSchema(`
    type Query{
        hello : String
    }
`)

var root ={
    hello: ()=>{
        return 'Hello world!'
    }
}

graphql(schema, '{ hello }',root).then((res)=>{
    console.log(res);
})