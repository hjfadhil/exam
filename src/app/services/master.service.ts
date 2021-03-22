import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MohserModule } from '../models/mohser/mohser.module';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  mohserM
  selcollege
  seldprtid
  seldprt
  prog: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  doors = []
  examay
  examid
  exs$
  examname
  examo$: Subject<any> = new Subject<any>()

  constructor(private loginS: LoginService,
              private afs: AngularFirestore,
              private mohser: MohserModule,
              private router: Router,
              private auth: AngularFireAuth,
    ) { 
      let cd = new Date();
      let mm = cd.getMonth()+1;
      let m = "" + mm
      m.length == 1? m="0"+m : m=m;
      let d = "" + cd.getDate()
      d.length == 1? d="0"+d : d=d;
      let nd = cd.getFullYear() + "-" + m + "-" + d
      this.mohserM = this.mohser.basrah
      this.afs.collection("examacademicyears").doc("default").valueChanges().subscribe((r:any) => {
        for (const key in this.mohserM.colleges) {
          if (this.mohserM.colleges.hasOwnProperty(key)) {
            const college = this.mohserM.colleges[key];
            this.mohserM.colleges[key]["exams"] = []
            this.mohserM.colleges[key]["dprts"] = []
            this.examay = r.ay
            this.examid = r.exam.id
            this.examname = r.exam.name
            this.examo$.next(r)
            this.afs.collection("examacademicyears").doc(r.ay).collection("exams").doc(r.exam.id)
              .collection("departments", ref => ref.where('collegeid', '==', college.id)).valueChanges().subscribe(rp => {
                this.mohserM.colleges[key]["dprts"] = rp
                if(rp.length > 0){
                  rp.forEach(rr => {
                    this.afs.collection("examacademicyears").doc(r.ay).collection("exams").doc(r.exam.id)
                    .collection("departments").doc(rr.id).collection("dprtexams", ref => ref.where("date", "==", nd)).valueChanges().subscribe(de => {
                      de.forEach(e => {
                        let fe = this.mohserM.colleges[key]["exams"].findIndex(te => te.id == e.id)
                        if(fe == -1){
                          this.mohserM.colleges[key]["exams"].push(e)
                        }else{
                          this.mohserM.colleges[key]["exams"][fe] = e
                        }
                      })
                    })
                  })
                }
            })
          }
        }
      })
      // this.mohserM = this.mohser.basrah
      //     for (const key in this.mohserM.colleges) {
      //       if (this.mohserM.colleges.hasOwnProperty(key)) {
      //         let cd = new Date();
      //         let mm = cd.getMonth()+1;
      //         let m = "" + mm
      //         m.length == 1? m="0"+m : m=m;
      //         let d = "" + cd.getDate()
      //         d.length == 1? d="0"+d : d=d;
      //         let nd = cd.getFullYear() + "-" + m + "-" + d

      //         const college = this.mohserM.colleges[key];
      //         this.mohserM.colleges[key]["exams"] = []
      //         this.mohserM.colleges[key]["dprts"] = []
      //         this.afs.collection("examacademicyears").doc(this.loginS.department['examay']).collection("exams").doc(this.loginS.department['examid'])
      //         .collection("departments", ref => ref.where('collegeid', '==', college.id)).valueChanges().subscribe(r => {
      //           this.mohserM.colleges[key]["dprts"] = r
      //           r.forEach(rr => {
      //             this.afs.collection("examacademicyears").doc(this.loginS.department['examay']).collection("exams").doc(this.loginS.department['examid'])
      //             .collection("departments").doc(rr.id).collection("dprtexams", ref => ref.where("date", "==", nd)).valueChanges().subscribe(de => {
      //               this.mohserM.colleges[key]["exams"].push(...de)
      //             })
      //           })
      //         })
      //       }
      //     } 
  }

  getexams(d){
    let  i = 0
    for (const key in this.mohserM.colleges) {
      if (this.mohserM.colleges.hasOwnProperty(key)) {
        const college = this.mohserM.colleges[key];
        this.mohserM.colleges[key]["exams"] = []
        this.mohserM.colleges[key]["dprts"] = []
        this.afs.collection("examacademicyears").doc(this.examay).collection("exams").doc(this.examid)
          .collection("departments", ref => ref.where('collegeid', '==', college.id)).valueChanges().subscribe(rp => {
            this.mohserM.colleges[key]["dprts"] = rp
            if(rp.length > 0){
              rp.forEach(rr => {
                this.afs.collection("examacademicyears").doc(this.examay).collection("exams").doc(this.examid)
                .collection("departments").doc(rr.id).collection("dprtexams", ref => ref.where("date", "==", d)).valueChanges().subscribe(de => {
                  de.forEach(e => {
                    let fe = this.mohserM.colleges[key]["exams"].findIndex(te => te.id == e.id)
                    if(fe == -1){
                      this.mohserM.colleges[key]["exams"].push(e)
                    }else{
                      this.mohserM.colleges[key]["exams"][fe] = e
                    }
                  })
                  //this.mohserM.colleges[key]["exams"].push(...de)
                })
              })
            }
          })
      }
    }
    // for (const key in this.mohserM.colleges) {
    //   if (this.mohserM.colleges.hasOwnProperty(key)) {
    //     const college = this.mohserM.colleges[key];
    //     this.mohserM.colleges[key]["exams"] = []
    //     this.mohserM.colleges[key]["dprts"] = []
    //     this.afs.collection("examacademicyears").doc(this.loginS.department['examay']).collection("exams").doc(this.loginS.department['examid'])
    //     .collection("departments", ref => ref.where('collegeid', '==', college.id)).valueChanges().subscribe(r => {
    //       this.mohserM.colleges[key]["dprts"] = r
    //       r.forEach(rr => {
    //         this.afs.collection("examacademicyears").doc(this.loginS.department['examay']).collection("exams").doc(this.loginS.department['examid'])
    //         .collection("departments").doc(rr.id).collection("dprtexams", ref => ref.where("date", "==", d)).valueChanges().subscribe(de => {
    //           this.mohserM.colleges[key]["exams"].push(...de)
    //           de.forEach(e => {
    //             this.prog.next(++i)
    //           })
    //         })
    //       })
    //     })
    //   }
    // }
  }

  selay(ay){
    return this.afs.collection("examacademicyears").doc(ay).collection("exams").valueChanges()
  }
  getexams2(ay, ex, d){
    let  i = 0
    for (const key in this.mohserM.colleges) {
      if (this.mohserM.colleges.hasOwnProperty(key)) {
        const college = this.mohserM.colleges[key];
        this.mohserM.colleges[key]["exams"] = []
        this.mohserM.colleges[key]["dprts"] = []
        this.afs.collection("examacademicyears").doc(ay).collection("exams").doc(ex)
        .collection("departments", ref => ref.where('collegeid', '==', college.id)).valueChanges().subscribe(rp => {
          this.mohserM.colleges[key]["dprts"] = rp
          if(rp.length > 0){
            rp.forEach(rr => {
              this.afs.collection("examacademicyears").doc(ay).collection("exams").doc(ex)
              .collection("departments").doc(rr.id).collection("dprtexams", ref => ref.where("date", "==", d)).valueChanges().subscribe(de => {
                this.mohserM.colleges[key]["exams"].push(...de)
              })
            })
          }
        })
      }
    }
  }
}
