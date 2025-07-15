/*import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:9090';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public register(registerData){
    return this.httpclient.post(this.PATH_OF_API+'/registerNewUser',registerData);
  }
  public login(loginData) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
*/
/*import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:9090';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  // 🔹 Helper function to get Authorization Headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.userAuthService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public register(registerData) {
    return this.httpclient.post(this.PATH_OF_API + '/registerNewUser', registerData);
  }

  public login(loginData) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    }).subscribe((response: any) => {
      this.userAuthService.setToken(response.token); // 🔹 Store token after login
      this.userAuthService.setRoles(response.roles);
    });
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      headers: this.getAuthHeaders(),  // 🔹 Secured with JWT
      responseType: 'text',
    });
  }

  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      headers: this.getAuthHeaders(),  // 🔹 Secured with JWT
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles) {
      allowedRoles.forEach((allowedRole) => {
        if (userRoles.some(userRole => userRole.roleName === allowedRole)) {
          isMatch = true;
        }
      });
    }
    return isMatch;
  }
}*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:9090';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  // 🔹 Helper function to get Authorization Headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.userAuthService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public register(registerData): Observable<any> {
    return this.httpclient.post(this.PATH_OF_API + '/registerNewUser', registerData);
  }
    /*
    public register(registerData: any): Observable<any> {
      return this.httpclient.post(`${this.PATH_OF_API}/registerNewUser`, registerData, {
        headers: new HttpHeaders({ 'No-Auth': 'True' })  // Ensure backend does not expect authentication
      });
    }*/
    

  public login(loginData): Observable<any> {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser(): Observable<string> {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      headers: this.getAuthHeaders(),
      responseType: 'text',
    });
  }

  public forAdmin(): Observable<string> {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      headers: this.getAuthHeaders(),
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles) {
      allowedRoles.forEach((allowedRole) => {
        if (userRoles.some(userRole => userRole.roleName === allowedRole)) {
          isMatch = true;
        }
      });
    }
    return isMatch;
  }
}
