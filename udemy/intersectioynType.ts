interface Admin {
  name: string;
  privilages: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

interface ElevatedEmployees extends Employee, Admin {}
