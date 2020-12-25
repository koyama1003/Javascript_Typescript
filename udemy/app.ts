class Department {
  protected employees: string[] = [];
  constructor(private readonly id: string, public name: string) {}
  describe(this: Department) {
    console.log(`Department: (${this.id}):${this.name}`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployee() {
    console.log(this.employees);
    console.log(this.employees.length);
  }
}

class ITDepartment extends Department {
  constructor(id: string, private admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}
class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "Account");
    this.reports = reports;
  }
  addReport(text: string) {
    this.reports.push(text);
  }
  printReport() {
    console.log(this.reports);
  }
}
const IT = new ITDepartment("d1", ["Max"]);
const Accounting = new AccountingDepartment("d2", []);
Accounting.addReport("something");
Accounting.printReport();
console.log(Accounting);
console.log(IT);
IT.describe();
IT.addEmployee("Max");
IT.addEmployee("Me");
IT.printEmployee();
