import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeHtml, SafeUrl, SafeStyle } from '@angular/platform-browser';
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
  year: number;
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
  sub_path :string;
  id_tmp: string;
  id_imdb: string;
  src_video: SafeUrl;
  src_subtitles: SafeUrl ;
  //subs = new Array();
  sub_en = new Array();
  sub_pref = new Array();
  user_pref = "French";
  dl_ok = false;
  /*subs = JSON.parse(JSON.stringify({
    path: "",
    langue:"",
    langShort: ""}
  ));*/

  constructor(private filmService : FilmService, 
              private route: ActivatedRoute,
              private sanitization:DomSanitizer,
             // private subtitlesService: SubtitlesService,
              private formBuilder: FormBuilder) {
   } 

   ngOnInit() {
    
    this.PostCom = this.formBuilder.group({
      com: ['', Validators.required]
    });

    var regex1 = RegExp('^tt');
    if (regex1.test(this.route.snapshot.paramMap.get("id")))
    {

      this.id_tmp  = this.route.snapshot.paramMap.get("id");
      this.id = parseInt(this.id_tmp.split('t')[2]);
      this.filmService.getDetailFilmOMbd(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        data => {
          var data2 = JSON.parse(JSON.stringify(data));
          this.title = data2.name;
          this.affiche = this.sanitization.bypassSecurityTrustUrl(data2.affiche);
          this.year = data2.year;
          this.duration = data2.duree;
          this.genre = data2.genres;
          this.langue = data2.langue;
          this.description = data2.description;
          this.background = this.sanitization.bypassSecurityTrustUrl(data2.background_image);
          this.note = data2.rating;
          this.cast = data2.cast;
          console.log("affiche = ", this.affiche);
          console.log("background = ", this.background);

        },
        error => {
          console.log("get film error = ", error);
      }); 
    }
    else{
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
          this.background = this.sanitization.bypassSecurityTrustUrl(data2.background_image);
          this.note = data2.rating;
          this.cast = data2.cast;
          this.id_imdb  = data2.imdb_code;
          console.log("affiche = ", this.affiche);
          console.log("background = ", this.background);

      },
      error => {
          console.log("get film error = ", error);
      });
    }

    this.filmService.getComs(this.id)
    .subscribe(
      res => {
        this.i = 0;
        for (let da in res.com) {
          this.coms[this.i] = res.com[this.i];
          this.i = this.i + 1;
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
        data => {
          console.log("add com ok = ", data);
          location.reload();

        },
        error => {
          console.log("add com error = ", error);
          this.error = error.error;
          this.loading = false;
        });
  }

  onclick() {
    var regex1 = RegExp('^tt');
    if (regex1.test(this.id_tmp)) {
      console.log("premier if")
      this.background = this.sanitization.bypassSecurityTrustUrl('/assets/sorry.png');
      console.log("this. src_video = ",this.src_video);
    }
    else{
      console.log("deuxieme if")
      console.log("l'image disparait !");
      document.getElementById("image_before").style.display = 'none';
      this.src_video = this.sanitization.bypassSecurityTrustUrl("http://localhost:8080/api_getfilm_id/" + this.id);
      console.log("this. src_video = ",this.src_video);
    }
    console.log("id_imdb = ",this.id_imdb);
    this.filmService.getsub(this.id_imdb)
    .subscribe(
        data => 
        {
          var singleVideo = document.getElementById("singleVideo");
          let i =0;
          console.log("get  sub ok = ", data);
          for (let da in data)
          {
            if (data[i].lang == "english")
            {
              var track = document.createElement("track");
              track.kind = "subtitles";
              track.label = "english";
              track.srclang = "en";
              track.src = 'http://localhost:8080/subtitle_path/'+data[i].path;
              singleVideo.appendChild(track);
            }
            if(data[i].lang == this.user_pref)
            {
              var track = document.createElement("track");
              track.kind = "subtitles";
              track.label = "english";
              track.srclang = "en";
              track.src = 'http://localhost:8080/subtitle_path/'+data[i].path;
              singleVideo.appendChild(track);
            }
            i++;
          }
          this.dl_ok = true;
        },
        error => {
            console.log("get detail error = ", error);
            console.log(error.error);
            this.error = error.error;
            this.loading = false;
        });
  }
}
