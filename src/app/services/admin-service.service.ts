import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable ,of,throwError } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  PATH_OF_API = 'http://localhost:9090';

  private editedSubject:BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null)

  constructor(private httpClient:HttpClient) { }

  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.PATH_OF_API+'/getUsers')
  }

  getEditedUser():Observable<User|null>{
    return this.editedSubject.asObservable()
  }

  deleteUser(userName:string){
    return this.httpClient.delete(this.PATH_OF_API+`/delete/${userName}`);
  }


  ///ngrx 

  addUser(user:User):Observable<User>{
    return this.httpClient.post<User>(this.PATH_OF_API+"/registerNewUser",user)
  }

  

}
