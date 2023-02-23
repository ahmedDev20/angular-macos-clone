import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TooltipOptions } from 'primeng/tooltip';
import { Subject, takeUntil } from 'rxjs';
import { LAUNCHPAD } from 'src/app/shared/config/applications';
import { dockItems } from 'src/app/shared/config/dock-items';
import { Store } from 'src/app/shared/store/store';

@Component({
  selector: 'app-dock',
  templateUrl: './dock.component.html',
  styleUrls: ['./dock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockComponent implements OnInit {
  @Output() launchpadOpened = new EventEmitter();

  dockItems: MenuItem[] = [];
  onDestroy$ = new Subject();

  defaultTooltipOptions: TooltipOptions = {
    tooltipPosition: 'top',
    positionTop: -15,
    positionLeft: 15,
    showDelay: 1000,
  };

  constructor(
    private store: Store,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dockItems = this.getDockItems();
    this.store.trashItemsCount$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((count) => this.updateTrashIcon(count));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  updateTrashIcon(trashItemsCount: number): void {
    this.dockItems = this.dockItems.map((dockItem) => {
      const icon =
        trashItemsCount > 0 && dockItem.label === 'trash'
          ? 'trash-full'
          : dockItem.icon;

      return {
        ...dockItem,
        icon,
      };
    });

    this.changeDetection.markForCheck();
  }

  getDockItems(): MenuItem[] {
    return dockItems.map((dockItem) => ({
      label: dockItem,
      icon: dockItem,
      tooltipOptions: {
        tooltipLabel: dockItem,
        ...this.defaultTooltipOptions,
      },
      command: () => {
        if (dockItem === LAUNCHPAD) {
          this.launchpadOpened.emit();
        }

        this.store.setActiveApplication(dockItem);
      },
    }));
  }
}
