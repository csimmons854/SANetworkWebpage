import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-scheduled-vs-unscheduled-chart',
    templateUrl: './scheduled-vs-unscheduled-chart.component.html',
    styleUrls: ['./scheduled-vs-unscheduled-chart.component.scss']
})
export class ScheduledVsUnscheduledChartComponent implements OnInit {
    view = [850, 275];
    colorScheme = {
        domain: ['#D50000', '#424242']
    };
    chartData = [
        {
            name: 'Scheduled',
            value: 4823
        },
        {
            name: 'Walk In',
            value: 2478
        }
    ];
    totalLabel = 'Total Appointments';

    constructor() {}

    ngOnInit() {}
}
