var express = require('express')
var { graphqlHTTP } = require('express-graphql')
var { buildSchema } = require('graphql')
var axios = require('axios')
var cors = require('cors')

var schema = buildSchema(`
    input MessageInput{
        content : String
        author : String
    }
    
    type ProcessMessage{
      type: String
      content: String
    }

    type Message{
        id : ID!
        content : String
        author : String
    }

    type Todo{
      userId : ID!
      id : Int,
      title : String,
      completed: Boolean
    }

    type Query{
        getMessage(id: ID!): Message
        getTodo(id:ID!) : Todo
    }

    type Mutation{
        createMessage(input: MessageInput): Message
        updateMessage(id: ID!, input: MessageInput): Message
        deleteMessage(id: ID!): [Message]
    }
`)

class ProcessMessage{
  constructor(type, content){
    this.type = type;
    this.content = content;
  }
}

class Message {
  constructor(id, {content, author}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

class Todos{
  constructor(userId, id, title, completed){
    this.userId = userId
    this.id = id
    this.title = title
    this.completed = completed
  }
}  


var fakeDatabase = {};

var root ={
    getTodo : async ({id}) =>{
      /* 타 서버에서 통신으로 가져온 것 */
      return await axios(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response =>{
        return response.data
      })
      .then(json => {
        return new Todos(json.userId, json.id, json.title, json.completed)
      })
    },
    getMessage: ({id}) => {
        if (!fakeDatabase[id]) {
          throw new Error('no message exists with id ' + id);
        }
        console.log(fakeDatabase)
        return new Message(id, fakeDatabase[id]);
      },
      createMessage: ({input}) => {
        // Create a random id for our "database".
        var id = require('crypto').randomBytes(10).toString('hex');
        fakeDatabase[id] = input;
        console.log(id)
        return new Message(id, input);
      },
      updateMessage: ({id, input}) => {
        if (!fakeDatabase[id]) {
          throw new Error('no message exists with id ' + id);
        }
        // This replaces all old data, but some apps might want partial update.
        fakeDatabase[id] = input;
        return new Message(id, input);
      },
      deleteMessage: ({id}) =>{
        if (!fakeDatabase[id]) {
          throw new Error('no message exists with id ' + id);
        }
        delete fakeDatabase[id];
        
        const res = [];
        
        Object.keys(fakeDatabase).forEach( v => {
          res.push(new Message(v,{content : fakeDatabase[v].content, author : fakeDatabase[v].author}));
        });

        return res;
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