import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PeopleService } from '../../../providers/people.service';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {Child} from "../../../interfaces/people.interface";

@Component({
  selector: 'app-modal-children-create',
  templateUrl: './modal-children-create.component.html',
  styleUrls: ['./modal-children-create.component.scss']
})
export class ModalChildrenCreateComponent implements OnInit {
  private _success = new Subject<string>();
  closeResult: string;

  // Children Structure
  children: Child = {
    id: null,
    person_id: null,
    name: '',
    age: 0
  }
  childrenForm: FormGroup;
  modalReference: any;
  errorMessage: string;
  constructor( private modalService: NgbModal, private _peopleService: PeopleService ) {
    this.childrenForm = new FormGroup({
      'id': new FormControl(''),
      'person_id': new FormControl(''),
      'name': new FormControl('', Validators.required),
      'age': new FormControl('', Validators.required)
    });
    this.childrenForm.setValue( this.children );
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

  save() {
    if(this.childrenForm.value.id == null){
      this._peopleService.saveChildren( this.childrenForm.value ).subscribe( (data) => {
        this.modalReference.close();
        // Pending redirect to Edit View //
      },error => {
        this._success.next('An error has Ocurred!!');
        console.log(error);
      });
    }
  }

}
