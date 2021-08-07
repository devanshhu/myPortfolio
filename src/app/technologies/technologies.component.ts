import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'; 
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { HelperService } from '../helper.service'; 

@Component({
  selector: 'app-projects',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss'],
    animations: [
  trigger('appearFromBottom',[
    transition('void => *',[
      style({
        transform: 'translateY(+20%)',
        opacity : '0.6'
      }),
      animate('.2s ease')
      ])
    ]),
  trigger('appearFromRight',[
    state("right",
      style({
        transform: 'translateY(+5%)',
        opacity : '1'
      })),
    state("left" , 
  
      style({
        transform: 'translateY(-5%)',
        opacity : '1'
      })),
    // transition("right <=> left", animate("300ms ease")),
    transition(":enter", animate("300ms ease")),

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
export class TechnologiesComponent implements OnInit {


  public projectCards : Array<any> = [];
  public projectData : Array<any> = [];
  public scrollSubject: Subject<string> = new Subject();
  public currentIndex : number  =0;
  public animateFromRight : string = "right";
  constructor( private _helper: HelperService) { }

  ngOnInit(): void {

    this.scrollSubject.pipe(throttleTime(1000)).subscribe(res =>{
        this.currentIndex += 2;
        this.animateFromRight = res;
        this.currentIndex %= this.projectData.length; 
        this.projectCards = this.projectData.slice(this.currentIndex, this.currentIndex + 2);

    });

    this.projectData = [
    {
      imgUrl : 'assets/projects/covid-tally.gif',
      title : 'India Covid State-wise Viz',
      description : 'Animated Visualisation of state-wise tally for active covid-19 cases in India. Shows the steep rise of cases in Maharashtra at the beginning of second wave.',
      techUsed : ['angular','javascript','rxjs', 'd3','css3']
    },
    {
      imgUrl : 'assets/projects/vaccination-chart.png',
      title : 'Total Vaccination in India Viz',
      description : 'Visualisation of total no. of vaccine doses administered in a given week through use of smooth line-curve.',
      techUsed : ['angular','javascript','rxjs','d3','css3']
    },
    {
      imgUrl : 'assets/projects/oil-price.gif',
      title : 'Crude Oil Price in India Viz',
      description : 'Animated Visualisation of price for Crude oil that India imported during the period 2003-2020.',
      techUsed : ['angular','javascript','rxjs','d3','css3']
    },
    {
      imgUrl : 'assets/projects/portfolio.png',
      title : 'Portfolio ',
      description : 'A simple yet elegant project for showcasing my ideas, interests & work experience',
      techUsed : ['angular','javascript','rxjs','d3','css3']
    },
    {
      imgUrl : 'assets/projects/maps.jpg',
      title : 'Results for MP-2018 elections through Map-Viz',
      description : 'The map shows color-coded ACs based on the winner party in 2018 Assembly elections, with a dashboard for historic data of multiple cities.',
      techUsed : ['angular','javascript','rxjs','d3','css3']
    },
    {
      imgUrl : 'assets/projects/smiip.jpg',
      title : 'SMIIP for politics.in',
      description : 'Developed a crawler for the firm @Politics.in. It parsed data from twitter/fb APIs for top politicians of India & updates the dashboard in realtime.',
      techUsed : ['dotnet_core']
    }
    ];

    if(this._helper.isMobile){
        this.projectCards = this.projectData;
    }else{

        this.projectCards = this.projectData.slice(this.currentIndex, this.currentIndex + 2);
    }



  }

  public onScroll(event : WheelEvent){
    
    if(!this._helper.isMobile){

      // this.animateFromRight = ;
      this.scrollSubject.next(event.deltaY > 0 ? "left": "right");
    }
  }

}
