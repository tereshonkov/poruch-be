export interface UserDto {
  id?: string;
  username: string;
  email: string;
  phone: string;
  roles: string[];
  password: string;
  status?: boolean;
  requests?: Request[];
}
