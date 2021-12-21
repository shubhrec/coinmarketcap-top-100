import { compileNgModuleDeclarationExpression } from '@angular/compiler/src/render3/r3_module_compiler';
import { Component, OnInit } from '@angular/core';
import { GuiColumn } from '@generic-ui/ngx-grid';
import { SocketioService } from './socketio.service';
import { keyable } from './keyable.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private socketService: SocketioService) {
  }

  
  source: Array<any> = [];
  columns: Array<GuiColumn> = [];
  jsonData: Array<any> = [];
  ngOnInit(){
    this.socketService.setupSocketConnection().subscribe((msg) => {
      
      this.setSourceAndColumnsForGrid(msg)
      // console.log(this)
      // console.log('got a msg: ' + JSON.stringify(msg));
      // this.classScope.test = msg
    });
  }
  ngOnDestroy() {
    this.socketService.disconnect();
  }

  setSourceAndColumnsForGrid(msg:any){

    console.log(typeof(msg), msg)
    this.columns = msg.columns.map((column : string)=>{
      return {header : column , field : column}
    })
    this.source = msg.data.map((coin: keyable)=>{

      return{

        "#" : coin['#'],
        "Name" : `${coin.Name}(${coin.Symbol})`,
        "Price" : this.formatCurrency(this.formatNumbers(this.roundOffNumber(coin.Price.toString()))),
        "Volume (24h)" : this.formatCurrency(this.formatNumbers(this.roundOffNumber(coin["Volume (24h)"].toString()))) ,
        "24h %" : this.roundOffNumber(coin["24h %"].toString()),
        "7d %" : this.roundOffNumber(coin["7d %"].toString()),
        "Market Cap": this.formatCurrency(this.formatNumbers(this.roundOffNumber(coin["Market Cap"].toString()))) ,


      }
    
    })

  }

  roundOffNumber(val : string){
    if(parseInt(val)> 1) return val.slice(0,val.indexOf(".") + 3)

    else{
      for(let i=0 ; i < val.length ;i++){
        if(val[i] != "0" && val[i] != "-" ) return val.slice(0,i+3)
      }
    }
    return val;

  }

  formatCurrency(val: string){
    return "$" + val
  }

  formatNumbers(val : string){
    return parseFloat(val).toLocaleString("en-US")
  }

  formatProfitLoss(val: string){
    return parseFloat(val) > 1 ? `<p style="color: #4caf50"> ${val} </p>` : `<p style="color: #ff0000"> ${val} </p>` 
  }

}
