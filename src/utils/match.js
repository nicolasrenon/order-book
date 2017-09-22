import BigNumber from 'bignumber.js'

export default function matching({ bids, asks }) {
  // Going through every ask
  return asks.reduce((output, [askPrice, askQty, ], position) => {
    askPrice = new BigNumber(askPrice)
    askQty = new BigNumber(askQty)

    const matches = []

    // Check potential of the current ask against all the available bids
    // based on the price
    let availablity = bids
      .filter(([bidPrice]) => {
        bidPrice = new BigNumber(bidPrice)
        return bidPrice.lessThanOrEqualTo(askPrice)
      })
      .reduce((acc, [, qty]) => {
        acc = new BigNumber(acc)
        qty = new BigNumber(qty)
        return acc.plus(qty).toNumber()
      }, 0)

    availablity = new BigNumber(availablity)

    // An ask can only be fulfilled if the matching bids above have enough quantity
    // to cover the need
    if (availablity.greaterThanOrEqualTo(askQty)) {
      const _askQty = askQty.toNumber()
      const matchingBids = []
      let index = 0

      while (askQty.toNumber()) {
        let [bidPrice, bidQty] = bids[index]
        bidPrice = new BigNumber(bidPrice)
        bidQty = new BigNumber(bidQty)

        if (bidPrice.lessThanOrEqualTo(askPrice) && bidQty.toNumber()) {
          let leftover = bidQty.minus(askQty)
          let qty = askQty

          if (leftover.greaterThan(0)) {
            bids[index][1] = leftover.toNumber()
            askQty = new BigNumber(0)
          } else if (leftover.equals(0)) {
            bids[index][1] = 0
            askQty = new BigNumber(0)
          } else {
            qty = bidQty
            bids[index][1] = 0
            askQty = new BigNumber(Math.abs(leftover.toNumber()))
          }

          matchingBids.push({ bid: index, qty: qty.toNumber(), price: bidPrice.toNumber() })
        }

        index++
      }

      matches.push({ ask: position, totalQty: _askQty, bids: matchingBids })
    }

    return [...output, ...matches]
  }, [])
}
