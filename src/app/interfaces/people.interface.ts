export interface People {
  id: number;
  name: string;
  nit: number;
  genre: string;
  dateOfBirth: {
    year: number;
    month: number;
    day: number
  },
  photo: string;
}

export interface Child {
  id: number;
  peopleId: number;
  name: string;
  age: number;
}
