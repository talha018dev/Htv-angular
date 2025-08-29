export interface IUser {
  email?: string | null;
  password?: string | null;
  type?: string;
}

export interface IAuthResponse {
  user?: IUser;
  session?: any;
}
