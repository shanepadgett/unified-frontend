import { ApolloServer } from 'npm:@apollo/server@^4.11.3';
import { startStandaloneServer } from 'npm:@apollo/server@^4.11.3/standalone';

// Define your GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
    books: [Book]
  }
  
  type Book {
    id: ID
    title: String
    author: String
  }
`;

// Sample data
const books = [
  { id: '1', title: 'The Awakening', author: 'Kate Chopin' },
  { id: '2', title: 'City of Glass', author: 'Paul Auster' },
];

// Define resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    books: () => books,
  },
};

// Create the Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);