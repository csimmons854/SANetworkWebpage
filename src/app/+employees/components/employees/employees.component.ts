import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {}

    isActive(routeName) {
        if (this.route.snapshot.children.length < 1) {
            return false;
        }
        let routeConfig = <any>this.route.snapshot.children[0].routeConfig;
        return routeConfig.name == routeName;
    }

    editEmployee() {
        this.router.navigate(['./edit'], {
            relativeTo: this.route.children[0]
        });
    }
}
