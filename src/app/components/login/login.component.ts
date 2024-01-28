import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import validateForm from 'src/app/helpers/validateFormFields';
import { UserApiRequest } from 'src/app/models/userRequest';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  toggledPasswordtype : string = "password"
  isText: boolean = false
  passwordVisibilityIcon : string = "fa-eye-slash"
  loginForm! : UntypedFormGroup;


  constructor(private _fb: UntypedFormBuilder,
        private _authSvc : AuthService,
        private router : Router,
        private toast: NgToastService)
  {

  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({

        username : ['', Validators.required],
        password : ['', Validators.required]
    })
  }

  togglePasswordVisibility()
  {
    this.isText = !this.isText;
    this.isText ? this.passwordVisibilityIcon = "fa-eye" : this.passwordVisibilityIcon = "fa-eye-slash";
    this.isText ? this.toggledPasswordtype = "text" : this.toggledPasswordtype = "password";

  }

  onLogin()
  {
    if(this.loginForm.valid){

      console.log(this.loginForm.value);

      let usrapiRequestbody = new UserApiRequest(
        {
          username : this.loginForm.get("username")?.value,
          token : this.loginForm.get("password")?.value,
          password : this.loginForm.get("password")?.value
      });

      this._authSvc.onLogin(usrapiRequestbody)
      .subscribe({
        next: (res)=>{
          console.log("response on subscribe login next",res);
          if(res.success)
          {
            this.loginForm.reset();
            this.toast.success({detail: "Success!", summary : res.message,duration : 5000 })
            this.router.navigate(['dashboard']);
          }else
          {
            this.toast.error({detail: "Error!", summary : res.message,duration : 5000 });

          }


        },
        error: (err)=>{
          console.log("error on subscribe login error",err)
          this.toast.error({detail: "Error!", summary : err.error.message,duration : 5000 })

        }
      })
      // commit object
    }else{

      // throw error using toaster
      console.log("Form is invalid")
      validateForm.validateFormFields(this.loginForm);
    }
  }



}
