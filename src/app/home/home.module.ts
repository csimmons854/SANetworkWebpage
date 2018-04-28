import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA } from '@angular/core';
// app
import { SharedModule } from '../shared';
import { HomeComponent } from './components/home/home.component';
import { SHARED_MODULES } from './home.common';
import { AppointmentsPerDayComponent } from './components/charts/appointments-per-day/appointments-per-day.component';
import { WeekPerformanceCardsComponent } from './components/charts/week-performance-cards/week-performance-cards.component';
import { TopStoresComponent } from './components/charts/top-stores/top-stores.component';
import { ScheduledVsUnscheduledChartComponent } from './components/charts/scheduled-vs-unscheduled-chart/scheduled-vs-unscheduled-chart.component';

@NgModule({
    imports: [SharedModule, ...SHARED_MODULES],
    declarations: [
        HomeComponent,
        AppointmentsPerDayComponent,
        WeekPerformanceCardsComponent,
        TopStoresComponent,
        ScheduledVsUnscheduledChartComponent
    ]
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
