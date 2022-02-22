<template>
  <div class="tiptap-toolbar dynamic">
    <ul>
      <li>
        <div
            class="toolbar-item"
            @click="editor.chain().focus().toggleBold().run()"
        >
          <span class="mdi mdi-format-bold toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            @click="editor.chain().focus().toggleItalic().run()"
        >
          <span class="mdi mdi-format-italic toolbar-item-icon" />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            @click="editor.chain().focus().toggleStrike().run()"
        >
          <span class="mdi mdi-format-strikethrough toolbar-item-icon" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import '../css/toolbar-Item.scss'
export default {
  name: 'SlotBubbleMenu',
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
      if (this.editor.isActive('bold')) {
        items.push('bold')
      }
      if (this.editor.isActive('italic')) {
        items.push('italic')
      }
      if (this.editor.isActive('strike')) {
        items.push('strike')
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
