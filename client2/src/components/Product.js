import React from "react";
import { useCart } from "react-use-cart";

const Product = (props) => {
  const { addItem } = useCart();

  return (
    <div className="Product">
      <div className="card p-0 overflow-hidden h-100 shadow">
        <div className="img-container">
          <img src={props.img} className="card-img-top img-fluid" alt={props.title} />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{props.title}</h5>
          <h4 className="card-text">{props.price}000vnd</h4>
          <p className="card-text">{props.desc}</p>
            
          <button
            className="btn btn-success"
            onClick={() => addItem(props.item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
