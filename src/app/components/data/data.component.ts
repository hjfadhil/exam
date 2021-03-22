import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(
    private afs: AngularFirestore,
  ) { 

  }

  ngOnInit(): void {
  }

  colleges(){
    let ca = []
    this.afs.collection("academics", ref => ref.where("ref", "==", "JN0Pn7NcEpXjMnONDuUV").where("level", "==", "Kv4o8Vyw74ZyBPZiP6dI")).snapshotChanges().subscribe(sns => {
      sns.forEach(sn => {
        let doc = sn.payload.doc.data()
        ca.push(doc)
      })
      let jc = JSON.stringify(ca)
      let bc = new Blob([jc], {type: 'application/json, charset=utf-8'})
      saveAs(bc, "college")
      console.log(jc);
    })
  }

  departments(){
    let dprts = []
    this.afs.collection("academics", ref => ref.where("ref", "==", "vtZJ14uNvaQtOzkqNpht").where("level", "==", "MAOyd2uWobjkU52gQMjc")).snapshotChanges().subscribe(sns => {
      sns.forEach(sn => {
        let doc = sn.payload.doc.data()
        dprts.push(doc)
      })
      console.log(dprts);
      let jc = JSON.stringify(dprts)
      let bc = new Blob([jc], {type: 'application/json, charset=utf-8'})
      saveAs(bc, "artdepartments")
    })
  }

  empdegrees(){
    let empdegrees = []
    this.afs.collection("empdeg").snapshotChanges().subscribe(sns => {
      sns.forEach(sn => {
        let doc = sn.payload.doc.data()
        empdegrees.push(doc)
      })
      console.log(empdegrees);
      let jc = JSON.stringify(empdegrees)
      let bc = new Blob([jc], {type: 'application/json, charset=utf-8'})
      saveAs(bc, "empdegrees")
    })
  }
  empstages(){
    let empstages = []
    this.afs.collection("empstage").snapshotChanges().subscribe(sns => {
      sns.forEach(sn => {
        let doc = sn.payload.doc.data()
        empstages.push(doc)
      })
      console.log(empstages);
      let jc = JSON.stringify(empstages)
      let bc = new Blob([jc], {type: 'application/json, charset=utf-8'})
      saveAs(bc, "empstages")
    })
  }

}
