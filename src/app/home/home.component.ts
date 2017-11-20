/**
 * Created by ranjeeth on 20/11/17.
 * @author ranjeeth
 */

import { Component, OnInit } from '@angular/core';
import { GitApiService } from '../service/git.api.service';
import { PullResponse } from '../model/PullResponse';
import { MergeResponse } from '../model/MergeResponse';

@Component({
    selector: 'my-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    pullResponses: PullResponse[];
    mergeResponse: MergeResponse;

    constructor(private gitApiService: GitApiService) {
        this.pullResponses = [];
        this.gitApiService = gitApiService;
    }

    ngOnInit() {
        this.gitApiService.getAllPullRequest('philipsorst', 'angular-rest-springsecurity').subscribe(data => {
            this.pullResponses = data
        });
        this.gitApiService.merge('philipsorst', 'angular-rest-springsecurity', 26).subscribe(data => {
            this.mergeResponse = data
        });
    }

}
