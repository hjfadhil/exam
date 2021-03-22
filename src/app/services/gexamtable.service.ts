import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from './login.service';
import { MohserModule } from '../models/mohser/mohser.module';
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { FunctionsModule } from '../models/functions/functions.module';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GexamtableService {

  exams = []
  mohserM
  prog: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  t = []
  examname
  examay
  examid
  examo$: Subject<any> = new Subject<any>()
  exams2
  gexam = []
  gexam2 = [] 

  constructor(private afs: AngularFirestore,
              private loginS: LoginService,
              private mohser: MohserModule,
              private auth: AngularFireAuth,
              private functions: FunctionsModule,
              ) { 
            this.mohserM = this.mohser.basrah
            let i = 0
            this.auth.authState.subscribe(user => {
              if(user){
                if(user.email == 'admin@gmail.com'){
                  this.afs.collection("examacademicyears").doc("default").valueChanges().subscribe((r:any) => {
                    this.afs.collection("examacademicyears").doc("2021-2020").collection("exams").doc("XD9ycGxdUYWSCSmwLU41")
                        .collection("departments").get().subscribe(rr => {
                          rr.forEach(dprt => {
                            let dd = dprt.data()
                            if(dprt.id){
                              this.afs.collection("examacademicyears").doc("2021-2021").collection("exams").doc("XD9ycGxdUYWSCSmwLU41")
                              .collection("departments").doc(dprt.id).collection("dprtexams", ref => ref.where('date', '==', this.functions.now())).get().subscribe(ss => {
                                ss.forEach(s => {
                                  // if(s.type === 'added'){
                                  //   let e = {
                                  //     colege: dprt.collegename,
                                  //     dpartment: dprt,
                                  //     exam: s.payload.doc.data(),
                                  //   }
                                  //   this.gexam[s.payload.doc.id] = e
                                  // }else if(s.type === 'removed'){
                                  //   delete this.gexam[s.payload.doc.id]
                                  // }
                                  let e = {
                                    colege: dd.collegename,
                                    dpartment: dd,
                                    exam: s.data(),
                                  }
                                  this.gexam[s.id] = e
                                })
                                this.prog.next(100)
                              })
                            }
                          })
                        })
                    for (const key in this.mohserM.colleges) {
                      if (this.mohserM.colleges.hasOwnProperty(key)) {
                        const college = this.mohserM.colleges[key];
                        this.mohserM.colleges[key]["exams"] = []
                        this.mohserM.colleges[key]["dprts"] = []
                        this.examay = r.ay
                        this.examid = r.exam.id
                        this.examname = r.exam.name
                        this.examo$.next(r)
                        
                      }
                    }
                  })
                }else{
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
                  //         .collection("departments").doc(rr.id).collection("dprtexams").valueChanges().subscribe((de:any) => {
                  //           de.forEach(ee => {
                  //             let fei = this.mohserM.colleges[key]["exams"].findIndex(e => e.id == ee.id)
                  //             if(fei == -1){
                  //               this.mohserM.colleges[key]["exams"].push(ee)
                  //             }else{
                  //               this.mohserM.colleges[key]["exams"][fei] = ee
                  //             }
                  //             this.prog.next(++i);
                  //           })
                  //         })
                  //       })
                  //     })
                  //   }
                  // }
                }
              }
            })
  }

  getexambydate(d: string){
    this.gexam = []
    this.afs.collection("examacademicyears").doc("2021-2020").collection("exams").doc("XD9ycGxdUYWSCSmwLU41")
    .collection("departments").get().subscribe(dprts => {
      dprts.forEach(dprt => {
        this.afs.collection("examacademicyears").doc("2021-2020").collection("exams").doc("XD9ycGxdUYWSCSmwLU41")
        .collection("departments").doc(dprt.id).collection("dprtexams", ref => ref.where('date', '==', d)).get().subscribe(ss => {
          ss.forEach(s => {
            let e = {
              colege: dprt.data()['collegename'],
              dpartment: dprt.data(),
              exam: s.data(),
            }
            this.gexam[s.id] = e
          })
          this.prog.next(100)
        })
      })
    })
    return this.gexam
  }
  getallexams(){
    this.gexam = []
    this.afs.collection("examacademicyears").doc("2021-2020").collection("exams").doc("XD9ycGxdUYWSCSmwLU41")
    .collection("departments").get().subscribe(dprts => {
      dprts.forEach(dprt => {
        this.afs.collection("examacademicyears").doc("2021-2020").collection("exams").doc("XD9ycGxdUYWSCSmwLU41")
        .collection("departments").doc(dprt.id).collection("dprtexams").get().subscribe(ss => {
          ss.forEach(s => {
            let e = {
              colege: dprt.data()['collegename'],
              dpartment: dprt.data(),
              exam: s.data(),
            }
            this.gexam[s.id] = e
          })
          this.prog.next(100)
        })
      })
    })
    return this.gexam
  }
  getExams(){
      this.afs.collection("examacademicyears").doc("default").valueChanges().subscribe((r:any) => {
        this.afs.collection("examacademicyears").doc("2021-2020").collection("exams").doc("XD9ycGxdUYWSCSmwLU41")
            .collection("departments").get().subscribe(rr => {
              rr.forEach(dprt => {
                let dd = dprt.data()
                if(dprt.id){
                  this.afs.collection("examacademicyears").doc("2021-2020").collection("exams").doc("XD9ycGxdUYWSCSmwLU41")
                  .collection("departments").doc(dprt.id).collection("dprtexams", ref => ref.where('date', '==', this.functions.now())).get().subscribe(ss => {
                    ss.forEach(s => {
                      // if(s.type === 'added'){
                      //   let e = {
                      //     colege: dprt.collegename,
                      //     dpartment: dprt,
                      //     exam: s.payload.doc.data(),
                      //   }
                      //   this.gexam[s.payload.doc.id] = e
                      // }else if(s.type === 'removed'){
                      //   delete this.gexam[s.payload.doc.id]
                      // }
                      let e = {
                        colege: dd.collegename,
                        dpartment: dd,
                        exam: s.data(),
                      }
                      this.gexam[s.id] = e
                    })
                    this.prog.next(100)
                  })
                }
              })
            })
        for (const key in this.mohserM.colleges) {
          if (this.mohserM.colleges.hasOwnProperty(key)) {
            const college = this.mohserM.colleges[key];
            this.mohserM.colleges[key]["exams"] = []
            this.mohserM.colleges[key]["dprts"] = []
            this.examay = r.ay
            this.examid = r.exam.id
            this.examname = r.exam.name
            this.examo$.next(r)
            
          }
        }
      })
    }    
}
