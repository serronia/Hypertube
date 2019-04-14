import { Component, OnInit, Input} from '@angular/core';
import { FilmService, HyperMovies } from '../_services';
import { debounceTime, distinctUntilChanged, switchMap, flatMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss']
})
export class HomeComponent{
@Input() contenu: string;
  films = new Array();
  i = 0;
  k=2;
  p=1;
  recherche = false;
  
  movies$: Observable<HyperMovies[]>;
  private SearchedMovies= new Subject<string>();
      
  search(research: string)
  {
    this.SearchedMovies.next(research);
    console.log("research = ", research);
    if (research != "")
    {
      this.recherche =true;
      this.films = new Array();
      this.i=0;
    }
    else
    {
      this.movies$ = new Observable<HyperMovies[]>();
      this.recherche =false;
      this.k = 2;
      this.filmService.getFilm(1)
      .subscribe(
      data =>
      {
          for(let da in data)
          {
            this.films[this.i] = data[this.i];
            this.i = this.i+1;
          }       
      },
      error => {
          console.log("get film error = ", error);
      });
    }
  }
  

  constructor(private filmService : FilmService) {
  }
  
  ngOnInit() {
      this.SearchedMovies.next('');
      this.movies$ = this.SearchedMovies.pipe(
        debounceTime(0),
        distinctUntilChanged(),
        switchMap(research =>
          this.filmService.Research(research, this.p))
      );
      this.filmService.getFilm(1)
      .subscribe(
      data =>
      {
          for(let da in data)
          {
            this.films[this.i] = data[this.i];
            this.i = this.i+1;
          }       
      },
      error => {
          console.log("get film error = ", error);
      });
}

  onScroll() {
    console.log("this.recherche = ", this.recherche);
    console.log('scrolled!!');
    if (!this.recherche)
    {
      console.log("--------- k = ",this.k)
      this.filmService.getFilm(this.k)
      .subscribe(
        data =>
        {
          var d=0;
          for(let da in data)
          {
            this.films[this.i] = data[d];
            this.i = this.i+1;
            d++;
          }   
        },
        error => {
          console.log("get film error = ", error);
      });
      console.log("this.films = ", this.films)
      this.k++;
    }
    /*else
    {
      this.p++;
    }*/
  }
}


