import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Person, Child } from '../interfaces/people.interface'
import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable()
export class PeopleService {

  // Http Url Backend
  urlBack: string = environment.backendUrl+'/parent';
  constructor( private http: HttpClient ) {
  }

  savePeople( people: Person, dateOfBirth: string ) {
    return this.http.post(  this.urlBack, {name: null, nit: people.nit, genre: people.genre, dateOfBirth: dateOfBirth})
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

  getPerson( id: number ) {
    return this.http.get(  this.urlBack + '/' + id )
      .map( res=>{
        return res;
      })
  }

  saveChildren( children: Child ) {
    console.log(children);
    return this.http.post(  this.urlBack, {})
      .map( res=>{
        return res;
      })
  }
}

