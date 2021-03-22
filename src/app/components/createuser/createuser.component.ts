import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  em = ""
  pw = "123123"
  id = ""

  constructor(private auth: AngularFireAuth) { 

  }

  ngOnInit(): void {
  }

  createuser(){
    if(this.em != "" && this.pw != "" && this.id != "")
    console.log(this.em, this.pw);
    this.auth.createUserWithEmailAndPassword(this.em, this.pw).then(user => {      
      user.user.updateProfile({
        displayName: this.id,
      }).then(() => {
        document.location.reload()
      })
    }).catch(err => {
      alert(err.message)
    })
  }

}
