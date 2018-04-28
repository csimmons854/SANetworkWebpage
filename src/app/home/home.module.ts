import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA } from '@angular/core';
// app
import  {SharedModule } from '../shared';
import { SHARED_MODULES } from './home.common';

@NgModule({
    imports: [SharedModule, ...SHARED_MODULES],
})
export class HomeModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: HomeModule
    ) {
        if (parentModule) {
            throw new Error(
                'HomeModule already loaded; Import in root module only.'
            );
        }
    }
}




