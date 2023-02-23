import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Store } from '../../store/store';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent {
  @Input() target: any;

  constructor(private readonly store: Store) {}

  items: MenuItem[] = [
    {
      label: 'New folder',
      command: () => this.store.addNewFolder(),
    },
    {
      label: 'Get info',
    },
    {
      label: 'Change desktop background',
    },
    {
      label: 'Properties',
    },
  ];
}
