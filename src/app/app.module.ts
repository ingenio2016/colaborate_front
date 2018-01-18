import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APP_ROUTING } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// Components
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { PeopleComponent } from './components/people/people.component';
import { ListComponent } from './components/people/list/list.component';
import { DetailsComponent } from './components/people/details/details.component';
import { ModalCreateComponent } from './components/people/modal-create/modal-create.component';
// People Service
import { PeopleService } from './providers/people.service';
import {HttpClientModule} from '@angular/common/http';
import { NoPhotoPipe } from './pipes/no-photo.pipe';
import { CapitalizedPipe } from './pipes/capitalized.pipe';
import { GenrePipe } from './pipes/genre.pipe';
import { ModalChildrenCreateComponent } from './components/people/modal-children-create/modal-children-create.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PeopleComponent,
    ListComponent,
    DetailsComponent,
    ModalCreateComponent,
    NoPhotoPipe,
    CapitalizedPipe,
    GenrePipe,
    ModalChildrenCreateComponent],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    PeopleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
