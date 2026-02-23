import MovieModel from '../models/Movie.js';

// Resolvers define the technique for fetching the types defined in the schema.
const movieResolvers = {

    // Query resolvers - these handle read operations
    Query: {

        // get all movies from the database
        getAllMovies: async () => {
            try {
                const movies = await MovieModel.find();
                return movies;
            } catch (error) {
                console.log("error getting movies: " + error.message);
                throw new Error(error.message);
            }
        },

        // get a single movie by its id
        getMovieById: async (_, { id }) => {
            try {
                const movie = await MovieModel.findById(id);
                return movie;
            } catch (error) {
                console.log("error getting movie by id: " + error.message);
                throw new Error(error.message);
            }
        },

        // get movies by director name using static method from model
        getMoviesByDirector: async (_, { director_name }) => {
            try {
                const movies = await MovieModel.findByDirector(director_name);
                return movies;
            } catch (error) {
                console.log("error getting movies by director: " + error.message);
                throw new Error(error.message);
            }
        }
    },

    // Mutation resolvers - these handle write operations
    Mutation: {

        // add a new movie to the database
        addMovie: async (_, { name, director_name, production_house, release_date, rating }) => {
            try {
                const newMovie = new MovieModel({
                    name: name,
                    director_name: director_name,
                    production_house: production_house,
                    release_date: release_date,
                    rating: rating
                });
                const savedMovie = await newMovie.save();
                return savedMovie;
            } catch (error) {
                console.log("error adding movie: " + error.message);
                throw new Error(error.message);
            }
        },

        // update an existing movie by id
        updateMovie: async (_, { id, name, director_name, production_house, release_date, rating }) => {
            try {
                // build an object with only the fields that were provided
                const updateData = {};
                if (name) updateData.name = name;
                if (director_name) updateData.director_name = director_name;
                if (production_house) updateData.production_house = production_house;
                if (release_date) updateData.release_date = release_date;
                if (rating) updateData.rating = rating;

                const updatedMovie = await MovieModel.findByIdAndUpdate(id, updateData, { new: true });
                return updatedMovie;
            } catch (error) {
                console.log("error updating movie: " + error.message);
                throw new Error(error.message);
            }
        },

        // delete a movie by id
        deleteMovie: async (_, { id }) => {
            try {
                await MovieModel.findByIdAndDelete(id);
                return "Movie deleted successfully";
            } catch (error) {
                console.log("error deleting movie: " + error.message);
                throw new Error(error.message);
            }
        }
    }
};

export default movieResolvers;
