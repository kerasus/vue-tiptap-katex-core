<template>
  <div
      v-if="editor"
      class="tiptap-toolbar"
  >
    <!--        IMPORTANT : EACH TOOLBAR ITEM'S ID SHOULD BE IN THIS FORM : toolbar-item-(if more than 2 words , use "-") -->
    <ul>
      <li>
        <div
            id="toolbar-item-Paragraph"
            class="toolbar-item"
            @click="editor.chain().focus().setParagraph().run()"
        >
          <span
              class="mdi mdi-format-paragraph toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            id="toolbar-item-Heading-1"
            class="toolbar-item"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          <span
              class="mdi mdi-format-header-1 toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            id="toolbar-item-Heading-2"
            class="toolbar-item"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <span
              class="mdi mdi-format-header-2 toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Heading-3"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          <span
              class="mdi mdi-format-header-3 toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Heading-4"
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        >
          <span
              class="mdi mdi-format-header-4 toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Heading-5"
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        >
          <span
              class="mdi mdi-format-header-5 toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Heading-6"
            @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        >
          <span
              class="mdi mdi-format-header-6 toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div class="vl" />
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Bold"
            @click="editor.chain().focus().toggleBold().run()"
        >
          <span
              class="mdi mdi-format-bold toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            id="toolbar-item-Italic"
            class="toolbar-item"
            @click="editor.chain().focus().toggleItalic().run()"
        >
          <span
              class="mdi mdi-format-italic toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Underline"
            @click="editor.chain().focus().toggleUnderline().run()"
        >
          <span
              class="mdi mdi-format-underline toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Line-Through"
            @click="editor.chain().focus().toggleStrike().run()"
        >
          <span
              class="mdi mdi-format-strikethrough toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Highlight"
            @click="editor.chain().focus().toggleHighlight().run()"
        >
          <span
              class="mdi mdi-format-color-highlight toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <input
            class="toolbar-item"
            id="toolbar-item-set-color"
            type="color"
            @input="editor.chain().focus().setColor($event.target.value).run()"
            :value="getInputValue"
        >
      </li>
      <li>
        <div class="vl" />
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Align-Right"
            @click="editor.chain().focus().setTextAlign('right').run()"
        >
          <span
              class="mdi mdi-format-align-right toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Align-Center"
            @click="editor.chain().focus().setTextAlign('center').run()"
        >
          <span
              class="mdi mdi-format-align-center toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Align-Left"
            @click="editor.chain().focus().setTextAlign('left').run()"
        >
          <span
              class="mdi mdi-format-align-left toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Align-Justify"
            @click="editor.chain().focus().setTextAlign('justify').run()"
        >
          <span
              class="mdi mdi-format-align-justify toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div class="vl" />
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Text-rtl"
            @click="editor.chain().focus().setTextDirection('rtl').run()"
        >
          <span
              class="mdi mdi-format-textdirection-r-to-l toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Text-ltr"
            @click="editor.chain().focus().setTextDirection('ltr').run()"
        >
          <span
              class="mdi mdi-format-textdirection-l-to-r toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div class="vl" />
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Unordered-List"
            @click="editor.chain().focus().toggleBulletList().run()"
        >
          <span
              class="mdi mdi-format-list-bulleted toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Ordered-List"
            @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <span
              class="mdi mdi-format-list-numbered toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div class="vl" />
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Break"
            @click="editor.chain().focus().setHardBreak().run()"
        >
          <span
              class="mdi mdi-arrow-expand-down toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Horizontal-Divider"
            @click="editor.chain().focus().setHorizontalRule().run()"
        >
          <span
              class="mdi mdi-arrow-split-horizontal toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div class="vl" />
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Table"
            @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()"
        >
          <span
              class="mdi mdi-table-plus toolbar-item-icon"
          />
        </div>
      </li>
      <li v-if="editor.can().mergeCells()">
        <div
            class="toolbar-item"
            id="toolbar-item-Edit-Table"
            @click="$emit('show-edit-table-modal')"
        >
          <span
              class="mdi mdi-table-edit  toolbar-item-icon"
          />
        </div>
      </li>
      <li v-if="editor.can().mergeCells()">
        <div
            class="toolbar-item"
            id="toolbar-item-Merge-Cells"
            @click="editor.chain().focus().mergeCells().run()"
        >
          <span
              class="mdi mdi-table-merge-cells  toolbar-item-icon"
          />
        </div>
      </li>
      <li v-if="editor.can().splitCell()">
        <div
            class="toolbar-item"
            id="toolbar-item-Split-Cells"
            @click="editor.chain().focus().splitCell().run()"
        >
          <span
              class="mdi mdi-table-split-cell  toolbar-item-icon"
          />
        </div>
      </li>
      <li v-if="editor.can().addColumnAfter()">
        <div
            class="toolbar-item"
            id="toolbar-item-Add-Column"
            @click="editor.chain().focus().addColumnAfter().run()"
        >
          <span
              class="mdi mdi-table-column-plus-after  toolbar-item-icon"
          />
        </div>
      </li>
      <li v-if="editor.can().addRowAfter()">
        <div
            class="toolbar-item"
            id="toolbar-item-Add-Row"
            @click="editor.chain().focus().addRowAfter().run()"
        >
          <span
              class="mdi mdi-table-row-plus-after  toolbar-item-icon"
          />
        </div>
      </li>
      <li v-if="editor.can().deleteColumn()">
        <div
            class="toolbar-item"
            id="toolbar-item-Delete-Column"
            @click="editor.chain().focus().deleteColumn().run()"
        >
          <span
              class="mdi mdi-table-column-remove  toolbar-item-icon"
          />
        </div>
      </li>
      <li v-if="editor.can().deleteRow()">
        <div
            class="toolbar-item"
            id="toolbar-item-Delete-Row"
            @click="editor.chain().focus().deleteRow().run()"
        >
          <span
              class="mdi mdi-table-row-remove  toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Add-Formula"
            @click="editor.chain().focus().insertContent(`<span data-katex='true'></span> `).run()"
        >
          <span
              class="mdi mdi-sigma  toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Image"
            @click="editor.chain().focus().insertContent('<img>').run()"
        >
          <span
              class="mdi mdi-image toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div class="vl" />
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Redo"
            @click="editor.chain().focus().redo().run()"
        >
          <span
              class="mdi mdi-redo toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Undo"
            @click="editor.chain().focus().undo().run()"
        >
          <span
              class="mdi mdi-undo toolbar-item-icon"
          />
        </div>
      </li>
      <li v-if="editor.editorOptions.poem">
        <div
            class="toolbar-item"
            id="toolbar-item-Poem"
            @click="editor.chain().focus().insertContent(`<div class='beit'><div class='mesra'></div><div class='mesra'></div></div>`).run()"
        >
          <span
              class="mdi mdi-format-columns toolbar-item-icon"
          />
        </div>
      </li>
      <li v-if="editor.editorOptions.reading">
        <div
            class="toolbar-item"
            id="toolbar-item-Reading"
            @click="editor.chain().focus().insertContent(`<div class='reading-duplicate'>Type Here</div>`).run()"
        >
          <span
              class="mdi mdi-eye-off toolbar-item-icon"
          />
        </div>
      </li>
      <li>
        <div
            class="toolbar-item"
            id="toolbar-item-Help-Me"
            @click="dialog = true"
        >
          <span
              class="mdi mdi-information-outline toolbar-item-icon"
          />
        </div>
      </li>
    </ul>
    <interactive-info-table @closedialog="dialog = false" :dialog="dialog"></interactive-info-table>
  </div>
</template>

<script>
import InteractiveInfoTable from '../tipTapInteractiveInfoTable';

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import '../../css/toolbar-Item.scss'

import mixinConvertToTiptap from 'vue-tiptap-katex-core/mixins/convertToTiptap';

export default {
  name: 'Toolbar',
  components: {
    InteractiveInfoTable
  },
  data() {
    return {
      dialog: false
    }
  },
  mixins: [mixinConvertToTiptap],
  mounted() {
    this.setAllTooltips()
  },
  props: {
    editor: {
      type: Object,
      default: () => {
      }
    },
    options: {
      type: Object,
      default: () => {
        return {
          poem: false
        }
      }
    }
  },
  computed: {
    getInputValue () {
      let rgbColor = this.editor.getAttributes('textStyle').color
      if (rgbColor && !rgbColor.includes('#')) {
        rgbColor = rgbColor.replace('rgb(','').replace(')','')
        rgbColor = rgbColor.split(', ')
        return this.rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2])
      }
      else if (!rgbColor) {
        return '#000000'
      }
      return this.editor.getAttributes('textStyle').color
    }
  },
  methods: {
    setAllTooltips(){
      let that = this
      var toolbarItems = this.getAllToolbarItems()
      toolbarItems.forEach(function(item) {
        var name = that.getToolbarItemName(item.id)
        that.setTippyForEl(item.id , name)
      })
    },
    getAllToolbarItems(){
      return document.querySelectorAll('li .toolbar-item')
    },
    getToolbarItemName(itemId){
      return itemId.replace('toolbar-item-', '').replace('-' , ' ')
    },
    setTippyForEl(itemId , content){
      tippy('#' + itemId , {
        content: content,
      })
    },
    rgbToHex(r, g, b) {
      return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)
    }
  }
}
</script>

<style scoped lang="scss">

.vl {
  border-left: 1px dotted gray;
  white-space: nowrap;
  display: inline;
  margin-right: 12px;
  margin-left: 12px;
  padding-top: 12px;
  padding-bottom: 3px;
}

button:not(.v-btn) {
  border: solid 1px gray;
  padding: 5px;
  margin: 2px;
}

.formula-menu {
  border-radius: 5px !important;
}

.formula-menu .v-list-item,
.formula-menu .v-list {
  padding: 0;
}
</style>
