/**
 * Created by ranjeeth on 20/11/17.
 * @author ranjeeth
 */

import { Component, OnInit } from '@angular/core';
import { GitApiService } from '../service/git.api.service';
import { PullResponse } from '../model/PullResponse';
import { MergeResponse } from '../model/MergeResponse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'my-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    pullResponses: PullResponse[];
    mergeResponse: MergeResponse;
    pullRequestError: string;
    mergeRequestError: string;
    isDataPulling: boolean = false;
    userClicked: boolean = false;
    // Form related
    rForm: FormGroup;
    titleAlert: string = 'This field is required';
    owner: string;
    repo: string;
    // Table
    dataSource = new MatTableDataSource();
    displayedColumns = ['created', 'updated', 'id', 'number', 'title', 'state'];

    constructor(private gitApiService: GitApiService, formBuilder: FormBuilder) {
        this.pullResponses = [];
        this.gitApiService = gitApiService;
        this.owner = 'angular';
        this.repo = 'angular';
        this.rForm = formBuilder.group({
            'owner': [this.owner, Validators.required],
            'repo': [this.repo, Validators.required]
        });
    }

    ngOnInit() {
        console.log('HomeComponent Initialised.');
    }

    getAllPullRequest(formData): void {
        this.isDataPulling = true;
        this.userClicked = true;
        this.pullRequestError = '';
        this.gitApiService.getAllPullRequest(formData.owner, formData.repo).subscribe(data => {
            if (typeof data === 'string') {
                this.pullRequestError = data;
                this.pullResponses = [];
                this.dataSource.data = [];
            } else {
                this.pullResponses = data;
                this.dataSource.data = this.pullResponses;
            }
            this.isDataPulling = false;
        });
    }

    merge(number: number): void {
        this.mergeRequestError = '';
        this.gitApiService.merge(this.owner, this.repo, number).subscribe(data => {
            if (typeof data === 'string') {
                this.mergeRequestError = data;
            } else {
                this.mergeResponse = data
            }
        });
    }

}
