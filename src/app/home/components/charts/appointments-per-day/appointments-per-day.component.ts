import { Component, OnInit } from '@angular/core';

import * as shape from 'd3-shape';
import * as d3 from 'd3';

const monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });
const weekdayName = new Intl.DateTimeFormat('en-us', { weekday: 'short' });

@Component({
    selector: 'app-appointments-per-day',
    templateUrl: './appointments-per-day.component.html',
    styleUrls: ['./appointments-per-day.component.scss']
})
export class AppointmentsPerDayComponent implements OnInit {
    colorScheme = {
        domain: [
            '#FFEBEE',
            '#FFCDD2',
            '#EF9A9A',
            '#E57373',
            '#EF5350',
            '#F44336',
            '#E53935',
            '#D32F2F',
            '#C62828',
            '#B71C1C'
        ]
    };

    width: number;
    height: number;

    // options
    chart: any;
    theme = 'dark';
    view: any[];
    calendarData: any[];
    animations: boolean = true;
    showLegend = true;
    gradient = false;
    showXAxis = true;
    showYAxis = true;
    tooltipDisabled = false;
    innerPadding = '10%';

    constructor() {}

    ngOnInit() {
        this.updateData();

        this.width = 1100;
        this.height = 200;

        this.applyDimensions();
    }

    updateData() {
        this.calendarData = this.getCalendarData();
    }

    applyDimensions() {
        this.view = [this.width, this.height];
    }

    select(data) {
        console.log('Login clicked', data);
    }

    getCalendarData(): any[] {
        // today
        const now = new Date();
        const todaysDay = now.getDate();
        const thisDay = new Date(now.getFullYear(), now.getMonth(), todaysDay);

        // Monday
        const thisMonday = new Date(
            thisDay.getFullYear(),
            thisDay.getMonth(),
            todaysDay - thisDay.getDay() + 1
        );
        const thisMondayDay = thisMonday.getDate();
        const thisMondayYear = thisMonday.getFullYear();
        const thisMondayMonth = thisMonday.getMonth();

        // 52 weeks before monday
        const calendarData = [];
        const getDate = d => new Date(thisMondayYear, thisMondayMonth, d);
        let valueCount = 0;
        for (let week = -52; week <= 0; week++) {
            const mondayDay = thisMondayDay + week * 7;
            const monday = getDate(mondayDay);

            // one week
            const series = [];
            for (let dayOfWeek = 7; dayOfWeek > 0; dayOfWeek--) {
                const date = getDate(mondayDay - 1 + dayOfWeek);

                // skip future dates
                if (date > now) {
                    continue;
                }

                // value
                let randomNum = Math.floor(Math.random() * 50);
                randomNum -= 25;
                let nextVal = valueCount + randomNum;
                if (nextVal < 0) {
                    nextVal = 0;
                }
                const value = nextVal;
                if (week < -26) {
                    valueCount++;
                } else {
                    valueCount--;
                }

                series.push({
                    date,
                    name: weekdayName.format(date),
                    value
                });
            }

            calendarData.push({
                name: monday.toString(),
                series
            });
        }

        return calendarData;
    }

    calendarAxisTickFormatting(mondayString: string) {
        const monday = new Date(mondayString);
        const month = monday.getMonth();
        const day = monday.getDate();
        const year = monday.getFullYear();
        const lastSunday = new Date(year, month, day - 1);
        const nextSunday = new Date(year, month, day + 6);
        return lastSunday.getMonth() !== nextSunday.getMonth()
            ? monthName.format(nextSunday)
            : '';
    }

    calendarTooltipText(c): string {
        return `
            <span class="tooltip-label">${
                c.label
            } • ${c.cell.date.toLocaleDateString()}</span>
            <span class="tooltip-val">${c.data.toLocaleString()}</span>
        `;
    }
}
