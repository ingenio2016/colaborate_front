import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../../providers/people.service';
import { Person } from '../../../interfaces/people.interface'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private persons: any
  constructor( private _peopleService: PeopleService ) {
    this._peopleService.getPersons().subscribe( (data) => {
      this.persons = data;
      this.persons.forEach(function( person ) {
        let date = new Date(person.dateOfBirth);
        date.setDate(date.getDate() + 1);
        person.dateOfBirth = date;
      })
    })
  }

  ngOnInit() {
  }

}
