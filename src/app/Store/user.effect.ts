import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userActions from './user.action';
import { AdminServiceService } from '../services/admin-service.service';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private adminService: AdminServiceService,
    private userService: UserService
  ) {}

  //for loading users
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUsers),
      mergeMap(() =>
        this.adminService.getUsers().pipe(
          map((user) => userActions.loadUsersSuccess({ user })),
          catchError((error) => of(userActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  //NgRx effect that respond to 'AddUser' actions.
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      //Listens for actions of type 'AddUser'
      ofType(userActions.AddUser),

      //For each AddBook action, call AddUser on the service corresponding to it
      //merge map allows multiple concurrent AddUser calls
      switchMap((action) =>
        this.adminService.addUser(action).pipe(
          //if the 'addUser' in service call is successfull , dispatch 'AddUserSuccess' action with user data.
          map((user) => userActions.AddUserSuccess(user)),

          //if the 'addUser' call fails , dispatch 'AddUserFailure' action with the error.
          catchError((error) => of(userActions.AddUserFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.DeleteUser),
      mergeMap(({ userName }) =>
        this.adminService.deleteUser(userName).pipe(
          map(() => userActions.DeleteUserSuccess({ userName })),
          catchError((error) => of(userActions.DeleteUserFailure({ error })))
        )
      )
    )
  );

  loadUserImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.GetImage),
      mergeMap((action) =>
        this.userService.getImage(action.fileName).pipe(
          // tap(blob=> {
          //   const imageUrl = URL.createObjectURL(blob);
          //   console.log(imageUrl);
          // }),
          map((blob) => userActions.GetImageSuccess({ image:blob })),
          catchError((error) => of(userActions.GetImageFailure({ error })))
        )
      )
    )
  );

  
}
