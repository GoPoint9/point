
import { $t } from '@/languages'

export const calcAmount = (row) => {
  const { winAmount, amountAfterTax } = row
  const amount = Number(winAmount) ? winAmount : amountAfterTax
  const resultAmount = filterAmount(Math.abs(amount), 2, 2, false)
  const dollarSign = sessionStorage.getItem('dollarSign')
  const result = {
    amount: `${Number(winAmount) ? '' : '-'}${dollarSign}${resultAmount}`,
    class: Number(winAmount) ? 'text_green' : 'text_red',
  }
  return result
}

export const getAwardResult = (item) => {
  if (item.playId !== 'RG') return {}

  const awardResult = Number(item.awardResult)
  const { isOdd, isBig, bigOrSmall } = transformAwardResult(awardResult)
  const obj = {
    BS: bigOrSmall,
    BSClass: isBig ? 'bigClass' : 'small',
  }

  switch (awardResult) {
    case 0:
      obj.color = $t('YJ.winColor3' /** 红紫色 */)
      obj.colorClass = 'rg_red_violet'
      break
    case 5:
      obj.color = $t('YJ.winColor4' /** 绿紫色 */)
      obj.colorClass = 'rg_green_violet'
      break
    default:
      obj.color = isOdd ? $t('YJ.winColor2' /** 绿色 */) : $t('YJ.winColor1' /** 红色 */)
      obj.colorClass = isOdd ? 'rg_green' : 'rg_red'
      break
  }
  return obj
}

// changeLottery
export const transformAwardResult = (number, bigSize = 5) => {
  return {
    isBig: Number(number) >= bigSize,
    isOdd: Number(number) % 2,
    bigOrSmall: number >= bigSize ? $t('YJ.code9473' /** 大 */) : $t('YJ.code9474' /** 小 */),
    singleOrDouble: number % 2 === 1 ? $t('YJ.code9475') : $t('YJ.code9476'),
  }
}

export const filterAmount = (
  money = 0,
  minFractionDigits = 2,
  maxFractionDigits = 2,
  addZero = false,
  // zeroNum = 1,
  isRound = false
) => {
  if ([null, undefined].includes(money) || isNaN(money)) return 0.00
  if (isRound && money !== 0) {
    const roundedValue = (
      Math.floor((money * 10 ** (maxFractionDigits)).toFixed(maxFractionDigits + 1)) / 10 ** maxFractionDigits
    ).toString()
    return addZero ? roundedValue : Number(roundedValue.replace(/,/g, ''))
  }
  const formattedResult = money.toLocaleString(undefined, {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits + 1,
  }).slice(0, -1)
  return addZero ? formattedResult : Number(formattedResult.replace(/,/g, ''))
}
