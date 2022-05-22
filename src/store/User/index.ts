import { makeAutoObservable } from "mobx";
import { UserInfo } from "./@types";

class User {
  isAuthorized = false;
  isPendingAuth = false;
  userInfo: UserInfo = null;

  constructor() {
    makeAutoObservable(this);
  }

  async auth() {
    this.isPendingAuth = true;
    try {
      this.isAuthorized = true;
    } catch (e) {
      this.isAuthorized = false;
      console.log(e);
    }
    this.isPendingAuth = false;
  }
}

export const user = new User();
