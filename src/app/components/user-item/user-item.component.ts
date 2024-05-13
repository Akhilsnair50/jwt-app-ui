import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
// import { selectUserImage } from 'src/app/Store/images/image.selector';
import { DeleteUser, GetImage } from 'src/app/Store/user.action';
import { AppState } from 'src/app/app.state';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent implements OnInit {
  @Input() user!: User;
  @Output() onEdit: EventEmitter<User> = new EventEmitter();
  @Output() afterEdit: EventEmitter<any> = new EventEmitter();

  isEditing: boolean = false;
  editingUser: User | null = null;
  imageSrc: string | undefined;

  faTimes = faTimes;
  faEdit = faEdit;

  imageUrls: string[] = [];
  imageSubscription: Subscription | null = null;


  constructor(
    private store:Store<AppState>,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    const userImage = this.user.image;
    // if(userImage){
    //   this.store.dispatch(GetImage({fileName:userImage}));
    // }

    if (userImage) {
      this.userService.getImage(userImage).subscribe((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageSrc = reader.result as string;
        };
        reader.readAsDataURL(blob);
      });
    } else {
      this.imageSrc = '../../../assets/defaultuser.png';
    }
  }
  onEditUser(user: User) {
    this.isEditing = !this.isEditing;
    this.editingUser = this.isEditing ? user : null;
  }
  closeEdit(event:boolean){
    this.isEditing = !this.isEditing;
    this.afterEdit.emit(this.user);
    console.log('hi there')
  }
  close(){
    this.isEditing = !this.isEditing
  }

  deleteUser(){
    Swal.fire({
      title:`Are you sure you want to delete ${this.user.userName}`,
      text:'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(
      (result)=>{
        if(result.isConfirmed){
          this.store.dispatch(DeleteUser({userName:this.user.userName}));
        }
      }
    )
  }
}
