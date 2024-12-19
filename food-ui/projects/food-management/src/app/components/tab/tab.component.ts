import { Component, QueryList, ContentChildren } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'fm-tab',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent {
  @ContentChildren(TabItemComponent) items?: QueryList<TabItemComponent>;
}
