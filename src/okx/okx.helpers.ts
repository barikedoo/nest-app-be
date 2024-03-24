const toJson = (data: string) => {
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

export const checkIfMessagedShouldBeIgnored = (data) => {
  if (
    toJson(data) === 'pong' ||
    ['subscribe', 'unsubscribe'].includes(toJson(data)?.event) ||
    getLiquidationDetails(data)?.bkLoss === '0'
  ) {
    return true
  }

  return false
}

function getLiquidationDetails(data) {
  return toJson(data)?.data?.[0]?.details?.[0]
}

function getMessageChannel(data) {
  return toJson(data).arg?.channel
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
  const instrument = toJson(data)?.data?.[0]
  const details = getLiquidationDetails(data)

  if (!details || !instrument) return 'Cannot format liquidation message'

  const { bkLoss, bkPx, posSide, side, sz } = details
  const { instFamily, instType } = instrument

  return `Liquidation: ${instFamily} ${instType}. ${posSide.toUpperCase()}. Total loss: ${bkLoss} USDT. ${side.toUpperCase()} ${sz} at price: ${bkPx} USDT.`
}
