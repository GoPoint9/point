import i18n from '@/lang'
import {
  isString,
  isObject,
  colorClass
} from '@/utils'

export const ColorClassSpan = {
  name: 'ColorClassSpan',
  functional: true,
  render(h, { props }) {
    const { value = '', suffixSymbol = '' } = props
    return <span class={['ColorClassSpan', colorClass(value)]}>{ value }{ suffixSymbol }</span>
  }
}

/**
 * 渲染動態小計
 *
 * @param {Function} h - Vue 的 `createElement` 方法，通常通过 `this.$createElement` 调用。
 *
 * @param {Object} options - 配置参数。
 * @param {Object} [options.data={}] - 表格的小计数据，键为属性名称，值为相应的小计值。
 * @param {Array<Object>} options.columnsProps - 當前 TCTable 顯示的欄位設定。每個物件至少包含 `prop` 屬性。
 * @param {Array<string|Object>} options.summaryProps - 需要顯示小计的属性陣列，字串或設定的物件。
 * @param {string} [options.summarySuffix=''] - 資料属性後綴，拼接生成小計属性（如 `profitMoneySubTotal`）。
 *
 * @returns {Array<VNode|string>} 返回包含小计行内容的虚拟 DOM 节点数组或字符串数组。
 *
 * @example
 *  const columnsProps = [{ prop: 'accountName' }, { prop: 'totalProfit' }, { prop: 'totalProfitRate' }];
 *  const summaryProps = ['totalProfit', { prop: 'totalProfitRate', type: 'ColorClassSpan', suffixSymbol: '%' }];
 *  const data = { totalProfitSubTotal: 1000, totalProfitRateSubTotal: 10 };
 *  const summarySuffix = 'SubTotal';
 *
 *  const result = renderDynamicSummary(h, { data, columnsProps, summaryProps, summarySuffix });
 *  输出类似 ['小计', 1000, <ColorClassSpan value={10} suffixSymbol="%" />]
 */
export function renderDynamicSummary(
  h, // this.$createElement
  {
    data = {},
    columnsProps,
    summaryProps,
    summarySuffix = ''
  }
) {
  const props = columnsProps.map(i => i.prop)

  const getConfig = prop => {
    const config = summaryProps.find((i, index, array) => {
      if (isString(i)) return array.includes(prop)
      return i.prop === prop
    })
    return config
  }

  // console.warn(' [renderDynamicSummary] ', { columnsProps, summaryProps, data, props })
  const resultSummary = props.map((iProp, index) => {
    // #1. 第一個欄位，固定顯示小計
    if (index === 0) return i18n.t('table.subtotal')

    // NOTE: 有些頁面的小計屬性名稱很北七，多加了一段後綴。例如 profitMoney(columnsProps) / profitMoneySubTotal(data)
    const prop = iProp + summarySuffix

    // NOTE: 比對 columnsProps 並取得 summaryProps 內匹配的 prop<string> 或設定<object>
    const config = getConfig(prop) || ''
    const isStringProp = isString(config)

    const { [prop]: value = '' } = data

    // #2 純顯示 value
    if (isStringProp) return value

    // #3 客製化元件
    if (isObject(config)) {
      const { type, suffixSymbol } = config
      if (type === 'ColorClassSpan') return <ColorClassSpan value={value} suffixSymbol={suffixSymbol} />
      if (['text_danger', 'text_success'].includes(type)) return <span class={type}>{ value }</span>
    }
  })

  return resultSummary
}
