export interface Person {
  id: number;
  name: string;
  nit: number;
  genre: string;
  dateOfBirth: string;
  photo: string;
}

export interface Child {
  id: number;
  peopleId: number;
  name: string;
  age: number;
}
