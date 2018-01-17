export interface People {
  id: number;
  name: string;
  nit: number;
  genre: string;
  dateOfBirth: Date;
  photo: string;
}

export interface Child {
  id: number;
  peopleId: number;
  name: string;
  age: number;
}
