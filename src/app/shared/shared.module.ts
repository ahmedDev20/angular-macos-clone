import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiModule } from '../shared-ui/shared-ui.module';
import { ClockComponent } from './components/clock/clock.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';

import {
  DialogService,
  DynamicDialogRef,
  DynamicDialogConfig,
} from 'primeng/dynamicdialog';

@NgModule({
  declarations: [ClockComponent, ContextMenuComponent],
  imports: [CommonModule, SharedUiModule],
  exports: [SharedUiModule, ClockComponent, ContextMenuComponent],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig],
})
export class SharedModule {}
