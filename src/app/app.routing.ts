/**
 * Created by ranjeeth on 20/11/17.
 * @author ranjeeth
 */

import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {path: '', component: HomeComponent}
];

export const routing = RouterModule.forRoot(routes);
