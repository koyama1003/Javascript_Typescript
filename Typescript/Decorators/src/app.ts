const Logger = (logstring: string) => {
  return function (constructor: Function) {
    console.log(logstring);
    console.log(constructor);
  };
};

const withTemplate = (template: string, hookid: string) => {
  return function (_constructor: any) {
    const hookEl = document.getElementById(hookid);

    if (hookEl) {
      hookEl.innerHTML = template;
    }
  };
};

@Logger("logging test")
@withTemplate("<h1>person</h1>", "app")
class Person {
  name = "Max";
  constructor() {
    console.log("called");
  }
}
const Log = (target: any, propertyName: string | Symbol) => {
  console.log("property deco");
  console.log(target, propertyName);
};

const Log2 = (target: any, name: string, descriptor: PropertyDescriptor) => {
  console.log("accesory");
  console.log(target, name, descriptor);
};

const Log3 = (
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) => {
  console.log("method");
  console.log(target, name, descriptor);
};

const Log4 = (target: any, name: string | Symbol, position: number) => {
  console.log("params");
  console.log(target, name, position);
};
class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Error");
    }
  }
  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}
