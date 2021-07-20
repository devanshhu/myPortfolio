import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public isLightTheme : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor() { }

}
