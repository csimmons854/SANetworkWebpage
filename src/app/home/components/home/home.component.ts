import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    currentMonth = new Date().toLocaleString('en-us', { month: 'long' });

    ngOnInit() {}
}
