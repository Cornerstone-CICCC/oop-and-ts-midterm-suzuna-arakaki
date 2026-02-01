import { Component } from "../common/Component.js";
// import { CartCounter } from "./CartCounter.js";

export class TotalCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
    this.calculateTotal = this.calculateTotal.bind(this);
    this.props.cartContext.subscribe(this.calculateTotal);
    this.calculateTotalElement = null;
  }

  calculateTotal(cart) {
    this.state.cart = cart;
    const fixedTotal = this.state.cart.reduce(
      (total, acc) => total + acc.quantity * acc.price,
      0,
    );
    this.calculateTotalElement.textContent = Math.round(fixedTotal * 100) / 100;
    // toFixed returns string
    // this.calculateTotalElement.textContent = fixedTotal.toFixed(2);
  }

  render() {
    const calcTotal = document.createElement("span");
    calcTotal.textContent = 0;
    this.calculateTotalElement = calcTotal;

    return calcTotal;
  }
}

// const fixedTotal = this.calculateTotalElement.innerHTML;
// fixedTotal.toFixed(2);
// console.log(fixedTotal);
// console.log(this.calculateTotalElement.innerHTML);
// this.calculateTotalElement.innerHTML.toFixed(2);
// this.calculateTotalElement.innerHTML = fixedTotal;
// const fixedTotal = this.state.cart.reduce(
//   (total, acc) => (total + acc.quantity * acc.price).toFixed(2),
//   0,
// );
