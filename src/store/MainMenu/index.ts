import { MainMenuItems } from "@store/MainMenu/@types";
import { makeAutoObservable } from "mobx";

export class MainMenu {
  protected _activeTab: string = "";

  constructor(readonly menuItems: MainMenuItems) {
    makeAutoObservable(this);
    this.menuItems = menuItems;
  }

  set activeTab(url: string) {
    this._activeTab = url;
  }

  get activeTab(): string {
    return this._activeTab;
  }
}

export const mainMenu = new MainMenu([
  {
    url: "/main",
    label: "Главная",
  },
  {
    url: "/add",
    label: "Добавить участника",
  },
  {
    url: "/users",
    label: "Все участники",
  },
  {
    url: "/create",
    label: "Добавить тренировку",
  },
]);
