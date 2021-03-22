import { Component, OnInit } from '@angular/core';
import { GexamtableService } from 'src/app/services/gexamtable.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { FunctionsModule } from 'src/app/models/functions/functions.module';
import { MohserModule } from 'src/app/models/mohser/mohser.module';

@Component({
  selector: 'app-gexamtable',
  templateUrl: './gexamtable.component.html',
  styleUrls: ['./gexamtable.component.css']
})
export class GexamtableComponent implements OnInit {

  colleges = []
  exams
  oexams
  curdate
  study
  examname
  examay
  exams2 = []

  constructor(private gexamtableS: GexamtableService,
              private router: Router,
              private loginS: LoginService,
              private functions: FunctionsModule,
    ) { 
      // for (const key in this.gexamtableS.mohserM.colleges) {
      //   if (this.gexamtableS.mohserM.colleges.hasOwnProperty(key)) {
      //     const college = this.gexamtableS.mohserM.colleges[key];
      //     this.colleges.push(college)
      //   }
      // }
      this.gexamtableS.prog.subscribe(n => {
        this.exams = []
        this.oexams = []
        let s:string = ''
        s.substr
        if(n > 10){
          for (const dprtid in this.gexamtableS.gexam) {
            if (this.gexamtableS.gexam.hasOwnProperty(dprtid)) {
              const exam = this.gexamtableS.gexam[dprtid];
              let daray = exam.exam.date.split('-')
              let newid = exam.dpartment.collegeid.substr(0,8) + exam.dpartment.id.substr(0,7) + daray[1] + daray[2] + functions.morningevening(exam.exam.study)
              if(this.exams2[newid] == null){
                let exo = {
                  college: exam.dpartment.collegename,
                  department: exam.dpartment.name,
                  study: exam.exam.study,
                  date: exam.exam.date,
                  time: exam.exam.time,
                  long: exam.exam.long,
                  sday: functions.arday(exam.exam.day),
                  system: exam.exam.system,
                  trial: exam.exam.trial,
                }
                exo['stage'] = []
                if(!exo['stage'][functions.convertstage(exam.exam.stage)]){
                  exo['stage'][functions.convertstage(exam.exam.stage)] = []
                }
                exo['stage'][functions.convertstage(exam.exam.stage)].push(exam.exam.material) 
                this.exams2[newid] = exo
              }else{
                if(!this.exams2[newid]['stage'][functions.convertstage(exam.exam.stage)]){
                  this.exams2[newid]['stage'][functions.convertstage(exam.exam.stage)] = []
                }
                let fi = this.exams2[newid]['stage'][functions.convertstage(exam.exam.stage)].findIndex(e => e == exam.exam.material)
                if(fi == -1){
                  this.exams2[newid]['stage'][functions.convertstage(exam.exam.stage)].push(exam.exam.material)
                }
              }
            }
            
          }
          this.exams = Object.keys(this.exams2).map((exid) => {
            let ex = this.exams2[exid]
            return ex;
          });
          this.oexams = this.exams;
          this.exams.map(e => {
            e.status = this.functions.examtimestatus(e.date, e.time, e.long)
          })
          this.oexams.map(e => {
            e.status = this.functions.examtimestatus(e.date, e.time, e.long)
          })
          this.exams = this.exams.sort((e1, e2) => {
            if(((e1.date+e1.college) > (e2.date+e2.college))){
              return 1
            }else if(((e1.date+e1.college) < (e2.date+e2.college))){
              return -1
            }else{
              0
            }
          })
          // this.exams = this.exams.sort((e1, e2) => {
          //   if((e1.college > e2.college)){
          //     return 1
          //   }else if((e1.college < e2.college)){
          //     return -1
          //   }else{
          //     0
          //   }
          // })
          // this.exams = this.exams.sort((e1, e2) => {
          //   if((e1.department > e2.department)){
          //     return 1
          //   }else if((e1.department < e2.department)){
          //     return -1
          //   }else{
          //     0
          //   }
          // })
        }
      })
      this.gexamtableS.examo$.subscribe(r => {
        this.examay = r.ay
        this.examname = r.exam.name
      })
  }

  ngOnInit(): void {
  }

  filterexam(){
    if(this.curdate != null){
      if(this.study == undefined || this.study == null || this.study == 0){
        this.exams = this.oexams.filter(e => e.date == this.curdate)
      }else{
        this.exams = this.oexams.filter(e => e.date == this.curdate && e.study == this.study)
      }
    }else{
      if(this.study == undefined || this.study == null || this.study == 0){
        this.exams = this.oexams
      }else{
        this.exams = this.oexams.filter(e => e.study == this.study)
      }
    }
  }

  rf(){
    this.exams = this.oexams
  }

  sf(){
    if(this.curdate == undefined){
      if(this.study != 0){
        this.exams = this.oexams.filter(e => e.study == this.study)
      }else{
        this.exams = this.oexams
      }
    }else{
      if(this.study != 0){
        this.exams = this.oexams.filter(e => e.study == this.study && e.date == this.curdate)
      }else{
        this.exams = this.oexams.filter(e => e.date == this.curdate)
      }
    }
  }

  rdf(){
    this.curdate = null
    this.filterexam()
  }

  yet(){
    this.exams = this.oexams.filter(e => e.status == 1)
    this.curdate = undefined
    this.study = 0
  }
  all(){
    this.exams = this.oexams
    this.curdate = undefined
    this.study = 0
  }
  now(){
    this.exams = this.oexams.filter(e => e.status == 2)
    this.curdate = undefined
    this.study = 0
  }
  done(){
    this.exams = this.oexams.filter(e => e.status == 3)
    this.curdate = undefined
    this.study = 0
  }

  

}
