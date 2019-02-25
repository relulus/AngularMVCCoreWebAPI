import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable,  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IRobot, IPagedResults, IRobotResponse } from '../shared/interfaces';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    baseUrl = environment.apiUrl;
    baseRobotsUrl = this.baseUrl + 'robots';
    baseStatesUrl = this.baseUrl + 'states'

    constructor(private http: HttpClient) { }
    
    getRobots() : Observable<IRobot[]> {
        return this.http.get<IRobot[]>(this.baseRobotsUrl)
            .pipe(
                   map(robots => {
                      
                       return robots;
                   }),
                   catchError(this.handleError)
                );
    }

    getRobotsPage(page: number, pageSize: number) : Observable<IPagedResults<IRobot[]>> {
        return this.http.get<IRobot[]>(`${this.baseRobotsUrl}/page/${page}/${pageSize}`, {observe: 'response'})
            .pipe(            
                map((res) => {
                    //Need to observe response in order to get to this header (see {observe: 'response'} above)
                    const totalRecords = +res.headers.get('x-inlinecount');
                    let robots = res.body as IRobot[];                  
                    return {
                        results: robots,
                        totalRecords: totalRecords
                    };
                }),
                catchError(this.handleError)
            );
    }
    
    getRobot(id: string) : Observable<IRobot> {
        return this.http.get<IRobot>(this.baseRobotsUrl + '/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    insertRobot(robot: IRobot) : Observable<IRobot> {
        return this.http.post<IRobotResponse>(this.baseRobotsUrl, robot)
            .pipe(                   
                map((data) => {
                       console.log('insertRobot status: ' + data.status);
                       return data.robot;
                   }),
                catchError(this.handleError)
            );
    }
   
    updateRobot(robot: IRobot) : Observable<IRobot> {
        return this.http.put<IRobotResponse>(this.baseRobotsUrl + '/' + robot.id, robot) 
            .pipe(
                map((data) => {
                       console.log('updateRobot status: ' + data.status);
                       return data.robot;
                   }),
                catchError(this.handleError)
            );
    }

    deleteRobot(id: string) : Observable<boolean> {
        return this.http.delete<boolean>(this.baseRobotsUrl + '/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }


  
    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error); 
        if (error.error instanceof Error) {
          let errMessage = error.error.message;
          return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'ASP.NET Core server error');
    }

}
