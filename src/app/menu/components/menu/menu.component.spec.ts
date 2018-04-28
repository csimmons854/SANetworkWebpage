mport { Pipe, PipeTransform } from '@angular/core';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../../shared';
import { MenuComponent } from './menu.component';

@Pipe({
    name: 'translate'
})
class MockTranslatePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return value;
    }
}

@Component({
    selector: 'app-menu-item',
    template: ``
})
class MockSeedMenuItemComponent {
    @Input() item: any;
}

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [SharedModule],
                declarations: [
                    MenuComponent,
                    MockSeedMenuItemComponent,
                    MockTranslatePipe
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('menu login', () => {
        it('should render 2 login', () => {
            component.items = [
                { title: 'menu.home', link: ['/home'] },
                { title: 'menu.about', link: ['/about'] }
            ];
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const menuItems = fixture.debugElement.queryAll(
                    By.css('app-menu-item')
                );
                expect(menuItems.length).toBe(2);
            });
        });
    });
});
