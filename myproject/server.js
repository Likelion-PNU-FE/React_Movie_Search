import { ApolloServer, gql } from 'apollo-server';
import axios from 'axios';

const typeDefs = gql`
  type Movie {
    id: Int
    title: String
    overview: String
    poster_path: String
    release_date: String
  }

  type Query {
    searchMovies(query: String!, page: Int!): [Movie]
  }
`;

const resolvers = {
  Query: {
    searchMovies: async (_, { query, page }) => {  // 타입 주석 제거
      const apiKey = '6553494dc3ada3fe1a9b0d6dafa26de5';
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: apiKey,
          query: query,
          page: page,
        },
      });
      return response.data.results;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 3000 }).then(({ url }) => {
  console.log(`? Server ready at ${url}`);
});
