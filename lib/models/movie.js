'use strict';

const Bookshelf = require('../libraries/bookshelf');

module.exports = Bookshelf.Model.extend({
  tableName: 'movies',
  serialize: function () {
    return {
      id: this.get('id'),
      name: this.get('title'),
      object: 'movie',
      release_year: this.get('release_year'),
      title: this.get('title')
    };
  }
});
