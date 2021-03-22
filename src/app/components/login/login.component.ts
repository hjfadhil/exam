import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  em = new FormControl('')
  pw = new FormControl('')

  constructor(private loginS: LoginService,
              private router: Router,
              private auth: AngularFireAuth,
    ) { 
      
  }

  ngOnInit(): void {
  }

  login(){
    let em = this.em.value
    let pw = this.pw.value
    if(em && pw){
      this.loginS.login(em ,pw).then(() => {
        this.router.navigate(['/home'])
      })
      .catch(err => {
        alert(err.message)
      })
    }else{
      alert("اكمل ادخال المعلومات")
    }
    
  }

  cancel(){
    this.router.navigate([''])
  }

}
