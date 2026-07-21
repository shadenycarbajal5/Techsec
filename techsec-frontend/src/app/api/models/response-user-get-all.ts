export interface ResponseUserGetAll {
  id: number;
  username: string;
  name: string;
  document: string;
  phone: string;
  address: string;
  role: 'CLIENTE' | 'ADMIN';
  createdAt?: string;
}
