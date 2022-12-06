import { Component, OnInit, ElementRef ,ViewChild  } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HomePopupComponent } from '../dialog/home-popup/home-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('playvideo') playvideo: ElementRef | any;
  
  backgroundVideo:string="Pause"
  playpause: boolean = false;

  constructor(private matDialog:MatDialog) { }

  ngOnInit(): void { 
  }

  change() {
    this.playpause = !this.playpause;
    if (this.playpause) {
      this.backgroundVideo = 'Play';
      this.playvideo.nativeElement.pause();
    } else {
      this.backgroundVideo = 'Pause';
      this.playvideo.nativeElement.play();
    }
  }

  login(){
    let diaLogConfig = new MatDialogConfig()
    diaLogConfig.panelClass="dialog-box"
    this.matDialog.open(HomePopupComponent , diaLogConfig)
  }

}
