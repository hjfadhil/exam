import { Component, OnInit } from '@angular/core';
import { AcademicyearsService } from 'src/app/services/academicyears.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-academicyears',
  templateUrl: './academicyears.component.html',
  styleUrls: ['./academicyears.component.css']
})
export class AcademicyearsComponent implements OnInit {
  
  academicyears = []
  activeyear

  constructor(private academicyearsS: AcademicyearsService,
              private afs: AngularFirestore,
              private loginS: LoginService,
              private router: Router,
    ) { 
      this.activeyear = loginS.department.examay
      this.academicyears = []
      // academicyearsS.academicyears.subscribe(r => {
      //   r.forEach(ay => {
      //     if(ay.id == "2020-2019" || ay.id == "2021-2020"){
      //       this.academicyears.push(ay)
      //       academicyearsS.academicyears.unsubscribe()
      //     }
      //   })
      // })
      this.afs.collection("examacademicyears").valueChanges().subscribe(r => {
        this.academicyears = r
        //this.academicyears2 = r
      })

  }

  ngOnInit(): void {
  }

  setay(ay){
    this.academicyearsS.selacademicyearid = ay.id
    this.afs.collection("academics").doc(this.loginS.dprtid).update({examay: ay.id}).then(() => {
      this.router.navigate(['/exams'])
    })
  }

}
