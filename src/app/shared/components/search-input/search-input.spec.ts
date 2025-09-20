import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchInput } from './search-input';

describe('SearchInput', () => {
  let component: SearchInput;
  let fixture: ComponentFixture<SearchInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInput],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchChange on value change', () => {
    const spy = jest.spyOn(component.searchChange, 'emit');

    component.searchControl.setValue('hello');
    expect(spy).toHaveBeenCalledWith('hello');
  });

  it('should emit empty string when value is null', () => {
    const spy = jest.spyOn(component.searchChange, 'emit');

    component.searchControl.setValue(null);
    expect(spy).toHaveBeenCalledWith('');
  });

  it('should emit empty string when value is undefined', () => {
    const spy = jest.spyOn(component.searchChange, 'emit');

    component.searchControl.setValue(undefined);
    expect(spy).toHaveBeenCalledWith('');
  });
});
