import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-controls',
  templateUrl: './dialog-controls.component.html',
  styleUrls: ['./dialog-controls.component.scss'],
})
export class DialogControlsComponent implements OnInit {
  maximized = false;
  initialWidth?: string;
  initialHeight?: string;

  constructor(
    private dialogRef: DynamicDialogRef,
    private dailogConfig: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.initialWidth = this.dailogConfig.width;
    this.initialHeight = this.dailogConfig.height;
  }

  close() {
    this.dialogRef.close();
  }

  maximize() {
    console.log('maximize!!');

    this.maximized = !this.maximized;
    this.dailogConfig.width = this.maximized ? '100%' : this.initialWidth;
    this.dailogConfig.height = this.maximized ? '100%' : this.initialHeight;
  }
}
