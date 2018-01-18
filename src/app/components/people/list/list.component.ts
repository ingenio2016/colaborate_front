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
      console.log(this.persons);
    })
  }

  ngOnInit() {
  }

}
