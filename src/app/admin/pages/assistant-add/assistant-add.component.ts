import { Component } from '@angular/core';

@Component({
  selector: 'app-assistant-add',
  templateUrl: './assistant-add.component.html',
  styleUrls: ['./assistant-add.component.scss'],
})
export class AssistantAddComponent {
  getAssistantAction(event: { action: string; data: {} }) {
    if (event.action == 'addAssistant')
      console.log('Add assistant', event.data);
  }
}
