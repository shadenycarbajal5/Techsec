export interface RequestUserInsert {
  username?: string;
  password?: string;
  name?: string;
  document?: string;
  phone?: string;
  address?: string;
  role?: 'CLIENTE' | 'ADMIN';
}
