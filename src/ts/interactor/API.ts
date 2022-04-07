import { AdminData, AdminEmail, AdminPassword } from '../../index.d';

export default interface API {
  signup(admin: AdminData);
  login(email: AdminEmail, password: AdminPassword);
}
