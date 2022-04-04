import {Extension} from '@tiptap/core';

const ThinSpace = Extension.create({
    name: 'ThinSpace',
    addKeyboardShortcuts() {
        return {
            // ↓ your new keyboard shortcut
            // eslint-disable-next-line vue/no-parsing-error
            'Mod-Shift-Space': () => this.editor.chain().focus().insertContent('').run(),
        }
    },
})

export default ThinSpace;
export { ThinSpace };