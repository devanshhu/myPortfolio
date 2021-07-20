import { Component, OnInit } from '@angular/core';
import { HelperService } from './helper.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'portfolio-v2';
    public lightTheme: boolean = true;
    constructor(private _helper: HelperService){

    }

    ngOnInit(){

        this._helper.isLightTheme.subscribe((isLight:boolean) =>{
            this.lightTheme = isLight;
        });

    }

    public navigateToPage(pageNumber: number ){
        console.log("changed to "+ pageNumber); 
    }
}
