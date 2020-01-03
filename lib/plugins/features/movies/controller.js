'use strict';

const Movie = require('../../../models/movie');

exports.create = async (payload) => {
  const movie = await new Movie().save(payload);

  return new Movie({ id: movie.id }).fetch();
};

exports.find = async (release_year, name) => {
  if (release_year === undefined && name === undefined) {
    const movies = await new Movie().fetchAll();

    return movies.map((movie) => movie.serialize());
  }
  if (release_year && Number.isInteger(release_year)) {
    let movies = await new Movie({ release_year }).fetch({ require: true });

    if (!Array.isArray(movies)) {
      movies = [movies];
    }
    return movies.map((movie) => movie.serialize());
  }

};
