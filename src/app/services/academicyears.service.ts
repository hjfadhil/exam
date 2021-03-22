import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcademicyearsService {

  academicyears: Subject<any> = new Subject<any>()
  academicyears2 = []
  selacademicyearid

  constructor(
              private afs: AngularFirestore,
    ) { 
      this.afs.collection("examacademicyears").valueChanges().subscribe(r => {
        this.academicyears.next(r)
        this.academicyears2 = r
      })
  }
  getacademicyears(){
    return this.academicyears
  }
}
