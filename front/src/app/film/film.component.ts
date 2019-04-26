import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { DomSanitizer,  SafeHtml,  SafeUrl,  SafeStyle} from '@angular/platform-browser';
import { FilmService  } from '../_services';

@Component({
            selector: 'app-film',
            templateUrl: './film.component.html',
            styleUrls: ['./film.component.scss']
         })
export class FilmComponent implements OnInit {
  @Input() title: string;
  @Input() affiche: SafeStyle;
  @Input() year : number;
  @Input() duration: number;
  @Input() note: number;
  @Input() resume: string;
  @Input() id: number;
  viewed : boolean;
  //public image:SafeStyle = this.affiche;

  constructor(private sanitization:DomSanitizer,
              private filmService: FilmService) {
    this.affiche = this.sanitization.bypassSecurityTrustStyle(`url(${this.affiche})`);
  }

  ngOnInit() {
    this.affiche = this.sanitization.bypassSecurityTrustStyle(`url(${this.affiche})`);
    var user = JSON.parse(localStorage.getItem("currentUser"));

    this.filmService.getViewed(this.id, user.id)
    .subscribe(
      data => {
        var data2 = JSON.parse(JSON.stringify(data));
        if(data2.viewed)
        {
          this.viewed = true;
        }
        else
        {
          this.viewed = false;
        }
      },
      error => {
        console.log("get viewed error = ", error);
        this.viewed = false;
    });
  }
}