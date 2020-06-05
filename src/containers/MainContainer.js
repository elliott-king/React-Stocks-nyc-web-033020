import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

URL = 'http://localhost:3000/stocks'

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolio: [],
    isAlphaSort: false,
    isPriceSort: false,
    filter: '',
  }

  sortedStocks = (method) => {
    let copy = [...this.state.stocks]
    if (method == 'Price') return copy.sort((a, b) => a.price - b.price)
    else return copy.sort((a, b) => {
      const aName = a.ticker.toLowerCase()
      const bName = b.ticker.toLowerCase()
      if (aName < bName) return -1
      else return 1
    })
  }

  componentDidMount() {
    fetch(URL)
    .then(res => res.json())
    .then(stocks => this.setState({stocks: stocks}))
  }

  addToPortfolio = (stock) => {
    if (!this.state.portfolio.includes(stock)) this.setState({portfolio: [...this.state.portfolio, stock]})
    console.log(stock)
  }

  removeFromPortfolio = (stock) => {
    let nPort = []
    this.state.portfolio.forEach(elem => {
      if (elem != stock) nPort.push(elem)
    })
    this.setState({portfolio: nPort})
  }

  handleRadioButtonChange = (event) => {
    event.persist()
    let s = {isPriceSort: false, isAlphaSort: false}
    if (event.target.value == 'Price') {
      this.setState({isPriceSort: true, isAlphaSort: false, stocks: this.sortedStocks('Price')})
    } else {
      this.setState({isPriceSort: false, isAlphaSort: true, stocks: this.sortedStocks('Alphabetically')})
    }
  }

  handleFilterChange = event => {
    event.persist()
    this.setState({filter: event.target.value})
  }

  render() {
    return (
      <div>
        <SearchBar 
          isAlphaSort={this.state.isAlphaSort}
          isPriceSort={this.state.isPriceSort}
          radioButtonChange={this.handleRadioButtonChange}
          filterChange={this.handleFilterChange}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.stocks} addToPortfolio={this.addToPortfolio} filter={this.state.filter}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.portfolio} removeFromPortfolio={this.removeFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
