import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { GexamtableService } from 'src/app/services/gexamtable.service';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import { FunctionsModule } from 'src/app/models/functions/functions.module';
import { ExamtypesService } from 'src/app/services/examtypes.service';

@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.css']
})
export class Report1Component implements OnInit {

  curdate
  study
  exams
  examso = []
  loading = false
  hideallexams = false
  systems = []
  system
  trial

  constructor(private router: Router,
              private masterS: MasterService,
              private gexamtableS: GexamtableService,
              private functions: FunctionsModule,
              private examtypesService: ExamtypesService,
    ) { 
        //this.dprtid = this.masterS.seldprtid
        let cd = new Date();
        let mm = cd.getMonth()+1;
        let m = "" + mm
        m.length == 1? m="0"+m : m=m;
        let d = "" + cd.getDate()
        d.length == 1? d="0"+d : d=d;
        let nd = cd.getFullYear() + "-" + m + "-" + d
        this.curdate = nd;
        
        this.gexamtableS.prog.subscribe(n => {
          this.exams = []
          this.examso = []
          if(n > 1){
            this.exams = Object.keys(this.gexamtableS.gexam).map((exid) => {
              let ex = this.gexamtableS.gexam[exid]
              return ex;
            });
            //this.exams = this.gexamtableS.exams;
            this.exams.sort((e1, e2) => {
              if((e1.colege > e2.colege) || (e1.exam.date > e2.exam.date)){
                return 1
              }else{
                return -1
              }
            })
            this.examso = this.exams;
          }
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

  seldate(){
    //this.exams = this.examso.filter(e => e.exam.date == this.curdate)
    this.loading = true
    this.hideallexams = false
    this.exams = []
    this.exams = this.gexamtableS.getexambydate(this.curdate)
    this.exams.sort((e1, e2) => {
      if((e1.colege > e2.colege) || (e1.exam.date > e2.exam.date)){
        return 1
      }else{
        return -1
      }
    })
    this.loading = false
  }
  allexams(){
    this.hideallexams = true
    this.loading = true
    this.exams = []
    this.exams = this.gexamtableS.getallexams();
    this.exams.sort((e1, e2) => {
      if((e1.colege > e2.colege) || (e1.exam.date > e2.exam.date)){
        return 1
      }else{
        return -1
      }
    })
    this.loading = false
  }

  back(){

  }

  gomeet(link){

  }
  rf(){
    this.exams = this.examso
  }
  rf2(){
    this.exams = this.examso.filter(e => e.exam.date == this.curdate)
  }
  rprt1(){
    let exos = []
    let t1 = "الكلية, القسم, الدراسة, المرحلة, المادة, التاريخ, مشمولين, مشاركين, غائبين"+"\n";
    this.exams.forEach(e => {
      let d1 = e.colege + "," + e.dpartment.name + "," + e.exam.study + "," + e.exam.stage + "," + e.exam.material + "," + e.exam.date + "," + e.exam.included + "," + e.exam.inrule + "," + e.exam.abs + '\n';
      t1 = t1 + d1;
      let exo = {
        الكلية: e.colege,
        القسم: e.dpartment.name,
        الدراسة: e.exam.study,
        المرحلة: e.exam.stage,
        المادة: e.exam.material,
        التاريخ: e.exam.date,
        مشمولين: e.exam.included,
        مشاركين: e.exam.inrule,
        غائبين: e.exam.abs,
      }
      exos.push(exo)
    })
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exos);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const sh: XLSX.Sheet = wb.Sheets['data']
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    let blob = new Blob([excelBuffer], {type: fileType})
    let filename = "report-"+this.functions.now()+".xlsx";
    saveAs(blob, filename)

    // let blob = new Blob(['\ufeff', t1], {type: 'text/csv;charset=utf-8'})
    // let filename = "report-"+this.functions.now()+".csv";
    // saveAs(blob, filename)
  }

  rprt2(){
    let exam2 = []
    this.exams.forEach(e => {
      if(!exam2[e.colege]){
        exam2[e.colege] = []
        exam2[e.colege].inc = 0;
        exam2[e.colege].inr = 0;
        exam2[e.colege].abs = 0;
      }
      exam2[e.colege].inc = exam2[e.colege].inc + e.exam.included;
      exam2[e.colege].inr = exam2[e.colege].inr + e.exam.inrule;
      exam2[e.colege].abs = exam2[e.colege].abs + e.exam.abs;
    })
    let exos = []
    let t1 = "الكلية, مشمولين, مشاركين, غائبين"+"\n";
    for (const id in exam2) {
      if (exam2.hasOwnProperty(id)) {
        const col = exam2[id];
        let d1 = id + "," + col.inc + "," + col.inr + "," + col.abs + '\n';
        t1 = t1 + d1;
        let exo = {
          الكلية: id,
          مشمولين: col.inc,
          مشاركين: col.inr,
          غائبين: col.abs,
        }
        exos.push(exo)
      }
    }
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exos);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const sh: XLSX.Sheet = wb.Sheets['data']
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    let blob = new Blob([excelBuffer], {type: fileType})
    let filename = "totalreport-"+this.functions.now()+".xlsx";
    saveAs(blob, filename)
    //let blob = new Blob(['\ufeff', t1], {type: 'text/csv;charset=utf-8'})
  }

  rprt3(){
    console.log(this.exams);
    let t1 = "الكلية, القسم, الدراسة, المرحلة, المادة, مشمولين, الرابط, الوقت"+"\n";
    this.exams.forEach(e => {
      let d1 = e.colege + "," + e.dpartment.name + "," + e.exam.study + "," + e.exam.stage + "," + e.exam.material + "," + e.exam.included + "," + e.exam.meeting + "," + e.exam.time + '\n';
      t1 = t1 + d1;
    })
    let blob = new Blob(['\ufeff', t1], {type: 'text/csv;charset=utf-8'})
    let filename = "report3-"+this.functions.now()+".csv";
    saveAs(blob, filename)
  }
  rprt4(){
    let exos = []
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let fileExtension = '.xlsx';
    this.exams.forEach(e => {
      let exo = {
        الكلية: e.colege,
        القسم: e.dpartment.name,
        الدراسة: e.exam.study,
        المرحلة: e.exam.stage,
        المادة: e.exam.material,
        مشمولين: e.exam.included,
        الرابط: e.exam.meeting,
        الوقت: e.exam.time
      }
      exos.push(exo)
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exos);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const sh: XLSX.Sheet = wb.Sheets['data']
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    //this.saveExcelFile(excelBuffer, fileName);
    // let t1 = "الكلية, القسم, الدراسة, المرحلة, المادة, مشمولين, الرابط, الوقت"+"\n";
    // this.exams.forEach(e => {
    //   let d1 = e.colege + "," + e.dpartment.name + "," + e.exam.study + "," + e.exam.stage + "," + e.exam.material + "," + e.exam.included + "," + e.exam.meeting + "," + e.exam.time + '\n';
    //   t1 = t1 + d1;
    // })
    let blob = new Blob([excelBuffer], {type: fileType})
    let filename = "report3-"+this.functions.now()+".xlsx";
    saveAs(blob, filename)
  }
  syschng(){
    let exams2 = this.examso.filter(e => e.exam.system == this.systems[this.system].name)
    this.exams = exams2
  }

}
