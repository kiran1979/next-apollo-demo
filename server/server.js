const express = require('express')
const bodyParser = require('body-parser') //it is already included in apollo-server-express
const cors = require('cors')
const { graphqlExpress, graphiqlExpress, ApolloServer, gql } = require('apollo-server-express')
const myGraphQLSchema = require('./schema')
const schema = require('./schema')

const app = express();

// to access graphql API from the client side
app.use(cors())
// bodyParser is needed just for POST.
//app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
// for the graphiql interface
// app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// myGraphQLSchema.toConfig(app.use('/graphql', schema));

const resolvers = {
  Query: {
    hello: () => 'Hello World',
  },
}

const typeDefs = gql`
  type Query {
    hello: String
  }
`
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {}
});
// server.applyMiddleware({ app });

// app.listen({ port: 5000 }, () =>
// console.log('Now browse to http://localhost:5000' + server.graphqlPath)
// );

server.start().then(res => {
  server.applyMiddleware({ app });
  app.listen({ port: 5000 }, () =>
      console.log('Now browse to http://localhost:5000' + server.graphqlPath)
  )
 })

 // const port = process.env.PORT || 5000
// app.listen(port, (err) => {
//   if (err) throw err
//   console.log(`Graphql Server started on: http://localhost:${port}`)
// })

//const startApp =() => {
  //Inject Apollo server middleware on Express Application
//   server.applyMiddleware({app});
//   app.listen(port, () => {
//     badge : true;
//       // if (err) throw err   
//       console.log(`Graphql Server started on: http://localhost:${port}`)
//     })  
// }
// startApp();
