<template>
  <div class="tiptap-toolbar dynamic">
    <ul>
      <li>
        <div
            class="toolbar-item"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          <span class="mdi mdi-format-header-1 toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <span class="mdi mdi-format-header-2 toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            @click="editor.chain().focus().toggleBulletList().run()"
        >
          <span class="mdi mdi-format-list-bulleted toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
        >
          <span class="mdi mdi-table-plus toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            @click="editor.chain().focus().insertContent('<tiptap-interactive-katex></tiptap-interactive-katex>').run()"
        >
          <span class="mdi mdi-sigma toolbar-item-icon" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import '../css/toolbar-Item.scss'
export default {
  name: 'SlotFloatingMenu',
  props: {
    editor: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      bubbleMenuItems: [],
    }
  },
  computed: {
    computedBubbleMenuItems() {
      let items = []
      if (this.editor.isActive('heading', { level: 1 })) {
        items.push('H1')
      }
      if (this.editor.isActive('heading', { level: 2 })) {
        items.push('H2')
      }
      if (this.editor.isActive('bulletList')) {
        items.push('bulletList')
      }

      return items
    }
  },
  watch: {
    computedBubbleMenuItems () {
      this.bubbleMenuItems = this.computedBubbleMenuItems
    }
  }
}
</script>

<style scoped>

</style>
