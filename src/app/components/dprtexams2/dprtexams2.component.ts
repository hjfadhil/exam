import { Component, OnInit } from '@angular/core';
import { Master2Service } from 'src/app/services/master2.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { FunctionsModule } from 'src/app/models/functions/functions.module';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-dprtexams2',
  templateUrl: './dprtexams2.component.html',
  styleUrls: ['./dprtexams2.component.css']
})
export class Dprtexams2Component implements OnInit {

  dprt
  examay
  examname

  constructor(private master2S: Master2Service,
              private router: Router,
              private functions: FunctionsModule,
              private masterS: MasterService,
    ) { 
      this.dprt = this.master2S.seldprt;
      if(!this.dprt){
        this.router.navigate(['/master2'])
      }
      this.masterS.examo$.subscribe(r => {
        this.examay = r.ay
        this.examname = r.exam.name
      })
  }

  ngOnInit(): void {
  }

  gomeet(link){

  }

  back(){
    this.router.navigate(['/master2'])
  }
  save(){
    let exos = []
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      this.dprt.exams2.forEach(e => {
        let exo = {
          الكلية: this.dprt.collegename,
          القسم: this.dprt.name,
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
        exo['النظام'] = e.system
        exo['الدور'] = e.trial
        exos.push(exo)
      })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exos);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const sh: XLSX.Sheet = wb.Sheets['data']
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    let blob = new Blob([excelBuffer], {type: fileType})
    let filename = "collegereport-"+this.functions.now()+".xlsx";
    saveAs(blob, filename)
  }

  approvf(){
    let c = confirm('عند المصادقة تكون بيانات القسم نهائية وتم تدقيقها من قبلكم! هل انت متأكد؟')
    if(c){
      this.master2S.approvf()
    }
  }

}
