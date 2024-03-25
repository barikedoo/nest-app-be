export default {
  // Liquidations
  [JSON.stringify({
    op: 'subscribe',
    args: [
      {
        channel: 'liquidation-orders',
        instType: 'FUTURES',
      },
    ],
  })]: (data) => {
    console.log('Liquidation signal', data)
  },

  [JSON.stringify({
    op: 'subscribe',
    args: [
      {
        channel: 'liquidation-orders',
        instType: 'MARGIN',
      },
    ],
  })]: (data) => {
    console.log('Liquidation signal', data)
  },
  [JSON.stringify({
    op: 'subscribe',
    args: [
      {
        channel: 'liquidation-orders',
        instType: 'OPTION',
      },
    ],
  })]: (data) => {
    console.log('Liquidation signal', data)
  },
  // Open Interest
  // [JSON.stringify({
  //   op: 'subscribe',
  //   args: [
  //     {
  //       channel: 'open-interest',
  //       instId: 'BADGER-USD-SWAP',
  //     },
  //   ],
  // })]: (data) => {
  //   console.log('Open Interest signal', data)
  // },
}
