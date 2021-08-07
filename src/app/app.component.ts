import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HelperService } from './helper.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'portfolio-v2';
    public lightTheme: boolean = true;
    constructor( private _helper : HelperService, private _router: Router      ){

    }



    ngOnInit(){
        const mobile = window.navigator.userAgent;
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(mobile)){
            this._helper.isMobile = true; 
        }
        this._helper.isLightTheme.subscribe((isLight:boolean) =>{
            this.lightTheme = isLight;
        });

    }

    public navigateToPage(path: string ){

        this._router.navigate([path], {skipLocationChange : true});


    }
}
