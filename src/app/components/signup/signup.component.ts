import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import validateForm from 'src/app/helpers/validateFormFields';
import { UserApiRequest } from 'src/app/models/userRequest';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  toggledPasswordtype : string = "password"
  isText: boolean = false
  passwordVisibilityIcon : string = "fa-eye-slash"
  signUpForm! : FormGroup

  constructor(private _formbuilder : FormBuilder,
              private _authsvc : AuthService,
               private router: Router)
  {
    this.signUpForm = this._formbuilder.group({

      username : ['',Validators.required],
      name : ['',Validators.required],
      surname : ['',Validators.required],
      email : ['',Validators.required],
      password : ['',Validators.required]

    })
  }

  ngOnInit(): void
  {

  }


  togglePasswordVisibility()
  {
    this.isText = !this.isText;
    this.isText ? this.passwordVisibilityIcon = "fa-eye" : this.passwordVisibilityIcon = "fa-eye-slash";
    this.isText ? this.toggledPasswordtype = "text" : this.toggledPasswordtype = "password";

  }

  onRegister(){

    if(this.signUpForm.valid)
    {

      let usrapiRequestbody = new UserApiRequest(
        {
          Id : 0,
          firstname : this.signUpForm.get("name")?.value,
          lastname : this.signUpForm.get("surname")?.value,
          username : this.signUpForm.get("username")?.value,
          token : this.signUpForm.get("name")?.value,
          email : this.signUpForm.get("email")?.value,
          Role  : this.signUpForm.get("name")?.value,
          password : this.signUpForm.get("password")?.value
      });

      console.log("Sign Up Form Is Valid : user ApI Request Looks Like",usrapiRequestbody);

      this._authsvc.onRegister(usrapiRequestbody)
      .subscribe({
        next: (res)=>{
          console.log("response on subscribe sign up next",res)
          if(res.success)
          {
            this.signUpForm.reset();
            this.router.navigate(['login']);
          }

        },
        error: (err)=>{
          console.log("error on subscribe sign up error",err)
        }
      })

    }else{
      validateForm.validateFormFields(this.signUpForm);
    }

  }


}
