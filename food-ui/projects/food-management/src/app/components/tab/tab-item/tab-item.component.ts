import { booleanAttribute, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { StyleUnitTransformPipe } from '@pipes/style-unit-transform/style-unit-transform.pipe';
import { TabBehaviorDirective } from './directives/tab-behavior.directive';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'fm-tab-item',
  standalone: true,
  imports: [StyleUnitTransformPipe, TabBehaviorDirective, NgStyle, NgClass],
  templateUrl: './tab-item.component.html',
  styleUrl: './tab-item.component.scss',
})
export class TabItemComponent {
  @Input({ transform: booleanAttribute }) active = false;
  @ViewChild('tabItem') tabItem?: TemplateRef<{ tab: HTMLUListElement }>;
}
