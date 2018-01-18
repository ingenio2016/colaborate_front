import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from '../../../interfaces/people.interface';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { PeopleService } from '../../../providers/people.service';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {
  private _success = new Subject<string>();

  closeResult: string;
  // People structure
  person: Person = {
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
  modalReference: any;
  errorMessage: string;
  constructor( private modalService: NgbModal, config: NgbDatepickerConfig, private _peopleService: PeopleService ) {
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

    this.peopleForm.setValue( this.person );
  }

  ngOnInit() {
    this._success.subscribe((message) => this.errorMessage = message);
    debounceTime.call(this._success, 5000).subscribe(() => this.errorMessage = null);
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
      this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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
    if(this.peopleForm.value.id == null){
      let dateOfBirth = this.peopleForm.value.dateOfBirth.year+'-'+this.peopleForm.value.dateOfBirth.month+'-'+this.peopleForm.value.dateOfBirth.day;
      this._peopleService.savePeople( this.peopleForm.value, dateOfBirth ).subscribe( (data) => {
        this.modalReference.close();
        // Pending redirect to Edit View //
      },error => {
        this._success.next('An error has Ocurred!!');
        console.log(error);
      });
    }
  }

}
