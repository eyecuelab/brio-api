import { BaseSerializer } from './base';

export class UserSerializer extends BaseSerializer {
  static get resourceType() {
    return 'users';
  }

  static resourceRoot() {
    return 'users';
  }

  static attrs() {
    return [
      'username',
      'email',
      'scope',
      'created_at',
      'updated_at',
    ];
  }

  static itemMapper(req) {
    return {
      topLevelLinks: {
        self: () => this.url('profile'),
      },
      dataLinks: null,
      attributes: this.attrs(),
      meta: {
        actions: (record) => this.userActions(req, record),
      },
    };
  }

  static userActions(req, record) {
    const actions = [];

    actions.push(
      this.action('PATCH', 'update', 'profile', [
        ['username', 'text', record.username],
        ['email', 'text', record.email],
      ]),
    );

    return actions;
  }
}

export default UserSerializer;
