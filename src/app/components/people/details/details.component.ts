import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Person } from '../../../interfaces/people.interface';
import { PeopleService } from '../../../providers/people.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private person: any;
  constructor( private router:Router, private route:ActivatedRoute, private _peopleService: PeopleService ) {
    this.route.params.subscribe( (params) => {
      if(params['id'] == null || params['id'] == ''){
        this.router.navigate['people'];
      }
      this._peopleService.getPerson(params['id']).subscribe( (person) => {
        this.person = person;
        console.log(this.person);
      })
    })
  }

  ngOnInit() {
  }

}
