declare interface User {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

declare interface signupData  {
  name: string;
  email: string;
  password: string;
}

declare interface loginData {
  email: string;
  password: string;
}