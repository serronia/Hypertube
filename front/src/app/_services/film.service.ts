import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FilmService {
    constructor(private http: HttpClient) { }

    getFilm() {
        return this.http.get('http://localhost:8080/api');
    }
}