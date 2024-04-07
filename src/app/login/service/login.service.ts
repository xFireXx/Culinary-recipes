import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn = false;
  constructor(public firebaseAuth : AngularFireAuth, private router: Router) { }

  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res=> {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
      this.router.navigate(['/home']);
    });
    
  }catch (error: any) {
    // Tutaj możesz obsłużyć błąd
    console.error('Błąd logowania:', error);

  }

  logout() {
    this.firebaseAuth.signOut()
    localStorage.removeItem('user');
  }
}
