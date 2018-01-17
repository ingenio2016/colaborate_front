import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { People } from '../interfaces/people.interface'
import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PeopleService {

  // Http Url Backend
  urlBack: string = 'http://localhost:3000/parent';
  constructor( private http: HttpClient ) {
  }

  savePeople( people: People ) {
    let dateOfBirth = people.dateOfBirth.year+'-'+people.dateOfBirth.month+'-'+people.dateOfBirth.day;
    return this.http.post(  this.urlBack, {name: people.name, nit: people.nit, genre: people.genre, dateOfBirth: dateOfBirth})
      .map( res=>{
        return res;
      })
  }

  getPersons() {
    return this.http.get(  this.urlBack )
      .map( res=>{
        return res;
      })
  }
}

