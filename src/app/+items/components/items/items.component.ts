import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
    creating = false;
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {}

    isActive(routeName) {
        if (this.route.snapshot.children.length < 1) {
            return false;
        }
        const routeConfig = this.route.snapshot.children[0].routeConfig as any;
        return routeConfig.name === routeName;
    }

    createItem() {
        this.creating = true;
    }
}
