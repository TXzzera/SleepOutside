import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems (items){
  const itemList = items.map(item => {
    return {
      id: item.ID,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
  };
  }); 
return itemList;
}

export default class CheckoutProcess {
    constructor(key, outputSelector){
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.OrderTotal = 0;
    }
    init(){
        this.list = getLocalStorage(this.key);
        this.calculateItemSubTotal();
    }

    calculateItemSubTotal() {
       this.itemTotal = this.list.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
  }

  calculateOrderTotal() {
    this.tax = (this.itemTotal * 0.06);
    this.shipping = 10.00 + (this.list.length -1) * 2; 
    this.orderTotal = parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.shipping);
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

async checkout() {
  const formElement = document.querySelector("#checkout-form");
  const order = formDataToJSON(formElement);

  order.orderDate = new Date().toISOString();
  order.items = packageItems(this.list);
  order.tax = this.tax;
  order.shipping = this.shipping;
  order.orderTotal = this.orderTotal;

  try{
    const res = await services.checkout(order);
      console.log(res);

      alert("Order successfully placed!");

      setLocalStorage("so-cart", []);

      setTimeout(() => {
        location.assign("success.html");
    } ,1500);
    
  }catch (err) {
      // get rid of any preexisting alerts.
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }

      console.log(err);
}}}
