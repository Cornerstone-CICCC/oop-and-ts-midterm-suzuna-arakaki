import { Component } from "../common/Component.js";
import { Cart } from "./CartList.js";
import { ProductList } from "./ProductList.js";
import { TotalCounter } from "./TotalCounter.js";
import { CartCounter } from "./CartCounter.js";
import { CartContext } from "../contexts/CartContext.js";

export class App extends Component {
  render() {
    const app = document.createElement("div");
    app.classList.add("container");
    app.innerHTML = `
      <div class="header">
        <strong>Number of Products in Cart: </strong>
      </div>
      <main></main>
      <aside class="sidebar"></aside>
      <div class="footer"></div>
    `;

    // Create instances and bind to DOM
    const productList = new ProductList({
      cartContext: this.props.cartContext,
    });
    productList.mount(app.querySelector("main"));

    const cart = new Cart({
      cartContext: this.props.cartContext,
    }).render();
    app.querySelector(".sidebar").appendChild(cart);

    const cartCounter = new CartCounter({
      cartContext: this.props.cartContext,
    }).render();
    app.querySelector(".header").appendChild(cartCounter);

    return app;
  }
}

// export class App extends Component {
//   render() {
//     const container = document.createElement("div");
//     container.className = `container`;
//     container.innerHTML = `
//     <h1>My Shop List</h1>
//     <div id="cart-list-wrapper"></div>
//     <div id="product-list-wrapper"></div>
//     `;

//     const cart = new CartList({ CartContext: this.props.CartContext }).render();
//     const product = new ProductList({
//       CartContext: this.props.CartContext,
//     }).render();

//     // container.querySelector("#cart-list-wrapper").appendChild(cart);
//     container.querySelector("#product-list-wrapper").appendChild(product);

//     return container;
//   }
// }
