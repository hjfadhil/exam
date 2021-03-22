import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { WellcomeComponent } from './components/wellcome/wellcome.component';
import { AcademicyearsComponent } from './components/academicyears/academicyears.component';
import { ExamsComponent } from './components/exams/exams.component';
import { ExaminfoComponent } from './components/examinfo/examinfo.component';
import { NewexamComponent } from './components/newexam/newexam.component';
import { MasterComponent } from './components/master/master.component';
import { MohserModule } from './models/mohser/mohser.module';
import { DprtexamsComponent } from './components/dprtexams/dprtexams.component';
import { DprtdtailsComponent } from './components/dprtdtails/dprtdtails.component';
import { HomeComponent } from './components/home/home.component';
import { EditexamComponent } from './components/editexam/editexam.component';
import { ExamtableComponent } from './components/examtable/examtable.component';
import { GexamtableComponent } from './components/gexamtable/gexamtable.component';
import { Report1Component } from './components/report1/report1.component';
import { FunctionsModule } from './models/functions/functions.module';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { Master2Component } from './components/master2/master2.component';
import { Dprtexams2Component } from './components/dprtexams2/dprtexams2.component';
import { TotalsComponent } from './components/totals/totals.component';
import { Examtable2Component } from './components/examtable2/examtable2.component';
import { DataComponent } from './components/data/data.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    WellcomeComponent,
    AcademicyearsComponent,
    ExamsComponent,
    ExaminfoComponent,
    NewexamComponent,
    MasterComponent,
    DprtexamsComponent,
    DprtdtailsComponent,
    HomeComponent,
    EditexamComponent,
    ExamtableComponent,
    GexamtableComponent,
    Report1Component,
    CreateuserComponent,
    Master2Component,
    Dprtexams2Component,
    TotalsComponent,
    Examtable2Component,
    DataComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    MohserModule,
    FunctionsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
