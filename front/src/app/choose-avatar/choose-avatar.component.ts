import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer,  SafeHtml,  SafeUrl,  SafeStyle} from '@angular/platform-browser';
import { UserService } from '../_services';

@Component({
  selector: 'choose-avatar',
  templateUrl: './choose-avatar.component.html',
  styleUrls: ['./choose-avatar.component.scss']
})
export class ChooseAvatarComponent implements OnInit {
  selectedValue : String[];
  selected = '';
  error='';
  
  @Input() src : SafeUrl;

  avatars = [
    {
      src: 'assets/default.png'
    },
    {
      src: 'assets/2.png'
    },
    {
      src: 'assets/3.png'
    },
    {
      src: 'assets/4.png'
    },
    {
      src: 'assets/5.png'
    },
    {
      src: 'assets/6.png'
    }
  ];

  constructor(private userService : UserService) { }


  ngOnInit() {
  }

  choix_image = function(src:string) {
    console.log("cliclic");
    console.log("src choisie = ", src)
  }

/*----------------------------------------------------------------------*/
  toggleOptions: Array<String> = ["assets/default.png", "assets/2.png", "assets/3.png", "assets/4.png", "assets/5.png", "assets/6.png"];

  selectionChanged(item) {
    this.selected = item.value;
    console.log("Selected value: " + item.value);
  }
  change(){
    if(this.selected != "")
    {
      this.userService.modifyAvatar(this.selected)
      .subscribe(
      data => 
      {
          console.log("modify Avatar ok = ", data);
          location.reload();
      },
      error => {
          console.log("modify Avatar error = ", error);
          console.log(error.error);
          this.error = error.error;
      });
    }
    console.log(this.selected)
  }
/*----------------------------------------------------------------------*/
}