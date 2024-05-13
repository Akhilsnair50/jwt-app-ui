import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { User } from "../user";

export const selectAppState = (state:AppState):AppState=>state;


export const selectUsers = (state: AppState): User[] => state.user;


export const selectUserImage = (state:AppState):Blob[]|undefined => state.image;