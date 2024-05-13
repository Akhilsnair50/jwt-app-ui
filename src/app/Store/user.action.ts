import { createAction, props } from '@ngrx/store';
import { User } from '../user';

//to load user actions
export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ user: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

// to create user actions
export const AddUser = createAction('[User] Add User', props<User>());
export const AddUserSuccess = createAction(
  '[User] Add User successfull',
  props<User>()
);
export const AddUserFailure = createAction(
  '[User] Add User Failure',
  props<{ error: any }>()
);

//to delete user actions
export const DeleteUser = createAction(
  '[User] Delete User',
  props<{ userName: string }>()
);

export const DeleteUserSuccess = createAction(
  '[User] Delete User Successfull',
  props<{ userName: string }>()
);

export const DeleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: any }>()
);

//To get Image actions
export const GetImage = createAction(
  '[User] Get User Image',
  props<{ fileName: string }>()
);

export const GetImageSuccess = createAction(
  '[User] Get User Image Success',
  props<{ image: Blob }>()
);

export const GetImageFailure = createAction(
  '[User] Get User Image Failure',
  props<{ error: any }>()
);
