import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer,  SafeHtml,  SafeUrl,  SafeStyle} from '@angular/platform-browser';
import { FilmService } from '../_services';

@Component({
  templateUrl: './page-film.component.html',
  styleUrls: ['./page-film.component.scss']
})
export class PageFilmComponent implements OnInit {
  @Input() id: number;
  title: string;
  affiche: SafeUrl;
  year : number;
  duration: number;
  genre = new Array();
  langue: string;
  description: string;
  background: SafeStyle;
  note: number;
  cast = new Array();



  constructor(private filmService : FilmService, private route: ActivatedRoute,private sanitization:DomSanitizer) {
   } 

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.filmService.getDetailFilm(this.id)
      .subscribe(
      data => 
      {
          console.log(data);
          this.title = data.name;
          this.affiche = this.sanitization.bypassSecurityTrustUrl(data.affiche);
          this.year  = data.year;
          this.duration = data.duree;
          this.genre = data.genres;
          this.langue = data.langue;
          this.description = data.description;
          this.background = this.sanitization.bypassSecurityTrustStyle(`url(${data.background_image})`);
          this.note = data.rating;
          this.cast = data.cast;

      },
      error => {
          console.log("get film error = ", error);
      });
  }

}
