import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FunctionsModule } from 'src/app/models/functions/functions.module';

@Component({
  selector: 'app-dprtdtails',
  templateUrl: './dprtdtails.component.html',
  styleUrls: ['./dprtdtails.component.css']
})
export class DprtdtailsComponent implements OnInit {

  seldprt
  selcol
  exams
  oexams
  curdate: FormControl = new FormControl(null);
  dprtid
  examname
  examay

  constructor(private masterS: MasterService,
              private afs: AngularFirestore,
              private router: Router,
              private functions: FunctionsModule,
    ) { 
        this.dprtid = this.masterS.seldprtid
        let cd = new Date();
        let mm = cd.getMonth()+1;
        let m = "" + mm
        m.length == 1? m="0"+m : m=m;
        let d = "" + cd.getDate()
        d.length == 1? d="0"+d : d=d;
        let nd = cd.getFullYear() + "-" + m + "-" + d
        this.curdate.setValue(nd); 
        this.seldprt = masterS.seldprt
        this.selcol = masterS.mohserM.colleges[this.masterS.selcollege]
        this.exams = this.selcol.exams.filter(e => e.dprtid == this.dprtid)
        this.exams.map(e => {
          e.status = this.functions.examtimestatus(e.date, e.time, e.long)
          let links = []
          e.meeting = e.meeting.replace(/\s/g, "")
          let separator = e.meeting.indexOf(',')
          if(separator > -1){
            links = e.meeting.split(',')
          }else{
            separator = e.meeting.indexOf(';')
            if(separator){
              links = e.meeting.split(';')
            }
          }
          e.links = links
        })
        this.examay = this.masterS.examay
        this.examname = this.masterS.examname
  }

  ngOnInit(): void {
  }

  gomeet(meeting){
    window.open(meeting, '_blank')
  }

  back(){
    this.router.navigate(['/dprtexams'])
  }
 
}
