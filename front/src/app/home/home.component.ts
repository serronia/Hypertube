import { Component, OnInit, Input} from '@angular/core';
import { FilmService, HyperMovies } from '../_services';
import { debounceTime, distinctUntilChanged, switchMap, flatMap, delay, mergeMap, concatMap } from 'rxjs/operators';
import { Observable, Subject, merge, concat } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { async } from 'q';

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
  key_word = "";
  triForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  tri ="";
  genre="";

  movies$: Observable<HyperMovies[]>;
  movies2$: Observable<HyperMovies[]>;
  movies3$: Observable<HyperMovies[]>;
  
  search(research: string)
  {
    console.log("research = ", research);
    this.key_word = research;
    this.recherche =true;
    this.films = new Array();
    this.i=0;

    if (research != "")
    {
      console.log(" ----------- on recherche ------- ")
      if(this.p!=1)
      {
        console.log(" ----------- p != 1 ==> ------- ", this.p);
        // this.movies2$ = this.movies$;
        // console.log(" ----------- this.movies2$ ------- ", this.movies2$);
        // this.movies$ = this.movies2$.pipe(concat(
        //     this.filmService.Research(research, this.p, this.tri, this.genre)
        // ));
        //this.movies$ = concat(this.movies2$, this.filmService.Research(research, this.p, this.tri, this.genre))
        this.movies$ = merge(this.movies$, this.filmService.Research(research, this.p, this.tri, this.genre));
      }
      else
      {
        console.log(" ----------- p == 1 ==> ------- ", this.p);
        this.movies$ = this.filmService.Research(research, this.p, this.tri, this.genre);
      }
    }
    else
    {
      console.log(" ----------- on ne recherche pas------- ")
      this.movies$ = this.filmService.Research(research, this.p, this.tri, this.genre);
      this.recherche =false;
      this.p=1;
      console.log("films.length = ", this.films.length);

      if (!this.films.length)
      {
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
  }
  

  constructor(private filmService : FilmService,private formBuilder: FormBuilder) {
  }
  
  ngOnInit() {
    console.log(" ----------- Dans nginit------- ")
    this.triForm = this.formBuilder.group({
      tri: ['', Validators],
      filtre: ['', Validators]      
    });
    console.log("avant on init films =", this.films);   
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
    console.log("apres oninit films =", this.films);
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
    else
    { 
      this.p++;
      this.search(this.key_word); 
    }
  }

  get f() { return this.triForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.triForm.invalid) {
      console.log("snif");
        return;
    }

    console.log("filtre =", this.f.filtre.value);
    this.tri = this.f.tri.value;
    this.genre = this.f.filtre.value;
    this.search(this.key_word);
  }
}

