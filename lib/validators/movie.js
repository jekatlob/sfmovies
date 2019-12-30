'use strict';

const Joi = require('joi');

const release_year = Joi.object().keys({
  gt: Joi.number().integer().min(1878).max(9999).optional(),
  gte: Joi.number().integer().min(1878).max(9999).optional(),
  lt: Joi.number().integer().min(1878).max(9999).optional(),
  lte: Joi.number().integer().min(1878).max(9999).optional()
})
.nand('gt', 'gte')
.nand('lt', 'lte');

const ListFilter = Joi.object().keys({
  release_year: [
    Joi.number().integer().min(1878).max(9999).optional(),
    release_year
  ]
});

const Post = Joi.object().keys({
  name: Joi.string().min(1).max(255).required(),
  release_year: Joi.number().integer().min(1878).max(9999).optional()
});

module.exports = {
  ListFilter,
  Post
};
