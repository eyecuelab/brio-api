import Joi from '@hapi/joi';
import { Readable } from 'stream';

import controller from './controller';

const multipartOpts = {
  maxBytes: 10000000,
  output: 'stream',
  parse: true,
};

const Routes = [
  [
    'GET', '/profile', controller.get,
    {
      description: 'Get a user',
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown(),
      },
    },
  ],
  [
    'PATCH', '/profile', controller.update,
    {
      description: 'Update a profile',
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown(),
        payload: {
          first_name: Joi.string(),
          last_name: Joi.string(),
          email: Joi.string()
            .email({ minDomainSegments: 2 })
            .lowercase()
            .error(new Error('Must be a valid email address')),
          password: Joi.string().min(6).allow(null).allow(''),
          image_file: Joi.object().type(Readable),
        },
      },
      payload: multipartOpts,
    },
  ],
];

module.exports = (server) => {
  const routes = Routes.map((r) => {
    const [method, path, handler, config] = r;
    config.tags = ['api'];
    return { method, path, handler, config };
  });
  server.route(routes);
};
