import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteProyectos } from './cliente-proyectos';

describe('ClienteProyectos', () => {
  let component: ClienteProyectos;
  let fixture: ComponentFixture<ClienteProyectos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteProyectos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteProyectos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
