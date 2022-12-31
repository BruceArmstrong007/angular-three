import { Injectable } from '@angular/core';
import{BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public load$ = new BehaviorSubject(true);
  constructor() { }

  set setloader(value : any){
    this.load$.next(value);
  }


}
