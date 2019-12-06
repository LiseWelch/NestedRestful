import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  tasks = [];
  curtask;

  constructor(private _httpService: HttpService){
    
  }

  ngOnInit(){
  }

  GetAllTasksBtn(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      this.tasks = data['tasks'];
    })
  }

    GetTaskDetail(id: string): void {
      let observable = this._httpService.getTask(id);
      observable.subscribe(data => {
        console.log(data);
        this.curtask = data['task'][0];
      })
    }
}
