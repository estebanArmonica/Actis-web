import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBreadcrumb } from './navbar-breadcrumb';

describe('NavbarBreadcrumb', () => {
  let component: NavbarBreadcrumb;
  let fixture: ComponentFixture<NavbarBreadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarBreadcrumb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarBreadcrumb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
