'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  release_year: Joi.number().integer().min(1878).max(9999).optional(),
  title: Joi.string().min(1).max(255).required()
});
