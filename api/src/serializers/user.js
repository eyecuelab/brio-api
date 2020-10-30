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
      'first_name',
      'last_name',
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
        ['first_name', 'text', record.first_name],
        ['last_name', 'text', record.last_name],
        ['email', 'text', record.email],
      ]),
    );

    return actions;
  }
}

export default UserSerializer;
