import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public isHomeVisited : boolean = false;
  public isLightTheme : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isMobile:boolean = false;
  constructor() { }

}
