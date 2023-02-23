import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-wifi-control',
  templateUrl: './wifi-control.component.html',
  styleUrls: ['./wifi-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WifiControlComponent {}
