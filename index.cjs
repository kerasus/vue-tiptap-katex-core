
const { EXTRA_KEYBOARD_LAYER, EXTRA_KEYBOARD } = require('./components/formula/ExtraKeyboard')
const { katexShortkeys } = require('./components/formula/KatexShortkeys')
const MixinComponentImageUpload = require('./components/ImageUpload/mixin').default
const MixinComponentPoemMesra = require('./components/poem/mixin-mesra').default
const MixinComponentPoem = require('./components/poem/mixin').default
const MixinComponentReading = require('./components/reading/mixin').default
const ComponentToolbar = require('./components/toolbar/toolbar').default
const ComponentToolbarDynamicToolsDynamicTable = require('./components/toolbar/dynamicTools/DynamicTable').default
const ComponentSlotBubbleMenu = require('./components/SlotBubbleMenu').default
const ComponentSlotFloatingMenu = require('./components/SlotFloatingMenu').default
const ComponentTipTapInteractiveInfoTable = require('./components/tipTapInteractiveInfoTable').default
const ExtensionTiptapShortkeys = require('./extension/Shortkeys/TiptapShortkeys.mjs').default
const ExtensionThinSpace = require('./extension/ThinSpace/ThinSpace.mjs').default
const MixinConvertToTiptap = require('./mixins/convertToTiptap.mjs').default

const VueTiptapKatexCore = {
    EXTRA_KEYBOARD_LAYER,
    EXTRA_KEYBOARD,
    katexShortkeys,
    MixinComponentImageUpload,
    MixinComponentPoemMesra,
    MixinComponentPoem,
    MixinComponentReading,
    ComponentToolbar,
    ComponentToolbarDynamicToolsDynamicTable,
    ComponentSlotBubbleMenu,
    ComponentSlotFloatingMenu,
    ComponentTipTapInteractiveInfoTable,
    ExtensionTiptapShortkeys,
    ExtensionThinSpace,
    MixinConvertToTiptap
}

module.exports = VueTiptapKatexCore
module.exports.default = VueTiptapKatexCore