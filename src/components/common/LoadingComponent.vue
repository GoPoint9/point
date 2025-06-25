<script lang="jsx">
import { loaderHTML } from '@entrance/ncz-web-pgpc/plugins/WebCover'
export default defineComponent({
  name: 'LoadingComponent',
  setup () {
    return () => h('fragment', { class: 'LoadingComponent', innerHTML: loaderHTML })
  },
})
</script>

<style lang="scss">
.LoadingComponent {
  .br_loader_bg { display: none; }
  .br_spinner {
    .spinner_line { border-left-color: #2b3248; }
    .spinner_circle { color: #2b3248; }
  }
}
</style>
