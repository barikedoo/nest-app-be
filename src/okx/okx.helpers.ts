export const toJson = (data: string) => {
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

export const checkIfMessagedShouldBeIgnored = (data) => {
  if (
    data === 'pong' ||
    ['subscribe', 'unsubscribe'].includes(data?.event) ||
    Number(getLiquidationDetails(data)?.bkLoss) <= -10000
  ) {
    return true
  }

  return false
}

function getLiquidationDetails(data) {
  return data?.data?.[0]?.details?.[0]
}

function getMessageChannel(data) {
  return data.arg?.channel
}

export function formatWsMessage(data) {
  const channel = getMessageChannel(data)

  switch (channel) {
    case 'liquidation-orders':
      return formatLiquidationMessage(data)

    default:
      return data
  }
}

function formatLiquidationMessage(data) {
  const instrument = data?.data?.[0]
  const details = getLiquidationDetails(data)

  if (!details || !instrument) return 'Cannot format liquidation message'

  const { bkLoss, bkPx, posSide, side, sz } = details
  const { instFamily, instType } = instrument

  return `OKX: Liquidation: ${instFamily} ${instType}. ${posSide.toUpperCase()}. Total loss: ${Number(bkLoss).toFixed(2)} USDT. ${side.toUpperCase()} ${sz} at price: ${bkPx} USDT.`
}
