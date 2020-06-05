import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  renderStock = (stock) => {
    // let callback = (event) => console.log(stock)
    let callback = (event) => this.props.addToPortfolio(stock)
    if (this.props.filter && stock.type != this.props.filter) return null
    return <Stock stock={stock} key={stock.id} handleStockClick={callback}/>
  }

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.props.stocks.map(elem => this.renderStock(elem))}
      </div>
    );
  }

}

export default StockContainer;
