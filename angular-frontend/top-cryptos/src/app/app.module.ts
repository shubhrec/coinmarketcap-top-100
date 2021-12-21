import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GuiGridModule } from '@generic-ui/ngx-grid';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketioService } from './socketio.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GuiGridModule
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
