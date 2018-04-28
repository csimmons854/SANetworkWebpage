import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-week-performance-cards',
    templateUrl: './week-performance-cards.component.html',
    styleUrls: ['./week-performance-cards.component.scss']
})
export class WeekPerformanceCardsComponent implements OnInit {
    numberCardView = [280, 900];
    numberCardScheme = {
        domain: ['#B71C1C', '#D32F2f', '#F44336', '#EF5350', '#EF9A9A']
    };
    numberCardData = [
        {
            name: 'Total Appointments',
            value: 1769
        },
        {
            name: 'Value of Trade Ins',
            value: '$25,045.23'
        },
        {
            name: 'Avg. Appointment Length',
            value: '17.04 Minutes'
        },
        {
            name: 'Avg. Value per Login',
            value: '$7.45'
        },
        {
            name: 'Avg. Items per Customer',
            value: '3.4'
        }
    ];
    numberCardLabelFormatting(c): string {
        return `<span class="number-card-text">${
            c.label
        }</span><br/><small class="number-card-label">This week</small>`;
    }

    ngOnInit() {}
}
