import { Component, OnInit, Input} from '@angular/core';
import { FilmService } from '../_services';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @Input() contenu: string;
    public lastUpdate = new Date();
    films = [];
    i =0;
    
    constructor(private filmService : FilmService,) {
    setInterval(() => { this.lastUpdate = new Date();}, 1);
    }
    ngOnInit() {
      this.filmService.getFilm()
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
