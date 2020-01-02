'use strict';

const Factory = require('rosie').Factory;
const Knex    = require('../../../../lib/libraries/knex');

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Movie      = require('../../../../lib/models/movie');

const MovieFactory = Factory.define('movie')
.attr('id', 1)
.attr('name', 'default')
.attr('release_year', '1929');

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie', async () => {
      const payload = { name: 'WALL-E' };

      const movie = await Controller.create(payload);

      expect(movie.get('name')).to.eql(payload.name);
    });

  });

  describe('read', () => {

    it('lists all movies', async () => {
      const testMovie1 = MovieFactory.build({ id: 1, name: 'Armageddon', release_year: 1998 });
      const testMovie2 = MovieFactory.build({ id: 2, name: 'Deep Impact', release_year: 1998 });

      return Knex('movies').insert([testMovie1, testMovie2])
      .then(() => {
        return Controller.find();
      })
      .then((movies) => {
        expect(movies.keys().length()).to.eql(2);
      });
    });

  });

});
