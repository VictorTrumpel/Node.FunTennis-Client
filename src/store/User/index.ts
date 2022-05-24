import { makeAutoObservable } from "mobx";
import { api } from "@api/api";

class User {
  isAuthorized = false;
  isPendingAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  async logout() {
    this.isPendingAuth = true;
    this.isAuthorized = false;
    await api.get("/logout").catch((e) => {
      console.error(e);
    });
    this.isPendingAuth = false;
  }

  async auth() {
    this.isPendingAuth = true;
    try {
      await api.get("/auth");
      this.isAuthorized = true;
    } catch (e) {
      this.isAuthorized = false;
    }
    this.isPendingAuth = false;
  }
}

export const user = new User();
