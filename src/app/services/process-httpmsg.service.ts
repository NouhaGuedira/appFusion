import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {
  
  constructor() { }

  public handleError(httperror: HttpErrorResponse |any){
    let errMsg: string;

    if(httperror.error instanceof ErrorEvent){
      errMsg = httperror.error.message;

    }else{
      errMsg = `${httperror.status || ''} - ${httperror.statusText ||''} ${httperror.error}`;
    }
    return throwError(errMsg);
  }

}
