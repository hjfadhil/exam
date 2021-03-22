import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AppComponent } from './app.component';
import { WellcomeComponent } from './components/wellcome/wellcome.component';
import { AcademicyearsComponent } from './components/academicyears/academicyears.component';
import { ExamsComponent } from './components/exams/exams.component';
import { ExaminfoComponent } from './components/examinfo/examinfo.component';
import { NewexamComponent } from './components/newexam/newexam.component';
import { MasterComponent } from './components/master/master.component';
import { DprtexamsComponent } from './components/dprtexams/dprtexams.component';
import { DprtdtailsComponent } from './components/dprtdtails/dprtdtails.component';
import { HomeComponent } from './components/home/home.component';
import { EditexamComponent } from './components/editexam/editexam.component';
import { ExamtableComponent } from './components/examtable/examtable.component';
import { GexamtableComponent } from './components/gexamtable/gexamtable.component';
import { report } from 'process';
import { Report1Component } from './components/report1/report1.component';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { Master2Component } from './components/master2/master2.component';
import { Dprtexams2Component } from './components/dprtexams2/dprtexams2.component';
import { TotalsComponent } from './components/totals/totals.component';
import { Examtable2Component } from './components/examtable2/examtable2.component';
import { DataComponent } from './components/data/data.component';
import { StatisticsComponent } from './components/statistics/statistics.component';


const routes: Routes = [
  {path: 'home', component: WellcomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'academicyears', component: AcademicyearsComponent},
  {path: 'exams', component: ExamsComponent},
  {path: 'examinfo', component: ExaminfoComponent},
  {path: 'newexam', component: NewexamComponent},
  {path: 'master', component: MasterComponent},
  {path: 'dprtexams', component: DprtexamsComponent},
  {path: 'dprtdtails', component: DprtdtailsComponent},
  {path: 'home', component: HomeComponent},
  {path: 'editexam', component: EditexamComponent},
  {path: 'examtable', component: ExamtableComponent},
  {path: 'gexamtable', component: GexamtableComponent},
  {path: 'report1', component: Report1Component},
  {path: '', component: HomeComponent},
  {path: 'createaccount', component: CreateuserComponent},
  {path: 'master2', component: Master2Component},
  {path: 'dprtexams2', component: Dprtexams2Component},
  {path: 'totals', component: TotalsComponent},
  {path: 'examtable2', component: Examtable2Component},
  {path: 'data', component: DataComponent},
  {path: 'statistics', component: StatisticsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
