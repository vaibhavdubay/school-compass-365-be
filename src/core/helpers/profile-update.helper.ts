import { Role } from '@sc-enums/role';
import { genSalt, hash } from 'bcrypt';

export const ProfileUpdateHelper = (selectedRole: Role, update = false) =>
  async function (next) {
    const object = update ? this._update : this;
    const password = update
      ? (await this.model.findOne(this.getQuery())).password
      : '';

    object.updateAt = new Date();
    object.role = selectedRole;
    if (!object.userName) {
      object.userName = object.email;
    }
    if (object.password !== password) {
      const salt = await genSalt(10);
      const hashedPassword = await hash(object.password, salt);
      object.password = hashedPassword;
    }
    next();
  };
