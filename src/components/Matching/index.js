import React from 'react'
import BigNumber from 'bignumber.js'

import './index.css'

const Matching = ({ results }) =>
  <table className="Matching">
    <thead>
      <tr>
        <th>Buyer (#)</th>
        <th>Quantity</th>
        <th>From</th>
        <th>Total cost ($)</th>
      </tr>
    </thead>
    <tbody>
    {
      results.map(({ ask, totalQty, bids }) =>
        <tr key={ask}>
          <td>{ask}</td>
          <td>{totalQty}</td>
          <td>{`${bids.length} seller${bids.length > 1 ? 's' : ''}`}</td>
          <td>
          {
            bids.reduce((acc, { qty, price }) => {
              acc = new BigNumber(acc)
              qty = new BigNumber(qty)
              price = new BigNumber(price)
              const add = acc.plus(qty.times(price)).toNumber()
              return parseFloat(Math.round(add * 100) / 100).toFixed(2)
            }, 0)
          }
          </td>
        </tr>
      )
    }
    </tbody>
  </table>

export default Matching
