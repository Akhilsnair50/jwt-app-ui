import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/user';
import {
  AddUser,
  AddUserSuccess,
  AddUserFailure,
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  DeleteUser,
  DeleteUserSuccess,
  GetImage,
  GetImageSuccess,
} from './user.action';
import { state } from '@angular/animations';
import { AppState } from '../app.state';

export const initialState: AppState = {user:[] , image:[]};

export const UserReducer  = createReducer(
  initialState, // current state

  // actions for adding user
  on(AddUser, (state) => 
    state
  ),

  on(
    AddUserSuccess,
    (state, { userName, userFirstName, userLastName, userPassword }) => {
     
      return {
        ...state,
        user:[
          ...state.user,
          {userName, userFirstName, userLastName, userPassword }
        ],
      };
    }
  ),
  on(AddUserFailure, (state, { error }) => {
    console.error(error);
    return state;
  }),

  //actions for loading users 

  on(loadUsers, (state) => state),

  on(loadUsersSuccess, (state, { user }) => {
    console.log('New state:', { ...state, user }); // Log only relevant parts
    return {...state, user};
  }),

  on(loadUsersFailure, (state, { error }) => {
    console.log(error);
    return state;
  }),

  //actions for deleting user

  on(DeleteUserSuccess, (state, { userName }) => {
    console.log('Updated users after deletion:', state); // Log only relevant part
    return {
      ...state,
      user: state.user.filter(user => user.userName !== userName) 
    };
  }),

  //actions for adding user

  on(GetImageSuccess,(state , {image})=>{
    state.image.forEach(element => {
      console.log(element)
    });
    console.log('state after adding images',state.image)
    
    return{
      ...state,
      image:[...state.image,image]
    }
  })

);
