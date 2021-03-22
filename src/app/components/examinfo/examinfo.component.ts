import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExaminfoService } from 'src/app/services/examinfo.service';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { saveAs } from 'file-saver';
import { FunctionsModule } from 'src/app/models/functions/functions.module';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-examinfo',
  templateUrl: './examinfo.component.html',
  styleUrls: ['./examinfo.component.css']
})
export class ExaminfoComponent implements OnInit {

  exams$: Observable<any[]>
  curdate: string
  exams = []
  oexams = []

  constructor(private router: Router,
              private examinfoS: ExaminfoService,
              private auth: AngularFireAuth,
              private loginS: LoginService,
              private afs: AngularFirestore,
              private functions: FunctionsModule,
    ) { 
      let cd = new Date();
      let mm = cd.getMonth()+1;
      let m = "" + mm
      m.length == 1? m="0"+m : m=m;
      let d = "" + cd.getDate()
      d.length == 1? d="0"+d : d=d;
      let nd = cd.getFullYear() + "-" + m + "-" + d
      this.curdate = nd
      this.loginS.dprt$.subscribe(department => {
        if(department != null){
          this.examinfoS.department = department
          this.afs.collection("examacademicyears").doc(department.examay).collection("exams").doc(department.examid)
          .collection("departments").doc(this.loginS.dprtid).collection("dprtexams", ref => ref.where("date", "==", this.curdate)).valueChanges()
          .subscribe(r => {
            console.log(r);
            
            r.forEach(e => {
              if(e.stage == 'المرحلة الأولى'){
                e.stagen = 0 
              }else if(e.stage == 'المرحلة الثانية'){
                e.stagen = 1 
              }else if(e.stage == 'المرحلة الثالثة'){
                e.stagen = 2 
              }else if(e.stage == 'المرحلة الرابعة'){
                e.stagen = 3 
              }else if(e.stage == 'المرحلة الخامسة'){
                e.stagen = 4 
              }else if(e.stage == 'المرحلة السادسة'){
                e.stagen = 5 
              }else if(e.stage == 'الماجستير'){
                e.stagen = 6 
              }
              
            })
            this.exams = r
            this.exams = this.exams.sort((a,b) => {
               if(a.study < b.study){
                return 1
              }else if (a.study > b.study){
                return -1
              }else{
                return 0
              }
            })
            this.exams = this.exams.sort((a,b) => {
              if(a.stagen < b.stagen){
                return 1
              }else if(a.stagen > b.stagen){
                return -1
              }else{
                return 0
              }
            })
            this.exams = this.exams.sort((a,b) => {
              if(a.date > b.date){
                return 1
              }else{
                return -1
              }
            })
            this.oexams = this.exams
          })
        }
      })
  }

  ngOnInit(): void {
  }

  addnewexam(){
    this.router.navigate(['/newexam'])
  }

  editexam(exam){
    this.examinfoS.selexam = exam
    this.router.navigate(['/editexam'])
  }

  getexams(){
    this.loginS.dprt$.subscribe(department => {
      if(department != null){
       this.afs.collection("examacademicyears").doc(department.examay).collection("exams").doc(department.examid)
        .collection("departments").doc(this.loginS.dprtid).collection("dprtexams", ref => ref.where("date", "==", this.curdate)).valueChanges()
        .subscribe(r => {
          r.forEach(e => {
            if(e.stage == 'المرحلة الأولى'){
              e.stagen = 0 
            }else if(e.stage == 'المرحلة الثانية'){
              e.stagen = 1 
            }else if(e.stage == 'المرحلة الثالثة'){
              e.stagen = 2 
            }else if(e.stage == 'المرحلة الرابعة'){
              e.stagen = 3 
            }else if(e.stage == 'المرحلة الخامسة'){
              e.stagen = 4 
            }else if(e.stage == 'المرحلة السادسة'){
              e.stagen = 5 
            }
            
          })
          this.exams = r
          this.exams = this.exams.sort((a,b) => {
             if(a.study < b.study){
              return 1
            }else if (a.study > b.study){
              return -1
            }else{
              return 0
            }
          })
          this.exams = this.exams.sort((a,b) => {
            if(a.stagen < b.stagen){
              return 1
            }else if(a.stagen > b.stagen){
              return -1
            }else{
              return 0
            }
          })
          this.exams = this.exams.sort((a,b) => {
            if(a.date > b.date){
              return 1
            }else{
              return -1
            }
          })
          this.oexams = this.exams
        })
      }
    })
  }

  rf(){
    let department = this.examinfoS.department;
    this.afs.collection("examacademicyears").doc(department.examay).collection("exams").doc(department.examid)
    .collection("departments").doc(this.loginS.dprtid).collection("dprtexams").valueChanges()
    .subscribe(r => {
      r.forEach(e => {
        if(e.stage == 'المرحلة الأولى'){
          e.stagen = 0 
        }else if(e.stage == 'المرحلة الثانية'){
          e.stagen = 1 
        }else if(e.stage == 'المرحلة الثالثة'){
          e.stagen = 2 
        }else if(e.stage == 'المرحلة الرابعة'){
          e.stagen = 3 
        }else if(e.stage == 'المرحلة الخامسة'){
          e.stagen = 4 
        }else if(e.stage == 'المرحلة السادسة'){
          e.stagen = 5 
        }
        
      })
      this.exams = r
      this.exams = this.exams.sort((a,b) => {
         if(a.study < b.study){
          return 1
        }else if (a.study > b.study){
          return -1
        }else{
          return 0
        }
      })
      this.exams = this.exams.sort((a,b) => {
        if(a.stagen < b.stagen){
          return 1
        }else if(a.stagen > b.stagen){
          return -1
        }else{
          return 0
        }
      })
      this.exams = this.exams.sort((a,b) => {
        if(a.date > b.date){
          return 1
        }else{
          return -1
        }
      })
      this.oexams = this.exams
    })    
  }

  savefile(){
    let exos = []
    let t1 = "الدراسة, المرحلة, المادة, المدرس, التاريخ, الوقت, الزمن, منصة الامتحان, منصة المتابعة, رابط المتابعة, مشمولين, المشاركين, الغياب"+"\n";
    this.exams.forEach(e => {
      let d1 = e.study + "," + e.stage + "," + e.material + "," + e.teacher + "," + e.date + "," + e.time + "," + e.long + "," + e.classroom + "," + e.platform + "," + e.meeting + "," + e.included + "," + e.inrule + "," + e.abs + '\n';
      t1 = t1 + d1;
      let exo = {
        الدراسة: e.study,
        المرحلة: e.stage,
        المادة: e.material,
        المدرس: e.teacher,
        التاريخ: e.date,
        الوقت: e.time,
        الزمن: e.long,
        منصة_الامتحان: e.classroom,
        منصة_المتابعة: e.platform,
        رابط_الامتحان: e.meeting,
        مشمولين: e.included,
        مشاركين: e.inrule,
        غائبين: e.abs,
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
    // let filename = "reportsch-"+this.functions.now()+".csv";
    // saveAs(blob, filename)
  }

  sortf(stage){
    this.exams = this.oexams.filter(e => e.stage == stage)    
  }

}
