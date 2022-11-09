import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgekartComponent } from './knowledgekart.component';

describe('KnowledgekartComponent', () => {
  let component: KnowledgekartComponent;
  let fixture: ComponentFixture<KnowledgekartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnowledgekartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnowledgekartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
