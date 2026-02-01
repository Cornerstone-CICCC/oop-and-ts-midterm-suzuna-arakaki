import { Component } from "../common/Component.js";
import { TotalCounter } from "./TotalCounter.js";
import { CartItem } from "./CartItem.js";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
    this.updateCart = this.updateCart.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.props.cartContext.subscribe(this.updateCart);
    // this.props.cartContext.subscribe(this.handleIncrement);
    // If i put this code why this will be infinity excuted...
    this.productListElement = null;
    this.totalElement = null;
  }

  handleDecrement(id) {
    this.props.cartContext.decrementProduct(id);
  }

  handleIncrement(id) {
    this.props.cartContext.incrementProduct(id);
  }

  handleDelete(id) {
    this.props.cartContext.deleteCart(id);
  }

  updateCart(cart) {
    // listener method
    this.state.cart = cart; // update local cart state
    this.productListElement.innerHTML = ""; // clear the html list
    this.state.cart.forEach((product) => {
      const li = document.createElement("li");
      li.innerHTML = `
      <img src="${product.image}">
      <span class="cart-name">${product.title}</span>
      <span class="cart-price">$ ${product.price}</span>
      <div>
        <button class="decrement-btn">-</button>
        <span class="cart-quantity">${product.quantity}</span>
        <button class="increment-btn">+</button>
      </div>
      `;

      const decrementBtn = document.getElementsByClassName("decrement-btn");
      const incrementBtn = document.getElementsByClassName("increment-btn");
      const deleteBtn = document.createElement("button");
      decrementBtn.textContent = "-";
      incrementBtn.textContent = "+";
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
      li.appendChild(deleteBtn);

      this.productListElement.appendChild(li);

      li.querySelector(".decrement-btn").addEventListener("click", () => {
        this.handleDecrement(product.id);
      });

      li.querySelector(".increment-btn").addEventListener("click", () => {
        this.handleIncrement(product.id);
      });

      li.querySelector(".delete-btn").addEventListener("click", () => {
        // console.log("Delete Btn Clicked:", product.id);
        this.handleDelete(product.id);
      });
    });
  }

  render() {
    const cartElement = document.createElement("div");
    cartElement.innerHTML = `
      <div>
        <h3>Cart</h3>
        <div class="total-sum">Total: $ </div>
      </div>
      <ul class="cart-items">
      </ul>
    `;

    this.productListElement = cartElement.querySelector(".cart-items");
    const totalCounter = new TotalCounter({
      cartContext: this.props.cartContext,
    }).render();
    cartElement.querySelector(".total-sum").appendChild(totalCounter);

    return cartElement;
  }
}
