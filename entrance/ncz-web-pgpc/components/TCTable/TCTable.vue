<template>
  <section class="table_container">
    <el-table
      ref="elTable"
      v-bind="$attrs"
      :key="key"
      v-loading="loading"
      :summary-method="summaryMethod"
      :show-summary="showSummary"
      :data="data"
      border
      style="width:100%"
    >
      <!-- v-on="$listeners" -->
      <!-- <template #empty>
        <span v-if="empty === null" class="text_large">{{ $t('table.clickSearch' /** 请点击搜索以获取数据 */) }}</span>
        <span v-else class="text_large">{{ empty ? $t('table.loading') : (emptyStr || $t('table.noData' /** 暂无数据 */)) }}</span>
      </template> -->

      <!-- checkBox 多选 -->
      <el-table-column
        v-if="isSelection"
        :key="'selection'"
        :selectable="selectable"
        align="center"
        type="selection"
        width="40"
      />

      <!-- 序号 -->
      <el-table-column
        v-if="isIndex"
        :label="$t('table.id' /**序号 */)"
        align="center"
        type="index"
        width="50"
      />

      <template v-for="(column, index) in columns">
        <!-- v-for="(column, index) in columns" -->

        <!-- checkbox -->
        <template v-if="column.type === 'selection'">
          <el-table-column
            :key="index"
            :width="column.width || '50'"
            :min-width="column.minWidth || '100px'"
            :selectable="selectable"
            :align="column.align || align || 'center'"
            type="selection"
          />
        </template>

        <!-- 序號 -->
        <template v-else-if="column.type === 'index'">
          <el-table-column
            :key="index"
            :label="$t('table.id' /**序号 */)"
            :width="column.width || 50"
            align="center"
            type="index"
          />
        </template>

        <el-table-column
          v-else-if="handleColumnVisible(column.show)"
          v-bind="$attrs"
          :key="index"
          :class-name="column.className || ''"
          :prop="column.prop"
          :label="tryTranslate(column.label)"
          :label-class-name="column.labelClassName"
          :render-header="column.renderHeader"
          :sortable="column.sortable"
          :fixed="column.fixed"
          :width="column.width"
          :min-width="column.minWidth || '100px'"
          :resizable="column.resizable || false"
          :align="column.align || align || 'center'"
          :show-overflow-tooltip="column.showOverflowTooltip || false"
        >
          <template #default="scope">
            <LbRender
              v-if="column.render"
              :scope="scope"
              :render="column.render"
            />

            <!-- solt 自定义列-->
            <template v-else-if="column.type === 'slot'">
              <slot
                :$index="scope.$index"
                :data="scope.row[column.prop]"
                :name="`col-${column.prop}`"
                :row="scope.row"
                :column="column"
              />
            </template>

            <!-- solt Default -->
            <template v-else-if="column.type === 'default'">
              <slot
                :$index="scope.$index"
                :data="scope.row[column.prop]"
                :row="scope.row"
                :column="column"
                name="default"
              />
            </template>

            <!-- 時間，將後端送來的秒數轉換為時間格式 -->
            <template v-else-if="column.type === 'time'">
              {{ parseTime(scope.row[column.prop]) }}
            </template>

            <!-- 千分号 -->
            <template v-else-if="column.type === 'currency'">
              {{ currency(scope.row[column.prop]) }}
            </template>

            <!-- setZero -->
            <template v-else-if="column.type === 'setZero'">
              {{ setZero(scope.row[column.prop]) }}
            </template>

            <!-- symbol -->
            <template v-else-if="column.type === 'symbol'">
              {{ setZero(scope.row[column.prop]) }}
            </template>

            <!-- 帳號 copy -->
            <!-- <template v-else-if="column.type === 'copy'">
              {{ scope.row[column.prop] }}
              <TCCopy :copy-text="scope.row[column.prop]" />
            </template> -->

            <!-- 标签 -->
            <ElTag v-else-if="column.type === 'tag'">
              {{ scope.row[column.prop] }}
            </ElTag>

            <!-- 图片 -->
            <!-- <img
              v-else-if="column.type === 'image' && scope.row[column.prop]"
              v-imgReal="scope.row[column.prop]"
              v-imgAlert
              :src="scope.row[column.prop]"
              height="30px"
            > -->
            <!-- 其他,  default '---'
          symbol: '%'
          -->
            <template v-else>
              <span
                v-if="scope.row.isSum"
                :style="{ color: isNaN(+scope.row[column.prop]) ? '' : '#dc3545' }"
              >{{ scope.row[column.prop] || '' }}</span>

              <!--
                NOTE: 許多場景需判斷參數顯示對應的顏色，這邊可傳入 fn colorClass 來提供給元件內部附加 className

                // e.g. columnsProps.item
                { prop: 'modifyVolume', label: dynamicLabel, colorClass: data => data > 0 ? 'text_danger' : 'text_success' },
              -->
              <span
                v-else
                :class="column.colorClass && column.colorClass(scope.row[column.prop])"
              >{{ (`${resolve(scope.row, column.prop)}${column.symbol || ''}`) || defaultText }}</span>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </section>
</template>

<script>
import { createTextVNode } from 'vue'

// import { isString, isNumber, parseTime, setZero } from '@/utils'
import { isString, isNumber, parseTime, setZero } from './helper.ts'

export default {
  name: 'TCTable',

  /**
   * https://stackoverflow.com/questions/42414627/create-text-node-with-custom-render-function-in-vue-js
   * render: (h, { scope, data }) => `text` 純文字不會渲染
   * render: (h, { scope, data }) => this._v(`text`) 這樣才行
   */
  components: {
    LbRender: {
      name: 'LbRender',
      functional: true,
      props: {
        scope: Object,
        render: Function,
      },
      // render: (h, ctx) => {
      //   console.warn('ctx ', ctx)
      //   const { scope } = ctx.props
      //   // NOTE: 該欄位的 data: table.header 没有 scope.row => 则将 data 设为 null
      //   let data = (scope.row || {})[scope.column.property]
      //   data = [null, undefined].includes(data) ? null : data

      //   const content = ctx.props.render ? ctx.props.render(h, { ...ctx.props.scope, data }) : ''
      //   // NOTE: 使用 render 不需透過 _v，可直接返回值
      //   return isNumber(content) || (isString(content) && content.length > 0) ? ctx._v(content) : content
      // },
      render (ctx) {
        const { scope } = ctx
        // NOTE: 該欄位的 data: table.header 没有 scope.row => 则将 data 设为 null
        let data = (scope.row || {})[scope.column.property]
        data = [null, undefined].includes(data) ? null : data

        const content = ctx.render ? ctx.render(h, { ...scope, data }) : ''

        // NOTE: 使用 render 不需透過 _v，可直接返回值
        const ssss = isNumber(content) || (isString(content) && content.length > 0)
        return ssss ? createTextVNode(content) : content
      },
    },
  },
  inheritAttrs: false,
  props: {
    dynamic: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: () => [],
      required: true,
    },
    // Column 的 align
    align: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => [],
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    // 是否有选择框
    isSelection: {
      type: Boolean,
      default: false,
    },
    selectable: { // 控制選擇框 disabled  狀態, 預設返回 true
      type: Function,
      default: () => true,
    },
    // 是否有序号
    isIndex: {
      type: Boolean,
      default: false,
    },
    // 操作栏配置
    handle: {
      type: Object,
      default: () => ({}),
    },
    // 是否分页
    pager: {
      type: Boolean,
      default: true,
    },
    summaryMethod: {
      type: Function,
      default: () => {},
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
    // Column 的 content 為空時，要顯示什麼
    defaultText: {
      type: String,
      default: '---',
    },
    empty: {
      type: Boolean,
      default: false,
    },
    emptyStr: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      key: 1, // table key
    }
  },
  computed: {
  },
  watch: {
    columns () {
      if (this.dynamic) {
        // ref: http://localhost:9527/#/table/dynamic-table
        // 为了保证 table 每次都会重渲 In order to ensure the table will be re-rendered each time
        this.key = this.key + 1
      }
    },
  },
  created () {
    // console.log(' $listeners ', this.$listeners)
  },
  methods: {
    parseTime,
    setZero,
    clearSelection () {
      this.$refs.elTable.clearSelection()
    },
    toggleRowSelection (row, selected) {
      this.$refs.elTable.toggleRowSelection(row, selected)
    },
    toggleAllSelection () {
      this.$refs.elTable.toggleAllSelection()
    },

    handleColumnVisible (show = true) {
      return typeof show === 'function' ? show() : show
    },

    // 為了能夠直接傳入 func，而不藉以 watch language 再賦值給 column 等等的複雜操作。
    tryTranslate (name) {
      const isFunction = params => typeof (params) === 'function'
      return isFunction(name) ? name() : name
    },
    resolve (rowObj, prop) {
      // 'authAccount.loginName' => [ 'authAccount', 'loginName' ] => obj['authAccount']['loginName]
      const transform = data => [null, undefined].includes(data) ? '' : data
      const columnData = rowObj[prop]

      return prop.includes('.')
        ? prop.split('.').reduce((prev, curr) => {
          if (curr) {
            return prev ? prev[curr] : null
          } else {
            console.log(prev, curr)
            return prev
          }
        }, rowObj)
        : transform(columnData)
    },
    currency (num) {
      return Number(this.setZero(num)).toLocaleString('zh', { maximumFractionDigits: 2 })
    },
    // 派发按钮点击事件
    handleClick (event, data) {
      console.log('%c onClick, rows ', 'font-weight: bold; color: white; background: green;', event, data)
      this.$emit('onClick', event, data)
    },
    // 选中数据
    // handleSelectionChange(rows) {
    //   console.log('%c onEvent, rows ', 'font-weight: bold; color: white; background: green;', rows)
    //   this.$emit('SelectionChange', rows)
    // }
  },
}
</script>

<style lang="scss" scoped>

// .table_container {

//   // fix 歪掉
//   .el-table /deep/ th.el-table-column--selection .cell {
//     padding-right: 10px;
//     padding-left: 10px;
//   }

//   .text_large{
//     font-size: 16px;
//     color: #606266;
//   }

//   // data 新增 小計, 總計，改最後兩個顏色
//   &.isSummary .el-table /deep/ tr.el-table__row:nth-last-child(-n + 2) {
//     background-color: #f5f7fa;
//     color: #606266;
//   }
// }

// @media (max-width: 1400px) {
//   .table_container {
//     .text_large {
//       font-size: 14px !important;
//     }
//   }
// }

</style>
