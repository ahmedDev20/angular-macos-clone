import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TerminalService } from 'primeng/terminal';
import { TerminalCommand } from 'src/app/shared/config/terminal-commands';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  providers: [TerminalService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalComponent {
  constructor(private terminalService: TerminalService) {
    this.terminalService.commandHandler.subscribe((command) => {
      const response = this.getCommandResponse(command);
      this.terminalService.sendResponse(response);
    });
  }

  getCommandResponse(command: string) {
    switch (command) {
      case TerminalCommand.Author:
        return 'Ahmed Balady';
      case TerminalCommand.UI:
        return 'PrimeNG';
      case TerminalCommand.Framework:
        return 'Angular';
      default:
        return 'Uknown command';
    }
  }
}
