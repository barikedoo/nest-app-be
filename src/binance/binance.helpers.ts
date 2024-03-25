export const toJson = (data: string) => {
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

export function checkIfMessagedShouldBeIgnored(data) {
  // Ignore if no event is specified or total loss is less than 100 USDT
  return !data.e || calcTotalLoss(data) <= 100000
}

function calcTotalLoss(data) {
  const { z: size = 0, p: price = 0 } = data.o

  return Number(size) * Number(price)
}

export function formatWsMessage(data) {
  switch (data.e) {
    case 'forceOrder':
      return formatLiquidationMessage(data)

    default:
      return data
  }
}

function formatLiquidationMessage(data) {
  if (!data.o) return 'Cannot format liquidation message'

  const { s: instrument, S: side, z: size, o: type, p: price } = data?.o

  return `Binance: Liquidation: ${instrument} ${type}. ${side.toUpperCase()}. Total loss: ${calcTotalLoss(data).toFixed(2)} USDT. ${side.toUpperCase()} ${size} at price: ${price} USDT.`
}
