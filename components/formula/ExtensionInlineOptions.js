export const options = {
    name: 'TiptapInteractiveKatexInline',

    group: 'inline',

    draggable: true,

    inline: true,

    atom: true,

    addAttributes() {
        return {
            katex: {
                default: 'x=\\frac{-4b\\pm \\sqrt{b^2-4ac}}{2a}',
            },
            inline: {
                default: true
            },
            editMode: {
                default: false
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'tiptap-interactive-katex-inline',
            },
        ]
    },
}