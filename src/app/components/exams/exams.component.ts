import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from 'src/app/services/login.service';
import { AcademicyearsService } from 'src/app/services/academicyears.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  activeexam
  exams

  constructor(private afs: AngularFirestore,
              private loginS: LoginService,
              private academicyearsS: AcademicyearsService,
              private router: Router,
    ) { 
      console.log(this.academicyearsS.selacademicyearid);
      
    this.afs.collection("examacademicyears").doc(academicyearsS.selacademicyearid).collection("exams").valueChanges().subscribe(r => {
      console.log(r);
      this.exams = r
    })
  }

  ngOnInit(): void {
  }

  examf(id){
    this.afs.collection("academics").doc(this.loginS.dprtid).update({examid: id})
    this.router.navigate(['/examinfo'])
    console.log(id);
    
  }

}
