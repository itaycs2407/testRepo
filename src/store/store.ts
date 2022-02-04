import { makeAutoObservable, runInAction } from "mobx";
import { UsersData } from "../types/users";
import axios from "axios";

class Store {
  toasts: Array<string> = [];
  rawData: UsersData = [];
  filteredUsers: UsersData = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchRawData = () => {
    axios.get("./assets/users.json").then((res) => {
      runInAction(() => {
        this.rawData = res.data;
        this.filteredUsers = res.data;
      });
    });
  };

  getUsersData = () => {
    return this.rawData;
  };

  setFiltered = (filtered: UsersData) => {
    this.filteredUsers = filtered;
  };

  getFilteredUsersData = () => {
    return this.filteredUsers;
  };
}

export default new Store();
