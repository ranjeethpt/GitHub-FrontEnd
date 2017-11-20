/**
 * Created by ranjeeth on 20/11/17.
 * @author ranjeeth
 */


import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PullResponse } from '../model/PullResponse';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';


@Injectable()
export class GitApiService {
    private apiUrl: string;
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.apiUrl = environment.apiUrl;
        this.http = http;
    }

    getAllPullRequest(owner: string, repo: string): Observable<PullResponse[]> {
        const url = `${this.apiUrl}/repos/${owner}/${repo}/pulls`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get(url, {headers})
            .catch(this.handleError);
    }

    private handleError(error: any): Observable<any> {
        console.error('An error occurred', error);
        return Observable.of(error.statusText || error);
    }

}
