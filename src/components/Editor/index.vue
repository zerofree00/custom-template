<script>

/**
 * 注：编辑器二次刷新处理
 * 编辑器二次刷新具体效果为输入光标重置到第一行第一个字前。
 * 这种效果根本无法正常录入，其原因是双向绑定数据导致编辑器数据更新所致。
 * 根据编辑器的不同状态做标记，当标记为`INPUT`录入时，数据将不会更新至编辑器，
 * 从而避免二次更新的情况，具体请看`content`部分和`editor event`部分的代码。
 * */

import { h } from 'vue'

const INIT = 0
// const INPUT = 1
// const CHANGED = 2

const status = ['INIT', 'INPUT', 'CHANGED']
const changedLog = debug => {
  if (!debug) return () => false
  console.warn('`@packy-tang/vue-tinymce`进入debug模式')
  return (e, _status, val, oldVal) => console.log('来自：%s | 状态：%s \n %s \n %s', e.type, status[_status], val, oldVal)
}

export default {
  name: 'VueTinymce',
  props: {
    content: {
      type: [String, Object],
      default: ''
    },
    setup: {
      type: Function,
      default: function () {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    setting: {
      type: Object,
      default: function () {
        return {}
      }
    },
    debug: Boolean
  },
  emits: ['update:content'],
  render () {
    if (typeof tinymce === 'undefined') {
      return h('div', 'tinymce is undefined')
    }
    return h('div', {
      attrs: {
        id: this.id
      }
    })
  },
  data () {
    return {
      id: 'vue-tinymce-' + Date.now() + Math.floor(Math.random() * 1000),
      editor: null,
      status: INIT,
      bookmark: null,
      dom: null
    }
  },
  watch: {
    // content (val, oldVal) {
    // this.changedLog({ type: 'propsChanged' }, this.status, `${val} | ${oldVal}`, '-')
    // if (this.status === INPUT || oldVal === val) return
    // if (!this.editor || !this.editor.initialized) return // fix editor plugin is loading and set content will throw error.
    // if (val === null) return this.resetContent('')
    // this.getRoot(val)
    // }
    // disabled (val) {
    //   this.editor.setMode(val ? 'readonly' : 'design')
    // }
  },
  created () {
    this.changedLog = changedLog(this.debug)
    if (typeof tinymce === 'undefined') throw new Error('tinymce undefined')
  },
  beforeMount () {
    const setting = Object.assign({
      height: 300,
      toolbar: ' bold italic underline |fontsizeselect| alignleft aligncenter alignright alignjustify|image ',
      plugins: ['wordcount', 'image'],
      images_upload_url: '/demo/upimg.php',
      images_upload_base_path: '/demo',
      // automatic_uploads: true,
      // plugins: "table charmap  preview image ",
      language: 'zh_CN',
      menubar: false,
      mobile: {
        menubar: false
      }
    },
    this.setting,
    {
      selector: '#' + this.id,
      setup: (editor) => {
        this.setup(editor)
      }
    }
    )
    this.editor = tinymce.createEditor(setting.selector, setting)
  },
  mounted () {
    this.editor.targetElm = this.$el
    console.log(this.editor)
    this.editor.render()
  },
  updated () {
    this.editor.render()
  },
  beforeUnmount () {
    this.editor.remove()
  },
  methods: {
    // setContent (val, editor) {
    //   if (!editor) editor = this.editor
    //   editor.setContent(val)
    //   editor.selection.moveToBookmark(this.bookmark)
    // },
    // resetContent (val, editor) {
    //   if (!editor) editor = this.editor
    //   if (editor.resetContent) return editor.resetContent(val)
    //   editor.setContent(val)
    //   editor.setDirty(false)
    //   editor.undoManager.clear()
    // },
    onChanged (e, editor) {
      // if (!editor) editor = this.editor
      // if (e.type === 'change') this.bookmark = e.level.bookmark
      // const content = this.editor.dom.getRoot().innerHTML
      // this.changedLog(e, this.status, content, '-')
      // this.$emit('update:content', content)
    },
    /**
     * 传入整个html更新富文本
     */
    setHtml (str) {
      let sid = 0
      if (this.editor.dom) {
        clearTimeout(sid)
        this.editor.dom.setHTML(this.editor.dom.getRoot(), str)
      } else {
        sid = setTimeout(() => {
          this.setHtml(str)
        }, 500)
      }

      // this.$emit('update:content', str)
    },
    /**
     * 获取富文本的html
     */
    getHtml () {
      return this.editor.dom.getRoot().innerHTML
      // this.$emit('update:content', str)
    },
    /**
     * 获取富文本的文本数据 不含标签
     */
    getText () {
      return this.editor.dom.getRoot().innerText
    },
    /**
     * 向富文本插入数据
     */
    insertContent (val) {
      this.editor.insertContent(val)
    }
  },
  // activated () {
  //   const setting = Object.assign({
  //     height: 500,
  //     toolbar: 'bold italic underline| alignleft aligncenter alignright code',
  //     plugins: ['wordcount'],
  //     automatic_uploads: true,
  //     // plugins: "table charmap  preview image",
  //     language: 'zh_CN',
  //     menubar: false,
  //     mobile: {
  //       menubar: false
  //     }
  //   },
  //   this.setting,
  //   {
  //     selector: '#' + this.id,
  //     setup: (editor) => {
  //       this.setup(editor)
  //     }
  //   }
  //   )
  //   this.editor = tinymce.createEditor(setting.selector, setting)
  //   this.editor.targetElm = this.$el
  //   this.editor.render()
  //   this.setHtml(this.dom)
  // },
  deactivated () {
    this.dom = this.editor.dom.getRoot().innerHTML
    this.editor.remove()
  }
}
</script>
