import { Component, OnInit } from '@angular/core';
import { GexamtableService } from 'src/app/services/gexamtable.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FunctionsModule } from 'src/app/models/functions/functions.module';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent implements OnInit {

  exams = []
  examso = []
  exams2 = []
  exams3 = []
  exams4 = []
  exams5 = []
  total1 = []
  total2 = 0

  constructor(private gexamtableS: GexamtableService,
              private afs: AngularFirestore,
              private functions: FunctionsModule,
    ) { 
      this.exams5[0] = 0
      this.exams5[1] = 0
      this.afs.collection("examacademicyears").doc("default").valueChanges().subscribe((r:any) => {
        this.afs.collection("examacademicyears").doc("2020-2019").collection("exams").doc("LdKzUQEKYKZVqL0KPFfm")
        .collection("departments").get().subscribe(rr => {
          rr.forEach(dprt => {
            let dd = dprt.data()
            if(dprt.id){
              this.afs.collection("examacademicyears").doc("2020-2019").collection("exams").doc("LdKzUQEKYKZVqL0KPFfm")
              .collection("departments").doc(dprt.id).collection("dprtexams", ref => ref.where('date', '==', this.functions.now())).get().subscribe(ss => {
                ss.forEach(s => {
                  let e = {
                    colege: dd.collegename,
                    dpartment: dd,
                    exam: s.data(),
                  }
                  if(!this.exams3[dd.collegename]){
                    this.exams3[dd.collegename] = []
                    this.exams3[dd.collegename][0] = []
                    this.exams3[dd.collegename][0][e.exam.study] = e.exam.included
                    this.exams3[dd.collegename][1] = e.exam.included
                  }else{
                    if(this.exams3[dd.collegename][0][e.exam.study] == undefined){
                      this.exams3[dd.collegename][0][e.exam.study] = e.exam.included
                    }else{
                      this.exams3[dd.collegename][0][e.exam.study] = this.exams3[dd.collegename][0][e.exam.study] + e.exam.included
                    }
                    this.exams3[dd.collegename][1] = this.exams3[dd.collegename][1] + e.exam.included
                  }
                  if(e.exam.study == 'صباحي'){
                    if(e.exam.included != NaN){
                      this.exams5[0] = this.exams5[0] + e.exam.included
                    }
                  }else{
                    if(e.exam.included != NaN){
                      this.exams5[1] = this.exams5[1] + e.exam.included
                    }
                  }
                  let fe = this.exams.findIndex(ee => ee.college == e.colege && ee.study == e.exam.study)
                  if(fe == -1){
                    let eo = {
                      college: e.colege,
                      total: e.exam.included,
                      study: e.exam.study,
                    }
                    let indx = this.exams.push(eo)
                    if(this.total1[e.colege]){
                      this.total1[e.colege] = this.total1[e.colege] + e.exam.included;
                    }else{
                      this.total1[e.colege] = e.exam.included;
                    }
                    this.total2 = this.total2 + e.exam.included;
                  }else{
                    this.exams[fe].total = this.exams[fe].total + e.exam.included
                    this.total1[e.colege] = this.total1[e.colege] + e.exam.included;
                    this.total2 = this.total2 + e.exam.included;
                  }
                })
                this.exams.sort((e1, e2) => {
                  if(e1.college < e2.college){
                    return 1
                  }else{
                    return -1
                  }
                })
                this.exams4 = Object.keys(this.exams3).map(eid => {
                  let ex = this.exams3[eid]
                  ex.col = eid
                  return ex;
                })
              })
            }
          })
        })
      })
  }

  ngOnInit(): void {
  }

  save(){
    let exos = []
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    this.exams4.forEach(c => {
      let exo = {}
      exo['الكلية'] = c.col
      exo['الصباحي'] = c[0]['صباحي']
      exo['المسائي'] = c[0]['مسائي']
      exo['المجموع'] = c[1]
      exos.push(exo)
    })
    let exo2 = {}
    this.exams4.forEach(c => {
      exo2['الكلية'] = 'المجموع'
      exo2['الصباحي'] = this.exams5[0]
      exo2['المسائي'] = this.exams5[1]
      exo2['المجموع'] = this.exams5[0] + this.exams5[1]
    })
    let fex = exos.findIndex(e => e['الكلية'] == 'المجموع')
    if(fex == -1){
      exos.push(exo2)
    }
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exos);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const sh: XLSX.Sheet = wb.Sheets['data']
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    let blob = new Blob([excelBuffer], {type: fileType})
    let filename = "ctotalreport-"+this.functions.now()+".xlsx";
    saveAs(blob, filename)
  }

}
