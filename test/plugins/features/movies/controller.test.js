'use strict';

const Factory = require('rosie').Factory;
const Knex    = require('../../../../lib/libraries/knex');

const Controller = require('../../../../lib/plugins/features/movies/controller');

const MovieFactory = Factory.define('movie')
.sequence('id')
.attr('name', 'default')
.attr('release_year', '1929');

beforeEach(() => {
  return Knex.raw('DELETE FROM movies;');
});

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie', async () => {
      const payload = { name: 'WALL-E' };

      const movie = await Controller.create(payload);

      expect(movie.get('name')).to.eql(payload.name);
    });

  });

  describe('read', () => {

    it('lists all movies if called with no args', async () => {
      const testMovie1 = MovieFactory.build({ name: 'Armageddon', release_year: 1998 });
      //await new Promise((r) => setTimeout(r, 1000));
      const testMovie2 = MovieFactory.build({ name: 'Deep Impact', release_year: 1998 });
      //const oldMovies = await Controller.find();
      //const oldCount = oldMovies.length;

      return Knex('movies').insert([testMovie1, testMovie2])
      .then(() => {
        return Controller.find();
      })
      .then((movies) => {
        expect(movies.length).to.eql(2);
      });
    });

    it('returns all movies with a given release year', async () => {
      const testMovie1 = MovieFactory.build({ name: 'Volcano', release_year: 1997 });
      //const oldMovies = await Controller.find(1997);
      //const oldCount = oldMovies.length;

      return Knex('movies').insert(testMovie1)
      .then(() => {
        return Controller.find(1997);
      })
      .then((movies) => {
        expect(movies.length).to.eql(1);
      });
    });

  });

});
