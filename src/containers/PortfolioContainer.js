import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  renderStock = (stock) => {
    // let callback = (event) => console.log(stock)
    let callback = (event) => this.props.removeFromPortfolio(stock)
    return <Stock stock={stock} key={stock.id} handleStockClick={callback}/>
  }

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
        {this.props.portfolio.map(elem => this.renderStock(elem))}
      </div>
    );
  }

}

export default PortfolioContainer;
