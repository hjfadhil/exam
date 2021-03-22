import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: Subject<any> = new Subject<any>()
  userid: string
  dprtid: string
  dprtname: string
  collegeid: string
  collegename: string
  user2: Subject<any> = new Subject<any>()
  department: any = {}
  examdoc$: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  dprt$: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  dprtuser = false

  constructor(private auth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
    ) { 
    auth.authState.subscribe(user => {
      if(user){
        this.user.next(user)
        if(user.email == "admin@gmail.com"){
          this.afs.collection("examacademicyears").doc("default").valueChanges().subscribe((r:any) => {
            this.department['examay'] = r
            this.department['examid'] = r.exam.id
            this.dprt$.next(this.department)
            this.afs.collection("examacademicyears").doc(r.ay).collection("exams")
            .doc(r.exam.id).valueChanges().subscribe(rr => {
              this.examdoc$.next(rr)
              this.user.next(user)
            })
          })
        }else{
          if(user){
            this.userid = user.displayName
            if(this.userid){
              this.afs.collection("users").doc(user.displayName).valueChanges().subscribe((r:any) => {   
                if(r){
                  this.dprtuser = true
                  let dprtid = r.ref
                  this.dprtid = r.ref;
                  this.afs.collection("academics").doc(dprtid).valueChanges().subscribe((rr:any) => {
                    this.collegeid = rr.ref
                    this.dprtname = rr.name.ar
                    this.department = rr
                    this.collegename = r.name.ar
                      let u2 = {
                        userid: this.userid,
                        dprtid: this.dprtid,
                        dprtname: this.dprtname,
                        collegeid: this.collegeid,
                        collegename: this.collegename
                      }
                      this.user2.next(u2)
                    this.dprt$.next(this.department)
                    if(this.department['examid']){
                      this.afs.collection("examacademicyears").doc(this.department['examay']).collection("exams")
                      .doc(this.department['examid']).valueChanges().subscribe(doc => {
                        this.examdoc$.next(doc)
                        this.user.next(user)
                        
                        // if(doc.exists){
                        // }else{
                        // }
                      })
                    }else{

                    }
                    this.afs.collection("academics").doc(r.ref).valueChanges().subscribe((r:any) => {
                      this.afs.collection("academics").doc(r.ref).get().subscribe(col => {
                        console.log(col.data());
                        this.collegename = "كلية " + col.data().name["ar"]
                        let u2 = {
                          userid: this.userid,
                          dprtid: this.dprtid,
                          dprtname: this.dprtname,
                          collegeid: this.collegeid,
                          collegename: this.collegename
                        }
                        this.user2.next(u2)
                      })
                    })
                  })
                }else{
                  router.navigate(['/master2'])                  
                }
              })
            }else{
              let colid = user.photoURL
              
            }
          }
        }
      }
    })
  }

  login(em: string, pw){
    let emm = em.trim()
    return this.auth.signInWithEmailAndPassword(emm, pw)
  }

  logout(){
    this.auth.signOut().then(() => {
      
    })
  }

  movedata(){
    this.afs.collection("examacademicyears").doc("2019-2018").collection("exams").doc("UQDSVm9Eo9bw0LGI9wrD")
    .collection("departments").doc("xw3UpywHoHeq7Pf1nj3v").valueChanges().subscribe(dprt => {
      this.afs.collection("examacademicyears").doc("2019-2018").collection("exams").doc("UQDSVm9Eo9bw0LGI9wrD")
      .collection("departments").doc("xw3UpywHoHeq7Pf1nj3v").collection("dprtexams").valueChanges().subscribe(exams => {
          this.afs.collection("examacademicyears").doc("2020-2019").collection("exams").doc("LdKzUQEKYKZVqL0KPFfm")
          .collection("departments").doc(dprt['id']).set(dprt).then(() => {
            exams.forEach(exam => {
              this.afs.collection("examacademicyears").doc("2020-2019").collection("exams").doc("LdKzUQEKYKZVqL0KPFfm")
              .collection("departments").doc(dprt['id']).collection("dprtexams").doc(exam.id).set(exam)
            })
          })
      })
    })
  }

}
