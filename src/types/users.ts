export type UsersData = Array<User>;

export interface User {
  [id: string]: number | string | Address | Company;
  // id: number;
  // name: string;
  // email: string;
  // username: string;
  // address: Address;
  // phone: string;
  // website: string;
  // company: Company;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}
