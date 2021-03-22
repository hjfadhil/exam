import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExaminfoService {

  selexam
  department

  constructor(
    ) {
     
   }
}
