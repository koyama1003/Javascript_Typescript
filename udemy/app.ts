interface Todo_I {
  title: string;
  body?: string;
  describe(): void;
}

class Todo implements Todo_I {
  constructor(
    public title: string,
    public body: string,
    private detail: string
  ) {}

  get getTitle(): string {
    return this.title;
  }
  set setDetail(value: string) {
    this.detail = value;
  }
  describe() {
    console.log(this.title, this.detail);
  }
}
class ExTodo extends Todo {
  constructor(title: string, detail: string) {
    super(title, detail);
  }
}
const testing = new Todo("test", "body", "desc");
console.log(testing);
testing.setDetail = "rwa";
console.log(testing);
const genericstest = <T extends Todo>(arg: T): T => {
  console.log(arg.title);
  return arg;
};
genericstest(testing);
