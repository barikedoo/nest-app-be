export const toJson = (data: string) => {
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

export const checkIfMessagedShouldBeIgnored = (data) => {
  return (
    data === 'pong' ||
    ['subscribe', 'unsubscribe'].includes(data?.event) ||
    getTotalLoss(data) <= 10000
  )
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

function getTotalLoss(data) {
  const { bkPx, sz } = getLiquidationDetails(data) || {}

  if (!bkPx || !sz) return 0

  return +bkPx * +sz
}

function formatLiquidationMessage(data) {
  const instrument = data?.data?.[0]
  const details = getLiquidationDetails(data)

  if (!details || !instrument) return 'Cannot format liquidation message'

  const { bkPx, posSide, side, sz } = details
  const { instFamily, instType } = instrument

  return `OKX: Liquidation: ${instFamily} ${instType}. ${posSide.toUpperCase()}. Total loss: ${getTotalLoss(data).toFixed(2)} USDT. ${side.toUpperCase()} ${sz} at price: ${bkPx} USDT.`
}
