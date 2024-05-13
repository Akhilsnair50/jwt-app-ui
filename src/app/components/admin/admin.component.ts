import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AddUser, loadUsers } from 'src/app/Store/user.action';
import { AppState } from 'src/app/app.state';
import { selectUsers } from 'src/app/Store/user.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  faTimes = faTimes;
  faEdit = faEdit;
  isAddingUser:boolean = false;

  userList: User[] = [];
  filteredUsers: User[] = [];

  searchTerm: string = '';

  registerForm!:FormGroup
  //ngrx
  users$:Observable<any>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private userService:UserService
  ) {
    this.users$ = of();
  }

  ngOnInit(): void {

    this.store.dispatch(loadUsers());
    this.users$ = this.store.select(selectUsers);

    this.users$.subscribe({
      next:(user)=> {
        this.userList = user.user;
        this.filteredUsers = user.user;
      }
    }
    )

    this.registerForm = this.fb.group({
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userName: ['', Validators.required],
      userPassword: ['', Validators.required],
    });
  }



  searchUsers() {
    this.filteredUsers = this.userList.filter((user) =>
      user.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
      ||
      user.userFirstName.toLowerCase().includes(this.searchTerm.toLowerCase())
      ||
      user.userLastName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  refreshData(event: any) {}

  isAdding(){
    this.isAddingUser =!this.isAddingUser
  }

  //ngrx start here

  addUser(
    userName: string,
    userPassword: string,
    userFirstName: string,
    userLastName: string
  ) {
    this.store.dispatch(
      AddUser({ userName, userPassword, userFirstName, userLastName })
    );
  }


  checkUserName() {
    const userName = this.registerForm.get('userName')?.value;

    if (userName) {
      this.userService
        .isUserNameAvailable(userName)
        .subscribe((isAvailable) => {
          if (isAvailable) {
            this.submitUser();/// I submitted the form if no other users exists
          } else {
            isAvailable = false;
            Swal.fire('Username is not available');
          }
        });
    }
  }


  submitUser(){

    const userName = this.registerForm.get('userName')?.value;
    const userPassword = this.registerForm.get('userPassword')?.value;
    const userFirstName = this.registerForm.get('userFirstName')?.value;
    const userLastName = this.registerForm.get('userLastName')?.value;

    this.store.dispatch(AddUser({userName,userPassword,userFirstName,userLastName}))
    
   
  }
}
