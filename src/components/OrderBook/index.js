import React, { Component } from 'react'
import './index.css'

import { getProducts } from '../../utils/api'
import match from '../../utils/match'

import Matching from '../Matching'

class OrderBook extends Component {
  state = { results: [] }

  componentDidMount() {
    const url = getProducts({ id: 'BTC-USD', view: 'book', params: { level: 2 } })
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.time('Matching')
        const results = match(data)
        console.timeEnd('Matching')
        this.setState({ results })
        console.log(results)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="OrderBook">
        <div className="OrderBook-header">
          <h2>Order Book</h2>
        </div>
        <Matching results={this.state.results} />
      </div>
    )
  }
}

export default OrderBook
