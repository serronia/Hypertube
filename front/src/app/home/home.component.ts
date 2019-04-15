import { Component, OnInit, Input} from '@angular/core';
import { FilmService, HyperMovies } from '../_services';
import { debounceTime, distinctUntilChanged, switchMap, flatMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  movies$: Observable<HyperMovies[]>;
  private SearchedMovies= new Subject<string>();
      
  search(research: string)
  {
    console.log(" debut de search research=", research);
    console.log(" debut de search films =", this.films);
    this.SearchedMovies.next(research);
    console.log("research = ", research);
    if (research != "")
    {
      this.key_word = research;
      this.recherche =true;
      this.films = new Array();
      this.i=0;
    }
    else
    {
      this.SearchedMovies.next('');
      this.movies$ = this.SearchedMovies.pipe(
        debounceTime(0),
        //distinctUntilChanged(),
        switchMap(research =>
          this.filmService.Research(research, this.p, this.tri))
      );
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
    console.log(" fin de search research=", research);
    console.log(" fin de search films =", this.films);
  }
  

  constructor(private filmService : FilmService,private formBuilder: FormBuilder) {
    console.log(" dans le constructeur films =", this.films);
  }
  
  ngOnInit() {
    this.triForm = this.formBuilder.group({
      tri: ['', Validators]
    });
    console.log("avant on init films =", this.films);
      this.SearchedMovies.next('');
      this.movies$ = this.SearchedMovies.pipe(
        debounceTime(0),
        //distinctUntilChanged(),
        switchMap(research =>
          this.filmService.Research(research, this.p, this.tri))
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
    /*else
    {
      this.search(this.key_word);
      this.p++;
    }*/
  }

  get f() { return this.triForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.triForm.invalid) {
      console.log("snif");
        return;
    }

    console.log("tri =", this.f.tri.value);
    this.tri = this.f.tri.value;
    this.search(this.key_word);
  }
}

