import { Role } from '@sc-enums/role';
import { genSalt, hash } from 'bcrypt';

export const ProfileUpdateHelper = (selectedRole: Role) =>
  async function (next) {
    const object = this._update ? this._update : this;
    let password = '';
    if (this._update) {
      password = (await this.model.findOne(this.getQuery())).password;
    }
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
