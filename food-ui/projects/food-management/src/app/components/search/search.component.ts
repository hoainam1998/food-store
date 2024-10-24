import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule,  } from '@angular/forms';
import { InputComponent } from '@components/form/input/input.component';

@Component({
  selector: 'fm-search',
  standalone: true,
  imports: [FormsModule, InputComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();
  keyword = '';
}
