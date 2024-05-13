import { Store } from "@ngrx/store";
import { User } from "../user";
import { OnInit } from "@angular/core";
import { Observable } from "rxjs";

export class Test implements OnInit{
  constructor(private store:Store<User>){

  }
  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.store.dispatch(this.getUsers)
  }

  observable:Observable<any> = new Observable();
  
  sub(){
    this.observable.subscribe({
      next:(next)=>{

      },
    })
  }
}