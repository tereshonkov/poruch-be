export interface UserDto {
  id?: string;
  username: string;
  email: string;
  phone: string;
  roles: string[];
  password: string;
  social?: string | null;
  status?: boolean;
  requests?: Request[];
}
