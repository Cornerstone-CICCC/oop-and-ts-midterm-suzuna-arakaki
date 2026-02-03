import { Component } from "../common/Component.js";

export class ProductListItem extends Component {
  constructor(props) {
    super(props);
  }

  handleAddToCart() {
    this.props.cartContext.addProduct(this.props.product);
  }

  render() {
    const item = document.createElement("li");
    item.innerHTML = `
      <img src="${this.props.product.image}" alt="${this.props.product.title}">

      <span class="product-title">${this.props.product.title}</span>
      <span class="product-description">${this.props.product.description}</span>
      <span class="product-price">$ ${this.props.product.price}</span>
      <button class="add-to-cart-btn">Add to Cart</button>
    `;

    item
      .querySelector(".add-to-cart-btn")
      .addEventListener("click", () => this.handleAddToCart());

    return item;
  }
}
