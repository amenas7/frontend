import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';

import { WebsocketService } from './../services/websocket.service';
import { ChatService } from './../services/chat.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(
    private settingsService: SettingsService,
    public wsService: WebsocketService,
    public chatService: ChatService
     ) { }

  ngOnInit(): void {
    customInitFunctions();
    //this.chatService.sendMessage('Holi desde Angular...');
  }

}
