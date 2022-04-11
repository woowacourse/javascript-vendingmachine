import { UserInfo } from '../interface';

class User implements UserInfo {
  isMember;

  id;

  email;

  name;

  constructor() {
    this.initialize();
  }

  initialize() {
    this.isMember = false;
    this.id = null;
    this.email = null;
    this.name = null;
  }

  setUser({ id, email, name }: UserInfo) {
    this.isMember = true;
    this.id = id;
    this.email = email;
    this.name = name;
  }
}

export default new User();
