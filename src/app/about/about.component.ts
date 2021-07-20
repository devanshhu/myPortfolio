import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'; 

import { interval, timer, Observable } from 'rxjs';
import { take, tap,switchMap } from 'rxjs/operators';

import { HelperService } from '../helper.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('appearFromBottom',[
      transition('void => *',[
           style({
                  transform: 'translateY(+40%)',
                  opacity : '0.6'
                }),
                animate('.2s ease')
        ])
      ]),
    trigger('popout',[

      transition(':enter',[
        style({
          opacity : '.1',
          transform: 'scale(0.2)'

        }),
        animate('0.4s ease')
        ])
      ])
  ]
})
export class AboutComponent implements OnInit {

  public introductionText : string = '';
  public academicText : string = '';
  public introduction : string ='';
  public academic : string ='';
  public textEmitInterval : number = 20;
  public showBlinker : boolean = false;
  public skillsArray: Array<{[key:string] : string | number}>=[];
  public skillSet: Array<{[key:string] : string | number}>=[];
  public contactsList : Array<{[key:string] : string | number}>=[];
  public contactVias : Array<{[key:string] : string | number}>=[];
  public lightTheme: boolean = true;
  constructor(private _helper: HelperService) { }

  ngOnInit(): void {

 this._helper.isLightTheme.subscribe((isLight:boolean) =>{
      this.lightTheme = isLight;
    });

    this.introductionText ="I'm Devansh Upadhyay, a web developer from India. Along with developing beautiful interfaces, I like reading books, about history & mythology, playing cricket & trying new things.Currently working in TCS, I develop interfaces for one of it's flagship products.";
    this._startEmitting();
    this.contactsList = [
    {
      name : 'gmail',
      url : 'mailto:devanshu9719@gmail.com'
    },
    {
      name : 'linkedin',
      url : 'https://linkedin.com/in/devanshhu'
    },
    {
      name :'github',
      url : 'https://github.com/devanshhu'
    },
    {
      name: 'instagram',
      url : 'https://instagram.com/devanshhu'
    }
    ];
    this.skillsArray = [
    {
      id: 4,
      name: "Javascript",
      assetName : 'javascript.svg',
      colorName : 'yellow-500',
      percentage:'70%',
      description:'for its popularity !'
    },{
      id: 3,
      name: "Angular",
      assetName : 'angular.svg',
      colorName : 'pink-700',
      percentage:'70%',
      description:'for its completeness !'
    },{
      id: 2,
      name: "Java",
      assetName : 'java.svg',
      colorName : 'indigo-300',
      percentage:'70%',
      description:'for its legacy !'
    },
    {
      id: 1,
      name: "Rxjs",
      assetName : 'rxjs.svg',
      colorName : 'pink-500',
      percentage:'50%',
      description:'for some extra reactivity !'
    }
    ];

  }

  private _startEmitting(){
    
    this._introText()
    .pipe(
      switchMap((x) => this._academyText())
      )
    .subscribe(
      x => console.log(x),
      err => console.log(err),
      () => {
        this.showBlinker = true;
        this.populateContactMe();
       
      }
      );
  }

  private _introText(){

    return interval(this.textEmitInterval)
    .pipe(
      take(this.introductionText.length),
      tap((i) => this.introduction += this.introductionText[i])
      );
  }

  private _academyText(){

     return interval(this.textEmitInterval)
    .pipe(
      take(this.academicText.length),
      tap((i) => this.academic += this.academicText[i])
      );
  }

  private populateSkillSet(){

    return interval(500).pipe(
      take(4),
     tap((i) => this.skillSet[i] = this.skillsArray[i])
      );
  }

  private populateContactMe(){
    interval(800).pipe(
      take(4),
      tap( (i) => this.contactVias[i] = this.contactsList[i])
      ).subscribe(
      x => console.log(x),
      err => console.log(err),
      () =>  this.populateSkillSet().subscribe()
      );
  }
}
