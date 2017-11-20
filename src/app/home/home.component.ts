/**
 * Created by ranjeeth on 20/11/17.
 * @author ranjeeth
 */

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    result: string;

    constructor() {
        this.result = `Git data here.`;
    }

    ngOnInit() {
        console.log('Hello Home');
    }

}
