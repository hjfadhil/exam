import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ExamtypesService {

  $examtypes: AngularFirestoreCollection

  constructor(private afs: AngularFirestore) { 

  }

  getExamTypes(){
    this.$examtypes = this.afs.collection("examtypes")
    return this.$examtypes.snapshotChanges()
  }
}
