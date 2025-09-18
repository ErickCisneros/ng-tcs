import { ChangeDetectionStrategy, Component, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [ReactiveFormsModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInput implements OnInit {
  searchControl = new FormControl();

  searchChange = output<string>();

  ngOnInit() {
    this.searchControl.valueChanges.subscribe((value) => {
      this.searchChange.emit(value ?? '');
    });
  }
}
