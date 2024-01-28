import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
  signUpForm! : UntypedFormGroup

  constructor(private _formbuilder : UntypedFormBuilder,
              private _authsvc : AuthService,
               private router: Router,
               private toast: NgToastService)
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
          if(res.success)
          {
            this.signUpForm.reset();
            this.toast.success({detail: "Success!", summary : res.message,duration : 5000 })
            this.router.navigate(['login']);
          }else
          {
            this.toast.error({detail: "Error!", summary : res.message,duration : 5000 });
          }

        },
        error: (err)=>{
          this.toast.error({detail: "Error!", summary : err.error.message,duration : 5000 });
        }
      })

    }else{
      validateForm.validateFormFields(this.signUpForm);
    }

  }


}
