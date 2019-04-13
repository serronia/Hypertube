import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FilmService {
    constructor(private http: HttpClient) { }

    getFilm(k :number) {
        return this.http.get('http://localhost:8080/api/'+k);
    }
    getDetailFilm(id: number) {
        return this.http.get('http://localhost:8080/api_by_id/'+id);
    }

    addCom(id_film: number, id_user: string, com: string) {
       
        return this.http.post<any>(`http://localhost:8080/film/create`, { id_film, id_user, com})
            .pipe(map(res => {
                return (res);
            }));
    }
    getComs(id : number)
    {
        return this.http.get<any>('http://localhost:8080/film/getComs/'+id, {})
        .pipe(map(res => {
            return res;
        }));
    }
}