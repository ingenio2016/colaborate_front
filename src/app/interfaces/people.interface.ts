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
  person_id: number;
  name: string;
  age: number;
}

export interface PersonEdit {
  id: number;
  name: string;
  nit: number;
  genre: string;
  dateOfBirth: {
    year: number;
    month: number;
    day: number;
  };
  photo: string;
}
