/**
 * Created by ranjeeth on 20/11/17.
 * @author ranjeeth
 */

import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { createNewHosts, removeNgStyles } from '@angularclass/hmr';
import { HomeComponent } from './home/home.component';
import { GitApiService } from './service/git.api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    providers: [GitApiService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {
    }

    hmrOnInit(store) {
        console.log('HMR store', store);
    }

    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
