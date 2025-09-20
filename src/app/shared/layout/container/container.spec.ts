import { provideLocationMocks } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Container } from './container';

describe('Container', () => {
  let component: Container;
  let fixture: ComponentFixture<Container>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Container],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(Container);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
