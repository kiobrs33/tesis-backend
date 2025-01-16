export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser {
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  password: string;
  type: 'ADMIN' | 'CLIENT';
}

export interface IQuerysUser {
  page?: string;
  take?: string;
}

export interface IParamsUser {
  id?: string;
}
