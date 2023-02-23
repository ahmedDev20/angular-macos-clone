import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { filter, mergeMap, Subject, takeUntil } from 'rxjs';
import { DESKTOP, SPOTLIGHT } from 'src/app/shared/config/applications';
import { WindowService } from 'src/app/shared/services/window.service';
import { Store } from 'src/app/shared/store/store';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
})
export class DesktopComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject();
  folders$ = this.store.desktopFolders$;
  launchpadOpened = false;

  constructor(private windowService: WindowService, private store: Store) {}

  ngOnInit(): void {
    this.store.activeApplication$
      .pipe(
        takeUntil(this.onDestroy$),
        filter((app) => app !== DESKTOP),
        mergeMap((app) => this.windowService.open(app))
      )
      .subscribe((app) => this.store.setActiveApplication(app));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  unselectFolders() {
    this.store.unselectAllFolders();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.ctrlKey && event.code === 'Space') {
      this.openSpotlight();
    }

    if (event.ctrlKey && event.code === 'Backspace') {
      this.store.deleteSelectedFolders();
    }
  }

  openSpotlight() {
    return this.store.setActiveApplication(SPOTLIGHT);
  }
}
