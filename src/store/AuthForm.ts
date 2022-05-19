import { makeAutoObservable } from "mobx";
import { api } from "../api/api";

class AuthForm {
  username: string = "";
  password: string = "";
  isSending: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  onChange(fieldName: "username" | "password", value: string) {
    this[fieldName] = value;
  }

  async submit() {
    this.isSending = true;
    await api
      .post("/login", {
        username: this.username,
        password: this.password,
      })
      .catch((e) => console.error(e));
    this.isSending = false;
  }
}

export const authForm = new AuthForm();
