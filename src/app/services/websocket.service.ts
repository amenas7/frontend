import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { filter, map, mergeAll } from 'rxjs/operators';
import { from } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;

  constructor( private socket: Socket,
    private router: Router,
    private http: HttpClient ) {
      this.checkStatus();

     }

     checkStatus() {

      this.socket.on('connect', () => {
        //console.log('Conectado al servidor');
        this.socketStatus = true;
      });

      this.socket.on('disconnect', () => {
        //console.log('Desconectado del servidor');
        this.socketStatus = false;
      });
    }

    // emitir todo tipo de eventos que pueda disparar angular
    emit( evento: string, payload?: any, callback?: Function ) {

      //console.log('Emitiendo', evento);
      // emit('EVENTO', payload, callback?)
      this.socket.emit( evento, payload, callback );

    }

    listen( evento: string ) {
      return this.socket.fromEvent( evento );
    }


}
