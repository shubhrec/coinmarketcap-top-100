import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket!: Socket;

  constructer(){
    
  }

  //setup the socket connection and return a observable
  setupSocketConnection() {
    this.socket = io('', { path :environment.SOCKET_ENDPOINT});
    return new Observable(observer => {
      this.socket.on('data_refresh', msg => {
        observer.next(msg);
      });
    });
  }
  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
}

}
