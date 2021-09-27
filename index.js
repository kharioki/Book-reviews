require('dotenv').config({ path: './.env' });

const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');

const port = process.env.PORT || 7777;

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;
const reviewSchema = new Schema({
  text: String,
  rating: Number,
});

const Review = mongoose.model('Review', reviewSchema);

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
    reviews: () => Review.find(),
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

server.start({ port }, () => console.log('Server is running on localhost:7777'));
