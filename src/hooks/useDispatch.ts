import { store } from "@/store";
import { Dispatch } from "@reduxjs/toolkit";

export const useDispatch = (): Dispatch => {
  return store.dispatch
}