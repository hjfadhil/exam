import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AcademicyearsService } from 'src/app/services/academicyears.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  colleges = []
  curdate: FormControl = new FormControl(null)
  academicyears = []
  selayr
  sh1 = false
  cy
  selex
  exs
  examay
  examname

  constructor(private masterS: MasterService,
              private router: Router,
              private ayS: AcademicyearsService,
              private afs: AngularFirestore,
    ) { 
      ayS.academicyears.subscribe(r => {
        this.academicyears = []
        r.forEach(ay => {
          if(ay.id){
            this.sh1 = true
            this.academicyears.push(ay)
            this.selayr = ay.ay
          }
        })
      })
      this.afs.collection("examacademicyears").valueChanges().subscribe(r => {
        this.academicyears = r
      })
        let cd = new Date();
        let mm = cd.getMonth()+1;
        let m = "" + mm
        m.length == 1? m="0"+m : m=m;
        let d = "" + cd.getDate()
        d.length == 1? d="0"+d : d=d;
        let nd = cd.getFullYear() + "-" + m + "-" + d
        this.curdate.setValue(nd); 
    for (const key in this.masterS.mohserM.colleges) {
      if (this.masterS.mohserM.colleges.hasOwnProperty(key)) {
        const college = this.masterS.mohserM.colleges[key];
        this.colleges.push(college)
      }
    }
    this.masterS.examo$.subscribe(r => {
      this.examay = r.ay
      this.examname = r.exam.name
    })
  }

  ngOnInit(): void {
  }

  dprtexams(college){
    this.masterS.selcollege = college.id
    this.router.navigate(['/dprtexams'])
  }

  back(){
    this.router.navigate([''])
  }

  seldate(){
    this.masterS.getexams(this.curdate.value)
    
  }
  selay(){
    console.log(this.selayr);
    
    this.masterS.selay(this.selayr).subscribe(r => {
      this.exs = r
    })
  }
  selexf(){
    console.log(this.selex);
    if(this.selayr, this.selex){
      this.masterS.getexams2(this.selayr, this.selex, this.curdate.value)
    }
  }

}
