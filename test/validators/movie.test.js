'use strict';

const Joi = require('joi');

const MovieValidator = require('../../lib/validators/movie');

describe('movie create validator', () => {

  describe('name', () => {

    it('is required', () => {
      const payload = {};
      const result = Joi.validate(payload, MovieValidator.Post);

      expect(result.error.details[0].path[0]).to.eql('name');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is less than 255 characters', () => {
      const payload = { name: 'a'.repeat(260) };
      const result = Joi.validate(payload, MovieValidator.Post);

      expect(result.error.details[0].path[0]).to.eql('name');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('release_year', () => {

    it('is after 1878', () => {
      const payload = {
        name: 'foo',
        release_year: 1877
      };
      const result = Joi.validate(payload, MovieValidator.Post);

      expect(result.error.details[0].path[0]).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        name: 'foo',
        release_year: 20190
      };
      const result = Joi.validate(payload, MovieValidator.Post);

      expect(result.error.details[0].path[0]).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

});

describe('movie list validator', () => {

  describe('release_year', () => {

    it('is after 1878 if just a number', () => {
      const payload = {
        release_year: 1877
      };
      const result = Joi.validate(payload, MovieValidator.ListFilter);

      expect(result.error.details[0].path[0]).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits if just a number', () => {
      const payload = {
        release_year: 20190
      };
      const result = Joi.validate(payload, MovieValidator.ListFilter);

      expect(result.error.details[0].path[0]).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

    it('allows a year range', () => {
      const payload = {
        release_year: { gt: 1878, lt: 2000 }
      };
      const result = Joi.validate(payload, MovieValidator.ListFilter);

      expect(result.error).to.not.exist;
    });

  });

});
