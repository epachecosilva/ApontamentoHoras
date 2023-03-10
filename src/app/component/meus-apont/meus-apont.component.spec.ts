import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusApontComponent } from './meus-apont.component';

describe('MeusApontComponent', () => {
  let component: MeusApontComponent;
  let fixture: ComponentFixture<MeusApontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeusApontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusApontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
