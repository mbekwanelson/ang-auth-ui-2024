import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserApiRequest } from '../models/userRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authapibaseurl : string = environment.authapiurl;

  constructor(private _httpClient : HttpClient)
  {

  }

  onLogin(loginObj: UserApiRequest)
  {

    return this._httpClient.post<any>(`${this.authapibaseurl}authenticate`,loginObj);
  }

  onRegister(signupObj: UserApiRequest)
  {
    return this._httpClient.post<any>(`${this.authapibaseurl}register`,signupObj);
  }


}
