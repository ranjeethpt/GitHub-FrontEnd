/**
 * Created by ranjeeth on 20/11/17.
 * @author ranjeeth
 */

import './polyfill';

import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/proxy';
import 'zone.js/dist/jasmine-patch';

import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

let testContext = (<any>require).context('./app', true, /\.spec\.ts/);
testContext.keys().forEach(testContext);
