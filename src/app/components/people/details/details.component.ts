import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Child, PersonEdit} from '../../../interfaces/people.interface';
import { PeopleService } from '../../../providers/people.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private _success = new Subject<string>();

  peopleForm: FormGroup;
  errorMessage: string;
  person: PersonEdit = {
    id: null,
    name: '',
    nit: null,
    genre: '',
    dateOfBirth: {
      year: null,
      month: null,
      day: null
    },
    photo: ''
  };
  childs: Child;
  genres = [
    {
      value: "F",
      name: "Femenino"
    },
    {
      value: "M",
      name: "Masculino"
    }
  ];
  constructor( private router:Router, private route:ActivatedRoute, private _peopleService: PeopleService, config: NgbDatepickerConfig ) {
    config.minDate = {year: 1900, month: 1, day: 1};
    config.maxDate = {year: 2099, month: 12, day: 31};

    this.peopleForm = new FormGroup({
      'id': new FormControl(''),
      'name': new FormControl('', Validators.required),
      'nit': new FormControl('', Validators.required),
      'genre': new FormControl('', Validators.required),
      'dateOfBirth': new FormControl('', [ Validators.required, this.edadValidator ]),
      'photo': new FormControl('')
    });

    this.route.params.subscribe( (params) => {
      if(params['id'] == null || params['id'] == ''){
        this.router.navigate['people'];
      }
      this._peopleService.getPerson(params['id']).subscribe( (person) => {
        console.log(person);
        let date = new Date( person['dateOfBirth'] );
        console.log(person['dateOfBirth']);
        console.log(date);
        this.person.id = person['id'];
        this.person.name = person['name'];
        this.person.nit = person['nit'];
        this.person.genre = person['genre'];
        this.person.dateOfBirth.year = date.getFullYear();
        this.person.dateOfBirth.month = date.getMonth() + 1;
        this.person.dateOfBirth.day = date.getDate() + 1;
        console.log(this.person);
        this.peopleForm.reset(this.person);
        this.childs = person['children'];
      });
    });


    this._success.subscribe((message) => this.errorMessage = message);
    debounceTime.call(this._success, 5000).subscribe(() => this.errorMessage = null);
  }

  ngOnInit() {
    console.log(this.peopleForm);
  }

  edadValidator( control: FormControl ): {[s: string]: boolean} {
    if ( control.value) {
      let calendarDate = new Date(control.value.year, control.value.month - 1, control.value.day);
      let age;
      var timeDiff = Math.abs(new Date().getTime() - calendarDate.getTime());
      age = Math.floor((timeDiff / (1000*60*60*24))/365);
      if(age < 18 || age > 60){
        return {
          badage: true
        };
      }
    }
    return null;
  }

  updatePerson() {
    let dateOfBirth = this.peopleForm.value.dateOfBirth.year+'-'+this.peopleForm.value.dateOfBirth.month+'-'+this.peopleForm.value.dateOfBirth.day;
    /*this._peopleService.savePeople( this.peopleForm.value, dateOfBirth ).subscribe( (data) => {
      // Pending redirect to Edit View //
    },error => {
      this._success.next('An error has Ocurred!!');
      console.log(error);
    });*/
  }

}
