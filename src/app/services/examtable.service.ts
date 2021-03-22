import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ExamtableService {

  department
  exams$

  constructor(private afs: AngularFirestore,
              private loginS: LoginService,
    ) { 
      this.loginS.examdoc$.subscribe(r => {
        this.department = this.loginS.department
        this.exams$ = this.afs.collection("examacademicyears").doc(this.department['examay']).collection("exams")
        .doc(this.department['examid']).collection("departments").doc(this.department.id).collection("dprtexams").valueChanges()
      })
  }
}
