import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  email = '';
  password = '';
  
  login() {
    if (this.email === 'maciek@op.pl') {
      if (this.password === 'maciek12345') {
        localStorage.setItem('zalogowany', 'true');
        window.location.href = '/home';
      }
    }
}
}
