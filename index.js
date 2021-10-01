require('dotenv').config({ path: './.env' });

const { GraphQLServer, PubSub } = require('graphql-yoga');
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
    id: ID!
    text: String!
    rating: Float!
  }
  type Query {
    reviews: [Review]
  }
  type Mutation {
    createReview(text: String!, rating: Float!): Review!
  }
  type Subscription {
    newReview: Review
  }
`;

const resolvers = {
  Query: {
    reviews: () => Review.find(),
  },
  Mutation: {
    createReview: async (_, { text, rating }) => {
      const review = new Review({ text, rating });
      await review.save();
      pubsub.publish('newReview', { newReview: review });
      return review;
    }
  },
  Subscription: {
    newReview: {
      subscribe: (_, { }, { pubsub }) => {
        return pubsub.asyncIterator('newReview');
      },
    }
  },
};

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    pubsub,
  },
});

server.start({ port }, () => console.log('Server is running on localhost:7777'));