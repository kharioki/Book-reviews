require('dotenv').config({ path: './.env' });

const { GraphQLServer } = require('graphql-yoga');

const port = process.env.PORT || 7777;

const typeDefs = `
  type Review {
    id: ID
    text: String!
    rating: Int!
  }

  type Query {
    reviews: [Review!]!
  }

  type Mutation {
    createReview(text: String!, rating: Int!): Review!
  }
`;

const resolvers = {
  Query: {
    reviews: () => [
      {
        id: '1',
        text: 'This is a review',
        rating: 5
      },
      {
        id: '2',
        text: 'This is another review',
        rating: 4
      }
    ],
  },
  Mutation: {
    createReview: (parent, args) => {
      const review = new Review({
        text: args.text,
        rating: args.rating,
      });
      return review.save();
    }
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start({ port }, () => console.log('Server is running on localhost:4000'));