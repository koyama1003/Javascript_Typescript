import { observable } from "mobx";
class TodoStore {
  @observable todos = ["buy milk", "buy eggs"];
  @observable filter = "";
}
let store = (window.store = new TodoStore());
export default store;
