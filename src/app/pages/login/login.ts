import { HttpClient } from '@angular/common/http';
import { AuthService } from '@/app/features/auth/services/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl,  FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private router = inject(Router)
  private authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required]
    }),
  });

  onSubmit() {
    const data = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      type: 'password',
    };

    // TODO: Use EventEmitter with form value
    console.log(this.loginForm);

    this.authService.signIn(data).subscribe({
      next: (value) => {
        console.log('Login successful:', value);
        this.router.navigate(['/deals']);
      },
      error: (err) => {
        console.log('Login error:', err);
      }
    });

    // this.http.post<any>('https://p9sh9pc1-9002.asse.devtunnels.ms/auth/sign-in', data).subscribe({
    //   next: (value) => {
    //     console.log('Login successful:', value);
    //     // Store tokens for persistence
    //     // this.authService.setTokens({
    //     //   accessToken: value.accessToken,
    //     //   refreshToken: value.refreshToken
    //     // });
    //   },
    //   complete: () => {
    //     // this.router.navigate(['/property/list']);
    //   },
    //   error: (err) => {
    //     console.log('Login error:', err);
    //   }
    // });
  }
}
