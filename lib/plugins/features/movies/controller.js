'use strict';

const Movie = require('../../../models/movie');

exports.create = async (payload) => {
  const movie = await new Movie().save(payload);

  return new Movie({ id: movie.id }).fetch();
};

exports.find = async (release_year, name) => {
  if (release_year === undefined && name === undefined) {
    const movies = await new Movie().fetchAll();

    // change this to return the serialized version, not the raw objects
    return movies.map((movie) => movie.serialize());
  }
  //const movies = await new Movie()
  //.filter(filter)
  //.query()
};
