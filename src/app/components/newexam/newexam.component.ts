import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from 'src/app/services/login.service';
import { AcademicyearsService } from 'src/app/services/academicyears.service';
import { merge } from 'rxjs';
import { ExamtypesService } from 'src/app/services/examtypes.service';

@Component({
  selector: 'app-newexam',
  templateUrl: './newexam.component.html',
  styleUrls: ['./newexam.component.css']
})
export class NewexamComponent implements OnInit {

  material: FormControl = new FormControl('')
  study: FormControl = new FormControl('صباحي')
  date: FormControl = new FormControl('')
  time: FormControl = new FormControl('09:00')
  long: FormControl = new FormControl(3)
  stage: FormControl = new FormControl('المرحلة الأولى')
  classroom: FormControl = new FormControl('Google Classroom')
  platform: FormControl = new FormControl('Google Meeting')
  meeting: FormControl = new FormControl('')
  included: FormControl = new FormControl(0)
  inrule: FormControl = new FormControl(0)
  abs: FormControl = new FormControl(0)
  teacher: FormControl = new FormControl('')
  mq: FormControl = new FormControl('')
  qq: FormControl = new FormControl('')
  systems = []
  system
  trial
  examay
  exam

  constructor(private router: Router,
              private afs: AngularFirestore,
              private loginS: LoginService,
              private ayS: AcademicyearsService,
              private examtypesService: ExamtypesService,
    ) { 
      let cd = new Date();
      let mm = cd.getMonth()+1;
      let m = "" + mm
      m.length == 1? m="0"+m : m=m;
      let d = "" + cd.getDate()
      d.length == 1? d="0"+d : d=d;
      let nd = cd.getFullYear() + "-" + m + "-" + d
      this.date.setValue(nd)
      this.examay = loginS.department['examay']
      this.exam = loginS.department['examid']
      console.log(this.examay, this.exam);
      
  }

  ngOnInit(): void {
    this.examtypesService.getExamTypes().subscribe(list => {
      let array = list.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        }
      })
      this.systems = array;
    })
  }

  create(){
    if(this.system && this.trial){
    let id = this.afs.createId()
    let eo = {
      id: id,
      material: this.material.value,
      study: this.study.value,  
      date:  this.date.value,
      time:  this.time.value,
      long:  this.long.value,
      stage: this.stage.value,
      classroom: this.classroom.value,
      platform: this.platform.value,
      meeting:  this.meeting.value,
      included: this.included.value,
      inrule:   this.inrule.value,
      abs:      this.abs.value,
      teacher:  this.teacher.value,
      dprtid: this.loginS.dprtid,
      mq: this.mq.value,
      qq: this.qq.value,
      system: this.systems[this.system].name,
      trial: this.trial,
    }
    this.afs.collection("examacademicyears").doc(this.loginS.department.examay).collection("exams").doc(this.loginS.department.examid)
    .collection('departments').doc(this.loginS.dprtid).get().subscribe(res => {
      if(res.exists){
        this.afs.collection("examacademicyears").doc(this.examay).collection("exams").doc(this.exam)
        .collection('departments').doc(this.loginS.dprtid).collection('dprtexams').doc(id).set(eo).then(() => {
          this.router.navigate(['/examinfo'])
        })
        // this.afs.collection("examacademicyears").doc(this.loginS.department.examay).collection("exams").doc(this.loginS.department.examid)
        // .collection('departments').doc(this.loginS.dprtid).collection('dprtexams').doc(id).set(eo).then(() => {
        //   this.router.navigate(['/examinfo'])
        // })
      }else{
        let dprto = {
          id: this.loginS.dprtid,
          name: this.loginS.dprtname,
          collegeid: this.loginS.collegeid,
          collegename: this.loginS.collegename
        }
        this.afs.collection("examacademicyears").doc(this.loginS.department.examay).collection("exams").doc(this.loginS.department.examid)
        .collection('departments').doc(this.loginS.dprtid).set(dprto).then(() => {
          this.afs.collection("examacademicyears").doc(this.examay).collection("exams").doc(this.exam)
          .collection('departments').doc(this.loginS.dprtid).collection('dprtexams').doc(id).set(eo).then(() => {
            this.router.navigate(['/examinfo'])
          })
          // this.afs.collection("examacademicyears").doc(this.loginS.department.examay).collection("exams").doc(this.loginS.department.examid)
          // .collection('departments').doc(this.loginS.dprtid).collection('dprtexams').doc(id).set(eo).then(() => {
          //   this.router.navigate(['/examinfo'])
          // })
        })
      }
    })
    }else{
      alert("يجب ادخال نظام الدراسة ودور الأمتحان")
    }
  }
  cancel(){
    this.router.navigate(['/examinfo'])
  }

  log(){
    console.log(this.systems[this.system]);
    
  }

}
