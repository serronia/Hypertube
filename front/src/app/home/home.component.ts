import { Component, OnInit, Input} from '@angular/core';
import { FilmService } from '../_services';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @Input() contenu: string;
    public lastUpdate = new Date();
    films = new Array();
    i =0;
    k=2;
  
    onScroll() {
      console.log('scrolled!!');
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
      this.k++;
    }

    constructor(private filmService : FilmService,) {
    setInterval(() => { this.lastUpdate = new Date();}, 1);
    }
    ngOnInit() {
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
