import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  @Input() title: string;
  @Input() year : number;
  @Input() duration: number;


  constructor() { }

  ngOnInit() {
  }

}
