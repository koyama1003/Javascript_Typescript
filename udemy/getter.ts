interface Obraz {
  name: string;
}
class Department implements Obraz {
  private lastReport: string;

  get mostRecent() {
    return this.lastReport;
  }
  constructor(public name: string, id: string, private employees: string[]) {
    this.lastReport = employees[0];
  }
  static describe(name: string) {
    return { name: name };
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }
}

console.log(Department.describe("aaa"));
