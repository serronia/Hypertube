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
          var data2 = JSON.parse(JSON.stringify(data));
          this.title = data2.name;
          this.affiche = this.sanitization.bypassSecurityTrustUrl(data2.affiche);
          this.year  = data2.year;
          this.duration = data2.duree;
          this.genre = data2.genres;
          this.langue = data2.langue;
          this.description = data2.description;
          this.background = this.sanitization.bypassSecurityTrustStyle(`url(${data2.background_image})`);
          this.note = data2.rating;
          this.cast = data2.cast;

      },
      error => {
          console.log("get film error = ", error);
      });
  }

}
