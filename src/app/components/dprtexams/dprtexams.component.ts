import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dprtexams',
  templateUrl: './dprtexams.component.html',
  styleUrls: ['./dprtexams.component.css']
})
export class DprtexamsComponent implements OnInit {

  selcollegeid
  college
  departments = []
  exams = []
  dexams = []

  constructor(private masterS: MasterService,
              private router: Router,
    ) { 
    this.selcollegeid = masterS.selcollege
    this.college = masterS.mohserM.colleges[this.selcollegeid]
    this.departments = this.college.dprts
    this.exams = this.college.exams
    this.departments.forEach(d => {
      this.dexams[d.id] = this.exams.filter(e => e.dprtid == d.id)
    })
    
  }

  ngOnInit(): void {
  }

  dprtexams(dprt){
    this.masterS.seldprtid = dprt.id
    this.masterS.seldprt = dprt
    this.router.navigate(['/dprtdtails'])    
  }

  back(){
    this.router.navigate(['/master'])
  }

}
