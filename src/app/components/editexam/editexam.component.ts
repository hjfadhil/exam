import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExaminfoService } from 'src/app/services/examinfo.service';
import { Router } from '@angular/router';
import { platform } from 'process';
import { AngularFirestore } from '@angular/fire/firestore';
import { ExamtypesService } from 'src/app/services/examtypes.service';

@Component({
  selector: 'app-editexam',
  templateUrl: './editexam.component.html',
  styleUrls: ['./editexam.component.css']
})
export class EditexamComponent implements OnInit {

  material: FormControl = new FormControl('')
  study: FormControl = new FormControl('صباحي')
  date: FormControl = new FormControl('')
  time: FormControl = new FormControl('')
  long: FormControl = new FormControl('')
  stage: FormControl = new FormControl('المرحلة الأولى')
  classroom: FormControl = new FormControl('')
  platform: FormControl = new FormControl('')
  meeting: FormControl = new FormControl('')
  included: FormControl = new FormControl('')
  inrule: FormControl = new FormControl('')
  abs: FormControl = new FormControl('')
  teacher: FormControl = new FormControl('')
  mq: FormControl = new FormControl('')
  qq: FormControl = new FormControl('')
  systems = []
  system
  trial

  exam
  department

  constructor(private examinfoS: ExaminfoService,
              private router: Router,
              private afs: AngularFirestore,
              private examtypesService: ExamtypesService,
    ) { 
    this.department = this.examinfoS.department
    this.exam = this.examinfoS.selexam
    this.material.setValue(this.exam.material)
    this.teacher.setValue(this.exam.teacher)
    this.study.setValue(this.exam.study)
    this.date.setValue(this.exam.date)
    this.time.setValue(this.exam.time)
    this.long.setValue(this.exam.long)
    this.stage.setValue(this.exam.stage)
    this.classroom.setValue(this.exam.classroom)
    this.platform.setValue(this.exam.platform)
    this.meeting.setValue(this.exam.meeting)
    this.included.setValue(this.exam.included)
    this.inrule.setValue(this.exam.inrule)
    this.abs.setValue(this.exam.abs)
    this.mq.setValue(this.exam.mq)
    this.qq.setValue(this.exam.qq)
    
  }

  ngOnInit(): void {
    this.examtypesService.getExamTypes().subscribe(list => {
      this.systems = list.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data(),
        }
      })
      this.system = this.systems.findIndex(s => s.name == this.exam.system)
      this.trial = this.exam.trial
    })
  }

  update(){
    if(this.mq.value == null){
      this.mq.setValue(" ")
    }
    if(this.qq.value == null){
      this.qq.setValue(" ")
    }
    let eo = {
      id: this.exam.id,
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
      dprtid: this.exam.dprtid,
      mq: this.mq.value,
      qq: this.qq.value,
      system: this.systems[this.system].name,
      trial: this.trial,
    }
    this.afs.collection("examacademicyears").doc(this.department.examay).collection("exams").doc(this.department.examid)
    .collection('departments').doc(this.department.id).collection('dprtexams').doc(this.exam.id).update(eo).then(() => {
      this.router.navigate(['/examinfo'])
    })
  }
  cancel(){
    this.router.navigate(['/examinfo'])
  }

  delete(){
    this.afs.collection("examacademicyears").doc(this.department.examay).collection("exams").doc(this.department.examid)
    .collection('departments').doc(this.department.id).collection('dprtexams').doc(this.exam.id).delete().then(() => {
      this.router.navigate(['/examinfo'])
    })
  }

  

}
