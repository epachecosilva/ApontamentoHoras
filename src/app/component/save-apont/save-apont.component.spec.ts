import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveApontComponent } from './save-apont.component';

describe('SaveApontComponent', () => {
  let component: SaveApontComponent;
  let fixture: ComponentFixture<SaveApontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveApontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveApontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
