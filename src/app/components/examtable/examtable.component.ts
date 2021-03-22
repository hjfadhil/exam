import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamtableService } from 'src/app/services/examtable.service';
import { FunctionsModule } from 'src/app/models/functions/functions.module';
import * as XLSX from 'xlsx';
import  { saveAs } from 'file-saver';
import { ExamtypesService } from 'src/app/services/examtypes.service';

@Component({
  selector: 'app-examtable',
  templateUrl: './examtable.component.html',
  styleUrls: ['./examtable.component.css']
})
export class ExamtableComponent implements OnInit {

  exams = []
  oexams = []
  curdate
  study
  exams2 = []
  systems
  system
  trial
  exams3 = []


  constructor(private router: Router,
              private examtableS: ExamtableService,
              private functions: FunctionsModule,
              private examtypesService: ExamtypesService,
    ) { 
      this.examtableS.exams$.subscribe(r => {
        r.forEach(e => {
          let id = e.date + this.functions.morningevening(e.study)
          if(!this.exams2[id]){
            let eo = e
            eo['stage2'] = []
            if(!eo['stage2'][functions.convertstage(e.stage)]){
              eo['stage2'][functions.convertstage(e.stage)] = [];
            }
            eo['stage2'][functions.convertstage(e.stage)].push(e.material)
            this.exams2[id] = eo;
          }else{
            if(!this.exams2[id]['stage2'][functions.convertstage(e.stage)]){
              this.exams2[id]['stage2'][functions.convertstage(e.stage)] = []
            }
            this.exams2[id]['stage2'][functions.convertstage(e.stage)].push(e.material)
          }
        })
        this.exams = Object.keys(this.exams2).map((exid) => {
          let ex = this.exams2[exid]
          ex.sday = functions.arday(ex.date)
          return ex;
        });
        this.exams.sort((e1, e2) => {
          // let dates1 = e1.date.split("-")
          // let dates2 = e2.date.split("-")
          let date1 = new Date(e1.date).getTime()
          let date2 = new Date(e2.date).getTime()
          if(date1 > date2){
            return 1
          }else{ 
            return -1
          }
        })
        //this.exams = this.exams2
        this.oexams = this.exams
      })
      
  }

  ngOnInit(): void {
    this.examtypesService.getExamTypes().subscribe(list => {
      this.systems = list.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data(),
        }
      })
    })
  }

  addnewexam(){
    this.router.navigate(['/newexam'])
  }

  filterexam(){
    if(this.curdate != null){
      if(this.study == 0 || this.study == null || this.study == undefined){
        this.exams = this.oexams.filter(e => e.date == this.curdate)
      }else{
        this.exams = this.oexams.filter(e => e.date == this.curdate && e.study == this.study)
      }
    }else{
      if(this.study == 0 || this.study == null || this.study == undefined){
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
  save(){
    let exos = []
    let i = 0;
    let t1 = "ت, التاريخ, اليوم, الدراسة, المرحلة الأولى, المرحلة الثانية, المرحلة الثالثة, المرحلة الرابعة, المرحلة الخامسة, المرحلة السادسة, النظام, الدور"+"\n";
    this.exams.forEach(e => {
      let d1 = e.study + "," + e.stage + "," + e.material + "," + e.teacher + "," + e.date + "," + e.time + "," + e.long + "," + e.classroom + "," + e.platform + "," + e.meeting + "," + e.included + "," + e.inrule + "," + e.abs + "," + e.system + "," + e.trial + '\n';
      t1 = t1 + d1;
      let m1 = "";
      let m2 = "";
      let m3 = "";
      let m4 = "";
      let m5 = "";
      let m6 = "";
      if(e.stage2[1]){
        for (let i = 0; i < e.stage2[1].length; i++) {
          const element = e.stage2[1][i];
          m1 = m1 +  element + "  ";
        }
      }
      if(e.stage2[2]){
        for (let i = 0; i < e.stage2[2].length; i++) {
          const element = e.stage2[2][i];
          m2 = m2 + element + "  ";
        }
      }
      if(e.stage2[3]){
        for (let i = 0; i < e.stage2[3].length; i++) {
          const element = e.stage2[3][i];
          m3 = m3 + element + "  ";
        }
      }
      if(e.stage2[4]){
        for (let i = 0; i < e.stage2[4].length; i++) {
          const element = e.stage2[4][i];
          m4 = m4 + element + "  ";
        }
      }
      if(e.stage2[5]){
        for (let i = 0; i < e.stage2[5].length; i++) {
          const element = e.stage2[5][i];
          m5 = m5 + element + "  ";
        }
      }
      if(e.stage2[6]){
        for (let i = 0; i < e.stage2[6].length; i++) {
          const element = e.stage2[6][i];
          m6 = m6 + element + "  ";
        }
      }
      let exo = {
        ت: ++i,
        التاريخ: e.date,
        اليوم: e.sday,
        الدراسة: e.study,
        المرحلة_الأولى: m1,
        المرحلة_الثانية: m2,
        المرحلة_الثالثة: m3,
        المرحلة_الرابعة: m4,
        المرحلة_الخامسة: m5,
        المرحلة_السادسة: m6,
        النظام: e.system,
        الدور: e.trial,
      } 
      exos.push(exo)
    })
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exos);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const sh: XLSX.Sheet = wb.Sheets['data']
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    let blob = new Blob([excelBuffer], {type: fileType})
    let filename = "examtable"+this.functions.now()+".xlsx";
    saveAs(blob, filename)
  }

  sysch(){
    console.log(this.system);
    this.exams2 = this.oexams.filter(e => e.system == this.systems[this.system].name)
    this.exams = this.exams2;
  }
  trialch(){
    console.log(this.trial);
    this.exams = this.exams2.filter(e => e.trial == this.trial)
  }

}
