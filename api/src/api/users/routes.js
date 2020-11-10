import Joi from '@hapi/joi';

import controller from './controller';

const Routes = [
  [
    'GET',
    '/profile',
    controller.get,
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
    'PATCH',
    '/profile',
    controller.update,
    {
      description: 'Update a profile',
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown(),
        payload: {
          username: Joi.string().max(12),
          email: Joi.string()
            .email({ minDomainSegments: 2 })
            .lowercase()
            .error(new Error('Must be a valid email address')),
          password: Joi.string().min(6).allow(null).allow(''),
        },
      },
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
