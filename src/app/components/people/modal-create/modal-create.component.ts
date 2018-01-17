import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { People } from '../../../interfaces/people.interface';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { PeopleService } from '../../../providers/people.service';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {

  // People structure
  people: People = {
    id: null,
    name: '',
    nit: null,
    genre: '',
    dateOfBirth: null,
    photo: ''
  };

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

  // People Form
  peopleForm: FormGroup;
  constructor( config: NgbDatepickerConfig, private _peopleService: PeopleService ) {
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

    this.peopleForm.setValue( this.people );
  }

  ngOnInit() {
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

  save() {
    console.log(this.peopleForm);
  }

}
