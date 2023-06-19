'use strict';

import { EXTRA_KEYBOARD_LAYER, EXTRA_KEYBOARD } from './components/formula/ExtraKeyboard.js'
import { katexShortkeys } from './components/formula/KatexShortkeys.js'
import MixinComponentFormula from './components/formula/mixin.mjs'

import MixinComponentImageUpload from './components/ImageUpload/mixin.js'

import MixinComponentPoemMesra from './components/poem/mixin-mesra.js'
import MixinComponentPoem from './components/poem/mixin.js'

import MixinComponentReading from './components/reading/mixin.js'

import ComponentToolbar from './components/toolbar/toolbar.vue'
import ComponentToolbarDynamicToolsDynamicTable from './components/toolbar/dynamicTools/DynamicTable.vue'

import ComponentSlotBubbleMenu from './components/SlotBubbleMenu.vue'
import ComponentSlotFloatingMenu from './components/SlotFloatingMenu.vue'
import ComponentTipTapInteractiveInfoTable from './components/tipTapInteractiveInfoTable.vue'

import ExtensionTiptapShortkeys from './extension/Shortkeys/TiptapShortkeys.mjs'
import ExtensionThinSpace from './extension/ThinSpace/ThinSpace.mjs'
import ExtensionTextDirection from './extension/tiptap-text-direction-extension/index.mjs'
import ExtensionTableCell from './extension/table.js'

import MixinConvertToTiptap from './mixins/convertToTiptap.mjs'

export {
    MixinComponentFormula,
    EXTRA_KEYBOARD_LAYER, EXTRA_KEYBOARD,
    katexShortkeys,

    MixinComponentImageUpload,

    MixinComponentPoem,
    MixinComponentPoemMesra,

    MixinComponentReading,

    ComponentToolbar,
    ComponentToolbarDynamicToolsDynamicTable,

    ComponentSlotBubbleMenu,
    ComponentSlotFloatingMenu,
    ComponentTipTapInteractiveInfoTable,

    ExtensionTiptapShortkeys,
    ExtensionThinSpace,
    ExtensionTextDirection,
    ExtensionTableCell,

    MixinConvertToTiptap
}
