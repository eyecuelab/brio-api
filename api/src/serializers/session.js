import { BaseSerializer } from './base';

export class SessionSerializer extends BaseSerializer {
  static get resourceType() {
    return 'sessions';
  }

  static attrs() {
    return ['key', 'user_id', 'token', 'scope', 'user'];
  }

  static itemMapper(req) {
    return {
      topLevelLinks: {
        self: this.url('session'),
        profile: this.url('profile'),
      },
      dataLinks: null,
      attributes: this.attrs(),
      user: this.userRel(),
      meta: {
        actions: () => {
          const actions = [
            this.action('POST', 'logout', 'logout'),

            this.action('PATCH', 'update', 'profile', [
              ['username','text', req.currentUser.attributes.sername],
              ['email', 'text', req.currentUser.attributes.email],
              ['password', 'password'],
            ]),
          ];

          return actions;
        },
      },
    };
  }
}

export default SessionSerializer;
