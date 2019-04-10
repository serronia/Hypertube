import { Component, OnInit, Input} from '@angular/core';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @Input() contenu: string;
    public lastUpdate = new Date();

  
    films = [
      {
        name: 'spiderman',
        year: '2018',
        duree : 200,
        affiche: 'https://media3.woopic.com/api/v1/images/174%2Fcinemovies%2F681%2F951%2F724238a04dea7593ff2d91339a%2Fmovies-56136-1.jpg?format=822x700&quality=85'
      },
      {
        name: 'superman',
        year: '2006',
        duree : 180,
        affiche: 'http://fr.web.img4.acsta.net/r_1280_720/medias/nmedia/18/35/78/09/18647167.jpg'
      },
      {
        name: 'avatar',
        year: '2009',
        duree : 220,
        affiche: 'http://images.affiches-et-posters.com//albums/3/47831/affiche-film-avatar.jpg'
      },
      {
        name: 'Thor',
        year: '2011',
        duree : 120,
        affiche: 'https://4.bp.blogspot.com/--urFZkc6wIA/TbDPcWVkmvI/AAAAAAAAANM/oA1cLH1TSj4/s1600/Thor+NewFIlm+Poster.jpg'
      },
      {
        name: 'Avengers: Infinity War',
        year: '2011',
        duree : 180,
        affiche: 'https://i.pinimg.com/originals/05/eb/07/05eb078a2f269eff744cbc5a2f23985c.jpg'
      },
      {
        name: 'Captain America: First Avenger',
        year: '2009',
        duree : 124,
        affiche: 'http://fr.web.img4.acsta.net/medias/nmedia/18/84/69/36/19774937.jpg'
      },
      {
        name: 'Wonder Woman',
        year: '2017',
        duree : 141,
        affiche: 'http://fr.web.img2.acsta.net/pictures/17/05/09/17/15/350974.jpg'
      }
    ];
    constructor() {
    setInterval(() => { this.lastUpdate = new Date();}, 1);
    }

    ngOnInit() {
    }
}
