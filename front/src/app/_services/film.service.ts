import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

export interface HyperMovies
{
    name: string;
    year: string;
    duree: string;
    affiche: string;
    synopsis: string;
    rating: string;
    id: string;
}

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

    Research(search: string, nb: number)
    {
        console.log("searching: " + search + " page: " + nb);
        if (search != "")
        {
            const Param = new HttpParams().set("search", search).set("page", nb.toString());
            return this.http.get('http://localhost:8080/research', {params: Param}).pipe(
                map((data: any) => {
                //console.log(data);
                if (data.data.movie_count)
                {
                    return data.data.movies.map(entry => ({
                        name: entry.title,
                        year: entry.year,
                        duree: entry.runtime,
                        affiche: entry.large_cover_image,
                        synopsis: entry.synopsis.substr(0, 199) + "...",
                        rating: entry.rating,
                        id: entry.id
                        } as HyperMovies)
                    );
                }
                }),
            );
        }
        else
        {
            return (new Array());
        }

    }
}