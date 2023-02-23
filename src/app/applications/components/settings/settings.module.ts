import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { AirdropControlComponent } from './airdrop-control/airdrop-control.component';
import { BluetoothControlComponent } from './bluetooth-control/bluetooth-control.component';
import { FocusControlComponent } from './focus-control/focus-control.component';
import { KeyboardBrightnessControlComponent } from './keyboard-brightness-control/keyboard-brightness-control.component';
import { MusicControlComponent } from './music-control/music-control.component';
import { ScreenMirroringControlComponent } from './screen-mirroring-control/screen-mirroring-control.component';
import { WifiControlComponent } from './wifi-control/wifi-control.component';

@NgModule({
  declarations: [
    SettingsComponent,
    AirdropControlComponent,
    BluetoothControlComponent,
    FocusControlComponent,
    KeyboardBrightnessControlComponent,
    MusicControlComponent,
    ScreenMirroringControlComponent,
    WifiControlComponent,
  ],
  imports: [CommonModule],
  exports: [
    SettingsComponent,
    AirdropControlComponent,
    BluetoothControlComponent,
    FocusControlComponent,
    KeyboardBrightnessControlComponent,
    MusicControlComponent,
    ScreenMirroringControlComponent,
    WifiControlComponent,
  ],
})
export class SettingsModule {}
