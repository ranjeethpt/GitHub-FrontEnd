/**
 * Created by ranjeeth on 20/11/17.
 * @author ranjeeth
 */

import { Component, OnInit } from '@angular/core';
import { GitApiService } from '../service/git.api.service';
import { PullResponse } from '../model/PullResponse';

@Component({
    selector: 'my-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    result: PullResponse[];

    constructor(private gitApiService: GitApiService) {
        this.result = [];
        this.gitApiService = gitApiService;
    }

    ngOnInit() {
        console.log('Hello Home');
        this.gitApiService.getAllPullRequest('philipsorst', 'angular-rest-springsecurity').subscribe(data => {
            this.result = data
        });
    }

}
