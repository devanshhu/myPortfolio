import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'; 

import { HelperService } from '../helper.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations : [

trigger('panelInOut', [
            transition('void => *', [
                style({
                  transform: 'translateY(+60%)',
                  opacity : '1'
                }),
                animate(100)
            ])
            // transition('* => void', [
            //   style({
            //       transform: 'translateX(+10%)',
            //       opacity : '0'}),
            //     animate(1000)
            // ])
        ])


  ]
})
export class HeaderComponent implements OnInit {

  @Output() navigateTo: EventEmitter<string>  = new EventEmitter();
  public activeSelection?:{[key:string]:string|boolean};
  public menuOptions? : Array<{[key:string]:string|boolean}> = [];
  public lightTheme?: boolean = true;
  constructor(private _helper: HelperService) { }

  ngOnInit(): void {

    this._helper.isLightTheme.subscribe((isLight:boolean) =>{
      this.lightTheme = isLight;
    });

    this.menuOptions = [{
      id : '1',
      name : 'Home',
      path : '',
      lightThemeLogo : 'assets/themes/light/light-home.svg',
      darkThemeLogo : 'assets/themes/dark/dark-home.svg',
      isClickable : true
    },
    {
      id : '2',
      name: 'Projects',
      path : 'projects',
      lightThemeLogo : 'assets/themes/light/light-technologies.svg',
      darkThemeLogo : 'assets/themes/dark/dark-technologies.svg',
      isClickable : true
    },
    {
      id : '3',
      name : 'Blog',
      path : 'blog',
      lightThemeLogo : 'assets/themes/light/light-blog.svg',
      darkThemeLogo : 'assets/themes/dark/dark-blog.svg',
      isClickable : false
    }
  ];
    this.activeSelection = this.menuOptions[0];
  }

  public menuSelectionChange(path :  string | boolean){
    path = path as string;
    if(this.menuOptions){
      const selOption = this.menuOptions.find((x) => x.path === path);
      if( selOption && selOption.isClickable){
        this.activeSelection = selOption;
        this.navigateTo.emit(path);
    }
    }

  }

  public changeTheme(){

    this._helper.isLightTheme.next(!this.lightTheme);

  }
}
