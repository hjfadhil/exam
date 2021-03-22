import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user
  collegename
  dprtname
  department
  examay
  exam
  examinfo
  examname
  cn = false
  email
  logc = false
  uuser
  dprtuser = false

  constructor(private loginS: LoginService,
              private router: Router,
              private auth: AngularFireAuth,
              private afs: AngularFirestore,
    ) { 
      this.auth.authState.subscribe(user => {
        this.uuser = user
        if(!user){
          router.navigate([''])
        }else{
          this.email = user.email
          loginS.user.subscribe(u => {
            if(u == null){
              
            }else{
              loginS.user2.subscribe(uo => {
                if(uo != null){
                  this.collegename = uo.collegename
                  this.dprtname = uo.dprtname
                  this.examay = loginS.department['examay']
                  this.exam = loginS.department['examid']
                  this.dprtuser = true
                  this.loginS.examdoc$.subscribe(r => {
                    if(r){
                      this.examinfo  = r
                      this.examname = r.name
                      this.cn = true
                      //router.navigate(['/examinfo'])              
                    }
                  })
                }
              })
              this.loginS.user.subscribe(r => {
                if(r){
                  this.email = r.email
                }
              })
            }
          })
        }
      })
  }

  ngOnInit(): void {
  }

  logout(){
    this.loginS.logout()
  }

  logcf(){
    this.logc = true
  }

  movedata(){
    this.loginS.movedata()    
  }

  updateprofile(){
    let colid = prompt("رمز الكلية")
    if(colid){
      this.auth.currentUser.then(user => {
        user.updateProfile({
          photoURL: colid
        })
      })
    }
  }

  dprts(){
    let coid = prompt("ادخل رمز الكلية")
    this.afs.collection("academics", ref => ref.where("ref", "==", coid)).snapshotChanges().subscribe(docs => {
      docs.forEach(doc => {
        console.log(doc.payload.doc.id);
        
      })
    })    
  }

}
