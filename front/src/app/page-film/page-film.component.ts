import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer,  SafeHtml,  SafeUrl,  SafeStyle} from '@angular/platform-browser';

@Component({
  templateUrl: './page-film.component.html',
  styleUrls: ['./page-film.component.scss']
})
export class PageFilmComponent implements OnInit {
  @Input() title: string;
  @Input() affiche: SafeStyle;
  @Input() year : number;
  @Input() duration: number;
  constructor(private route: ActivatedRoute) { } 

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get("name")

  }

}
