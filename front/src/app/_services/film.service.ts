import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FilmService {
    constructor(private http: HttpClient) { }

    getFilm(k :number) {
        return this.http.get('http://localhost:8080/api/'+k);
    }
    getDetailFilm(id: number) {
        console.log("dans get detail film")
        return this.http.get('http://localhost:8080/api_by_id/'+id);
    }
}