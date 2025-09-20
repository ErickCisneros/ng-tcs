import { provideLocationMocks } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AddButton } from './add-button';

describe('AddButton', () => {
  let component: AddButton;
  let fixture: ComponentFixture<AddButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddButton],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
