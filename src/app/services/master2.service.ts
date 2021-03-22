import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FunctionsModule } from '../models/functions/functions.module';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Master2Service {

  dprts$: Subject<any[]> = new Subject<any[]>();
  exams = []
  dprts = []
  colid
  seldprt

  constructor(private auth: AngularFireAuth,
              private afs: AngularFirestore,
              functions: FunctionsModule,
    ) { 
      let nd = functions.now()
      this.auth.authState.subscribe(user => {
      this.colid = user.displayName
      this.afs.collection("examacademicyears").doc("2021-2020").collection("exams").doc("XD9ycGxdUYWSCSmwLU41")
      .collection("departments", ref => ref.where('collegeid', '==', this.colid)).valueChanges().subscribe(rp => {
        this.dprts = rp
        this.dprts.forEach((dprt, i) => {
          this.dprts[i]['exams'] = []
          this.afs.collection("examacademicyears").doc('2021-2020').collection("exams").doc('XD9ycGxdUYWSCSmwLU41')
          .collection("departments").doc(dprt.id).collection("dprtexams", ref => ref.where("date", "==", nd)).valueChanges().subscribe(de => {
            de.forEach(e => {
              this.dprts[i]['exams'][e.id] = e
              this.dprts$.next(this.dprts)
            })
          })
        })
      })
    })
  }
  getexams(d){
    this.afs.collection("examacademicyears").doc("2021-2020").collection("exams").doc("XD9ycGxdUYWSCSmwLU41")
    .collection("departments", ref => ref.where('collegeid', '==', this.colid)).valueChanges().subscribe(rp => {
      this.dprts = rp
      this.dprts.forEach((dprt, i) => {
        this.dprts[i]['exams'] = []
        this.afs.collection("examacademicyears").doc('2021-2020').collection("exams").doc('XD9ycGxdUYWSCSmwLU41')
        .collection("departments").doc(dprt.id).collection("dprtexams", ref => ref.where("date", "==", d)).valueChanges().subscribe(de => {
          de.forEach(e => {
            this.dprts[i]['exams'][e.id] = e
            this.dprts$.next(this.dprts)
          })
        })
      })
    })    
  }

  approvf(){
    this.seldprt.exams2.forEach(exam => {
      this.afs.collection("examacademicyears").doc('2021-2020').collection("exams").doc('XD9ycGxdUYWSCSmwLU41')
      .collection('departments').doc(exam.dprtid).collection("dprtexams").doc(exam.id).update({approved: true})
    })
  }
}
