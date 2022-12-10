import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-assistant-add',
  templateUrl: './assistant-add.component.html',
  styleUrls: ['./assistant-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantAddComponent {
  getAssistantAction(event: { action: string; data: {} }) {
    if (event.action == 'addAssistant')
      console.log('Add assistant', event.data);
  }
}
