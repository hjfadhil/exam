import { Component, OnInit } from '@angular/core';
import { Master2Service } from 'src/app/services/master2.service';
import { FunctionsModule } from 'src/app/models/functions/functions.module';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master2',
  templateUrl: './master2.component.html',
  styleUrls: ['./master2.component.css']
})
export class Master2Component implements OnInit {

  dprts = []
  curdate
  selayr
  selex

  constructor(private master2S: Master2Service,
              private functions: FunctionsModule,
              private router: Router,
    ) { 
      this.dprts = this.master2S.dprts
      this.curdate = functions.now()
      this.master2S.dprts$.subscribe(r => {
        this.dprts = this.master2S.dprts
        this.dprts.forEach((dprt, i) => {
          dprt.exams2 = Object.keys(dprt.exams).map(exid => {
            let ex = dprt.exams[exid]
            return ex;
          })
        })
      })
    
  }

  ngOnInit(): void {
  }

  seldate(){
    this.master2S.getexams(this.curdate)
  }
  selay(){
  }
  selexf(){

  }
  dprtexams(dprt){
    this.master2S.seldprt = dprt
    this.router.navigate(['/dprtexams2'])
  }

  save(){
    let exos = []
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    this.dprts.forEach(dprt => {
      dprt.exams2.forEach(e => {
        let exo = {
          الكلية: dprt.collegename,
          القسم: dprt.name,
        }
        exo['الدراسة'] = e.study
        exo['المرحلة'] = e.stage
        exo['المادة'] = e.material
        exo['المدرس'] = e.teacher
        exo['التاريخ'] = e.date
        exo['الوقت'] = e.time
        exo['الزمن'] = e.long
        exo['الصف'] = e.classroom
        exo['المنصة'] = e.platform
        exo['الرابط'] = e.meeting
        exo['المشمولين'] = e.included
        exo['المشاركين'] = e.inrule
        exo['الغياب'] = e.abs
        exos.push(exo)
      })
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exos);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const sh: XLSX.Sheet = wb.Sheets['data']
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    let blob = new Blob([excelBuffer], {type: fileType})
    let filename = "collegereport-"+this.functions.now()+".xlsx";
    saveAs(blob, filename)
  }

}
