import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer,  SafeHtml,  SafeUrl,  SafeStyle} from '@angular/platform-browser';
import { FilmService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './page-film.component.html',
  styleUrls: ['./page-film.component.scss']
})
export class PageFilmComponent implements OnInit {
  @Input() id: number;
  PostCom: FormGroup;
  title: string;
  affiche: SafeUrl;
  year : number;
  duration: number;
  genre = new Array();
  langue: string;
  description: string;
  background: SafeUrl;
  note: number;
  cast = new Array();
  submitted = false;
  loading = false;
  error = '';
  coms = new Array();
  i = 0;
  src_video: SafeUrl;
  src_subtitles: SafeUrl ;

  constructor(private filmService : FilmService, 
              private route: ActivatedRoute,
              private sanitization:DomSanitizer,
             // private subtitlesService: SubtitlesService,
              private formBuilder: FormBuilder) {
   } 

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));

    this.PostCom = this.formBuilder.group({
      com: ['', Validators.required]
    });

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
          this.background = this.sanitization.bypassSecurityTrustUrl(data2.background_image);
          this.note = data2.rating;
          this.cast = data2.cast;

      },
      error => {
          console.log("get film error = ", error);
      });

      this.filmService.getComs(this.id)
      .subscribe(
      res => 
      {
        this.i =0;
          for(let da in res.com)
          {
            this.coms[this.i] = res.com[this.i];
            this.i = this.i+1;
          }      
      },
      error => {
          console.log("get coms error = ", error);
      });
      
  }

  get f() { return this.PostCom.controls; }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.PostCom.invalid) {
        return;
    }
    this.loading = true;
    var user = JSON.parse(localStorage.getItem("currentUser"));
    this.filmService.addCom(this.id, user.id, this.f.com.value)
      .subscribe(
      data => 
      {
          console.log("add com ok = ", data);
          location.reload();
          
      },
      error => {
          console.log("add com error = ", error);
          console.log(error.error);
          this.error = error.error;
          this.loading = false;
      });
    }

    onclick(){
      console.log("l'image disparait !");
      document.getElementById("image_before").style.display ='none';
      /*appeleer ta fonction qui telechqrge et qui te donne la src*/
      
      this.src_video =  this.sanitization.bypassSecurityTrustUrl("http://localhost:8080/download");
    }

}
