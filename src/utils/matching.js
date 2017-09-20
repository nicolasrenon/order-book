export default function matching({ bids, asks }) {
  return asks.reduce((output, [askPrice, askQty, ], position) => {
    const matches = []

    const availablity = bids
        .filter(([bidPrice]) => bidPrice <= askPrice)
        .reduce((acc, [, qty]) => acc + qty, 0)

    if (availablity >= askQty) {
      bids.forEach(([bidPrice, bidQty], index) => {
        if (bidPrice <= askPrice) {
          while(bids[index][1] && askQty) {
            bids[index][1] -= 1
            matches.push({ ask: position, bid: index })
            askQty--
          }
        }
      })
    }

    return [...output, ...matches]
  }, [])
}
