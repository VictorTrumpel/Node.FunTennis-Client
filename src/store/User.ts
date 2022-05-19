import { makeAutoObservable } from "mobx";

class User {
  public name: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setName(name: string) {
    this.name = name;
  }
}

export const user = new User();
