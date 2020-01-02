'use strict';

const Movies = require('../../../../lib/server');
const Movie  = require('../../../../lib/models/movie');

describe('movies integration', () => {

  describe('create', () => {

    it('creates a movie', () => {
      return Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { name: 'Volver' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });
    });

  });

  describe('find', () => {

    it('returns all movies', () => {
      Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { name: 'Armageddon' }
      });
      Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { name: 'Deep Impact' }
      });
      return Movies.inject({
        url: '/movies',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        const movies = new Movie().fetchAll();
        movies.then(values => {
          //console.log(values);
          values.forEach(movie => console.log(movie.serialize()));
        });
        //console.log(response);
      });
    });

  });

});
