import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { DomSanitizer,  SafeHtml,  SafeUrl,  SafeStyle} from '@angular/platform-browser';

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
  //public image:SafeStyle = this.affiche;

  constructor(private sanitization:DomSanitizer) {
    this.affiche = this.sanitization.bypassSecurityTrustStyle(`url(${this.affiche})`);
  }

  ngOnInit() {
    this.affiche = this.sanitization.bypassSecurityTrustStyle(`url(${this.affiche})`);
  }
}