import {Extension} from '@tiptap/core';
import mixinConvertToTiptap from '../../mixins/convertToTiptap';

const Shortkeys = Extension.create({
    name: 'customShortkeys',
    addKeyboardShortcuts() {
        return {
            // Paste Shortkey
            'Mod-Shift-v': () => navigator.clipboard.readText()
                .then(text => {
                    let splited_string = text.split(/\r?\n/)
                    splited_string.forEach(s => {
                        let string = mixinConvertToTiptap.methods.convertToTiptap(s)
                        this.editor.commands.insertContent('<p dir="auto">' + string + '</p>')
                    })

                })
                .catch(err => {
                    console.error('Failed to read clipboard contents: ', err);
                }),

            'Mod-e': () => {
                this.editor.chain().focus().insertContent('<tiptap-interactive-poem><mesra></mesra><mesra></mesra></tiptap-interactive-poem>').run()
            },

            // Insert TiptapInteractiveKatex
            'Mod-Alt-q': () => {
                const SPACE = ' '
                this.editor.chain().focus().insertContent(`<tiptap-interactive-katex-inline editMode="true" katex="${SPACE}"></tiptap-interactive-katex-inline>${SPACE}`).run()
            },

        }
    }
})

export default Shortkeys