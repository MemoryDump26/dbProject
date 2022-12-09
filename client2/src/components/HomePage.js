import React, {useState} from 'react'
import NavigationBar from './NavigationBar'
import Data from './Data'
import Product from './Product'

const SQLHelper = require('./SQLHelper.js');

export class HomePage2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productData: [],
    }
    this.fetchData = this.fetchData.bind(this);
    this.updateProductData = this.updateProductData.bind(this);
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    let queryString = "SELECT * FROM productdata;"
    SQLHelper.query(queryString, (data) => {this.updateProductData(data)})
  }

  updateProductData(data) {
    console.log(data);
    this.setState({
      productData: data,
    })
  }

  render() {
    return (
      <React.Fragment>
        <NavigationBar/>
        <h1>Products</h1>
        <grid className='Products'>
          {
          this.state.productData.map((item, idx) => {
            return <Product
              id={item.id}
              title={item.name}
              price={item.price}
              desc={item.productDesc}
              img={item.productImageURL}
              item={item}
              key={idx}
              />
          })
        }
        </grid>
      </React.Fragment>
    )
  }
}

export function HomePage() {
  return (
    <React.Fragment>
        <NavigationBar/>
          <h1>Products</h1>
          <grid className='Products'>
          {
            Data.ProductData.map((item, idx) => {
              return <Product
              img={item.img}
              title={item.title}
              desc={item.desc}
              price={item.price}
              item={item}
              key={idx}
              />
            })
          }
          </grid>
      </React.Fragment>
  )
}
