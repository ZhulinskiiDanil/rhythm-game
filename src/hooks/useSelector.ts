import { RootState, store } from "@/store";

export const useSelector = function <T>(cb: (state: RootState) => T) {
  return cb(store.getState())
}