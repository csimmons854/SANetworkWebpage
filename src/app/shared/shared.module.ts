import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MatSelectModule } from '@angular/material/select';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedMaterialModule } from './shared-material.module';
@NgModule({
    imports: [
        CommonModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDxFJCbLzKDL63aOsP35ynejhZH31JSBjA'
        })
    ],
    declarations: [],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        SharedMaterialModule,
        NgxChartsModule
    ]
})
export class SharedModule {}
