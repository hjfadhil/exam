import { Component, OnInit } from '@angular/core';
import * as fb from 'firebase';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  db = fb.firestore();
  exams = 0

  constructor() { 
    this.db.collection('examacademicyears').doc('2020-2019').collection('exams').doc('LdKzUQEKYKZVqL0KPFfm')
    .collection('departments').onSnapshot(drpts => {
      drpts.forEach(dprt => {
        console.log(dprt.id);
        dprt.ref.collection('dprtexams').get().then(docs => {
          console.log(docs.docs.length,);
          this.exams = this.exams + docs.docs.length
          console.log(this.exams);
        })
      })
      
    })
  }

  ngOnInit(): void {
  }

}
