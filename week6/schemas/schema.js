import { gql } from 'graphql-tag';

// this is the graphql schema for movies
// it defines the shape of our data and what queries/mutations we can do

const movieSchema = gql`

    # Movie type - has all the fields for a movie
    type Movie {
        id: ID
        name: String
        director_name: String
        production_house: String
        release_date: String
        rating: Float
    }

    # Query type - for getting data
    type Query {
        getAllMovies: [Movie]
        getMovieById(id: ID!): Movie
        getMoviesByDirector(director_name: String!): [Movie]
    }

    # Mutation type - for adding, updating, deleting data
    type Mutation {
        addMovie(
            name: String!,
            director_name: String!,
            production_house: String!,
            release_date: String!,
            rating: Float!
        ): Movie

        updateMovie(
            id: ID!,
            name: String,
            director_name: String,
            production_house: String,
            release_date: String,
            rating: Float
        ): Movie

        deleteMovie(id: ID!): String
    }
`;

export default movieSchema;
