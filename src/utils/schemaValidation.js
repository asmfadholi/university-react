const Joi = require('@hapi/joi');

export const schemaLogin = Joi.object({
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
});

export const schemaRegister = Joi.object({
  name: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
});

export const schemaNewsLetter = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
});
