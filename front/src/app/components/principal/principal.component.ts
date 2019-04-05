import { Component, Input, OnInit } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  @Input() contenu: string;
  
  film = [
    {
      name: 'spiderman',
      year: '2018',
      duree : 200
    },
    {
      name: 'superman',
      year: '2016',
      duree : 180
    },
    {
      name: 'avatar',
      year: '2009',
      duree : 220
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
