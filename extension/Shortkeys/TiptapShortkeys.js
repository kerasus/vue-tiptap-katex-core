import {Extension} from '@tiptap/core';
import mixinConvertToTiptap from '../../mixins/convertToTiptap';

const Shortkeys = Extension.create({
    name: 'customShortkeys',
    addKeyboardShortcuts() {
        return {
            // Paste Shortkey
            'Mod-Shift-v': () => navigator.clipboard.readText()
                .then(text => {
                    let regex = /((\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])|(\$((?! ).){1}((?!\$).)*?((?! ).){1}\$))/gms
                    let counter = 0
                    let formulas = []
                    text = text.replace(regex, match => {
                        formulas.push(match)
                        return '<UniqueFormulaPlaceholder>' + counter++ + '</UniqueFormulaPlaceholder>'
                    })
                    let splited_string = text.split(/\r?\n/)
                    for (let i = 0; i < splited_string.length; i++) {
                        splited_string[i] = '<p dir="auto">' + splited_string[i] + '</p>'
                    }
                    let str = splited_string.join('')
                    for (let i = 0; i < formulas.length; i++) {
                        str = str.replace('<UniqueFormulaPlaceholder>' + i + '</UniqueFormulaPlaceholder>', formulas[i])
                    }
                    let string = mixinConvertToTiptap.methods.convertToTiptap(str)
                    this.editor.commands.insertContent(string)

                })
                .catch(err => {
                    console.error('Failed to read clipboard contents: ', err);
                }),

            'Mod-e': () => {
                this.editor.chain().focus().insertContent('<div class="bait"><div class="mesra"></div><div class="mesra"></div></div>').run()
            },

            // Insert TiptapInteractiveKatex
            'Mod-Alt-q': () => {
                const SPACE = ' '
                this.editor.chain().focus().insertContent(`<span data-katex="true"></span>${SPACE}`).run()
            },

            'Mod-Alt-m': () => {
                const SPACE = ' '
                this.editor.chain().focus().insertContent(`<img></img>${SPACE}`).run()
            }
        }
    }
})

export default Shortkeys
