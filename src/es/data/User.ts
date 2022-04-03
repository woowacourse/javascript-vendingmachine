interface IUser {
  isMember? : boolean,
  id: number,
  email: string,
  name: string,
}

class User implements IUser {
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

  setUser({ id, email, name }: IUser) {
    this.isMember = true;
    this.id = id;
    this.email = email;
    this.name = name;
  }
}

export default new User();
