import React, {useState} from 'react'
import { useCart } from 'react-use-cart';
import NavigationBar from './NavigationBar';
import './design.css'

const SQLHelper = require('./SQLHelper.js');

let productInCart = [];


function Cart() {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart
  } = useCart();

  if(isEmpty){
    return(
      <body>
        <NavigationBar/>
        <h1>Cart is Empty</h1>
      </body>
    )
  }

  return (
  <div className='cart'>
    <head>
      <title>Cart</title>
      <link rel='stylesheet' href='design.css'></link>
    </head>
    <body>
      <NavigationBar/>
      <h1>CART</h1>
      <section className="py-4 container">
      <div className="row justify-content-center">
        <div className="col-12">
          <h5>
            Cart ({totalUniqueItems}) total Items: ({totalItems})
          </h5>
          <br />
          <table className="table table-light table-hover m-0">
            <tbody>
              <tr>
                <td style={{ padding: "0px 100px 0px 10px" }}>
                  <b>Product</b>
                </td>
                <td style={{ padding: "0px 100px 0px 10px" }}>
                  <b>Name</b>
                </td>
                <td style={{ padding: "0px 50px 0px 0px" }}>
                  <b>Price</b>
                </td>
                <td style={{ padding: "0px 50px 0px 0px" }}>
                  <b>Quantuty</b>
                </td>
              </tr>
              {items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={item.productImageURL} style={{ height: "6rem" }} alt="" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td> {item.quantity}</td>
                    <td>
                      <button
                        style={{ border: "2px solid red" }}
                        className="btn btn-light ms-2"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        –
                      </button>
                      <button
                        style={{ border: "2px solid #fcba03" }}
                        className="btn btn-light ms-2"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        className="btn btn-dark ms-2"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove Item
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <hr />
        <br />
        {/* <div> */}
        <div className="col-auto ms-auto">
          <h3>Total Price: {cartTotal}000vnd</h3>
        </div>
        <div className="col-auto ms-auto">
          <button className="btn btn-danger m-2" onClick={() => emptyCart()}>
            Clear Cart
          </button>
          <button className="btn btn-primary m-2" onClick={() => {saveOrder(items)}}>Pay Now</button>
        </div>
        {/* </div> */}
      </div>
    </section>
    </body>
  </div>
  )
}

function saveOrder(items) {
  let insertPart = "insert into orders(orderDate, userName) ";
  let valuesPart = "values (now(),'" + localStorage.getItem("user") + "')";
  let queryString = insertPart + valuesPart;
  SQLHelper.query(queryString, (data) => {
    let orderID = data.insertId;
    items.map((singleItem) => {
      insertPart = "insert into orderdetails(orderID, productID, quantityOrdered, priceEach) ";
      valuesPart = "values (";
      valuesPart += orderID + ",";
      valuesPart += singleItem.id + ",";
      valuesPart += singleItem.quantity + ",";
      valuesPart += singleItem.price + ")";
      queryString = insertPart + valuesPart;
      SQLHelper.query(queryString);
    });
  });

}

export default Cart
