import { Component, OnInit } from '@angular/core';
/* import * as firebase from 'firebase'; */
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from 'shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(/* private afAuth:AngularFireAuth */
  private auth:AuthService) { 

  }


  login(){
   // this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    //later we will refactor this as dependency injection
    //moved to Authservice
    this.auth.login();
  }
  
}
