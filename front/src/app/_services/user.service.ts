import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    register(username: string, firstname: string, lastname: string,password: string, password2: string, mail: string) {
       
        return this.http.post<any>(`http://localhost:8080/user/create`, { username, firstname, lastname, password, password2, mail })
            .pipe(map(res => {
                console.log("res = ", res);
            }));
    }
}
