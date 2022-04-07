import { AdminData, AdminEmail, AdminPassword } from '../../index.d';

export default interface API {
  signup(admin: AdminData);
  modifyAdmin(admin: AdminData, id: number, key: string);
  login(email: AdminEmail, password: AdminPassword);
  getEmail(id: number, key: string);
}
