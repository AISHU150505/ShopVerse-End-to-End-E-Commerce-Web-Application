/*import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private userService:UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  register(registerForm:NgForm){
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
     (response)=>{
      console.log(response);
     },
      (error)=>{
        console.log(error);
      }
    );
  }

}*/

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(registerForm: NgForm) {
    if (registerForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    console.log('Registering user:', registerForm.value);
    
    this.userService.register(registerForm.value).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        alert('Registration successful! Redirecting to login...');
        this.router.navigate(['/login']); // Redirect to login page
      },
      (error) => {
        console.error('Registration failed:', error);
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    );
  }

}
