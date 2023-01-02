import katex from 'katex'
import {EXTRA_KEYBOARD, EXTRA_KEYBOARD_LAYER} from './ExtraKeyboard'
import {katexShortkeys} from './KatexShortkeys'
import {MathfieldElement} from 'mathlive'
import mixinConvertToTiptap from '../../mixins/convertToTiptap'

const MixinComponentFormula = {
    props: {
        node: {
            type: Object,
            required: true
        },
        updateAttributes: {
            type: Function,
            required: true,
        },
        editor: {
            type: Object,
            default: () => {return {}}
        }
    },
    data: () => {
        return {
            editModal: false,
            latexData: null,
            formulaEditPanel: '',
            editMode: false,
            questMarkdownText: '# Math Rulez! \n  $x=\\frac{-b\\pm\\sqrt[]{b^2-4ac}}{2a}$',
            katex: '$x=\\frac{-b\\pm\\sqrt[]{b^2-4ac}}{2a}$',
            // katex: '$x$',
            icons: {},
            mf: null,
            isFormulaBroken: false
        }
    },
    watch: {
        editMode(newValue) {
            if (!newValue) {
                return
            }
            this.$nextTick(() => {
                this.loadMathLive()
            });
        },
        latexData: function (newValue) {
            this.updateAttributes({
                // katex: this.latexData
                katex: newValue
            })
            // formulaEditPanel is a string, the default value as sth to click on to load MathLive
            if (newValue === 'formulaEditPanel') {
                return
            }
            this.katex = newValue
        },
    },
    computed: {
        keyboardList() {
            let options = 'numeric custom-functions symbols roman  greek matrix-keyboard others-keyboard extra-keyboard'
            if (this.editor.editorOptions.persianKeyboard) {
                options += ' persian-keyboard'
            }
            return options
        },
        computedKatex() {
            const purifiedKatex = mixinConvertToTiptap.methods.replaceKatexSigns(this.node.attrs.katex.toString())
            this.checkMathLivePanelVisibility(purifiedKatex)
            return katex.renderToString(purifiedKatex, {
                throwOnError: false,
                safe: true,
                trust: true
            })
        }
    },
    created() {
        this.katex = mixinConvertToTiptap.methods.replaceKatexSigns(this.node.attrs.katex.toString())
        this.editMode = this.node.attrs.editMode
        this.overrideKeyboardEvent()
    },
    mounted () {
        if (this.node.attrs.editMode) {
            setTimeout(() => {
                this.mf.executeCommand('toggleVirtualKeyboard')
                this.mf.executeCommand('toggleVirtualKeyboard')
            }, 100)
        }
    },
    methods: {
        // setDirMath () {
        //   //.setAttribute('dir', 'auto')
        //   document.querySelectorAll('span').forEach(item => {
        //
        //   })
        // },
        // setDir (input) {
        //   input.querySelectorAll('.boxpad').forEach(item => {
        //     item.setAttribute('dir', 'auto')
        //   })
        //   return input
        // },]
        checkMathLivePanelVisibility (input) {
            if (input === 'formulaEditPanel') {
                this.editMode = true
            }
        },
        overrideKeyboardEvent () {
            window.document.onkeydown = overrideKeyboardEvent;
            window.document.onkeyup = overrideKeyboardEvent;
            const keyIsDown = {};

            function overrideKeyboardEvent(e) {
                if (e.keyCode !== 17) {
                    return
                }
                switch(e.type){
                    case 'keydown':
                        if(!keyIsDown[e.keyCode]){
                            keyIsDown[e.keyCode] = true;
                            // do key down stuff here
                        }
                        break;
                    case 'keyup':
                        delete(keyIsDown[e.keyCode]);
                        // do key up stuff here
                        break;
                }
                disabledEventPropagation(e);
                e.preventDefault();
                return false;
            }
            function disabledEventPropagation(e) {
                if(e){
                    if(e.stopPropagation){
                        e.stopPropagation();
                    } else if(window.event){
                        window.event.cancelBubble = true;
                    }
                }
            }
        },
        getKatexErrors() {
            let hasError = false
            const katexString = katex.renderToString(this.katex.toString(), {
                throwOnError: false,
                safe: true,
                trust: true
            })
            let el = document.createElement('div')
            el.innerHTML = katexString
            el.querySelectorAll('.katex-error').forEach(error => { //configable error hangdling ToDo
                console.log(error.attributes['title'])
                hasError = true
                if (error.attributes['title'].nodeValue.includes('KaTeX parse error: Invalid delimiter \'?\' after \'\\right\'')) {
                    // this.$notify({
                    //     group: 'error',
                    //     title: 'مشکلی رخ داده است',
                    //     text: 'پرانتز یا آکولاد و یا ... بسته نشده است',
                    //     type: 'error',
                    //     duration: 10000
                    // })
                } else if (error.attributes['title'].nodeValue.includes('KaTeX parse error: Can\'t use function \'$\' in math mode')) {
                    // this.$notify({
                    //     group: 'error',
                    //     title: 'مشکلی رخ داده است',
                    //     text: 'فرمول رو با علامت $ درون این باکس نمیتوانید پیست کنید',
                    //     type: 'error',
                    //     duration: 10000
                    // })
                } else {
                    // this.$notify({
                    //     group: 'error',
                    //     title: 'مشکلی رخ داده است',
                    //     text: error.attributes['title'].nodeValue,
                    //     type: 'error',
                    //     duration: 10000
                    // })
                }
            })
            return hasError
        },
        doesKatexHaveErrors() {
            return this.getKatexErrors()
        },
        toggleEdit () {
            this.editMode = !this.editMode
            if (this.doesKatexHaveErrors()) {
                this.editMode = true
            }
            this.editor.chain().focus().run()
        },
        fixFormula() {
            this.removeMistakenBrackets()
        },
        removeMistakenBrackets () {

        },
        getMathliveModifiedValue (value) {
            return value
                .replaceAll('\\mleft', '\\left')
                .replaceAll('\\mright', '\\right')
                .replaceAll('&amp;', '&')
                .replaceAll('&lt;', '<')
                .replaceAll('&gt;', '>')
                .replaceAll('&amp;', '&')
                .replaceAll('&nbsp;', ' ')
        },
        loadMathLive() {
            let mathliveOptions = {
                customVirtualKeyboardLayers: EXTRA_KEYBOARD_LAYER,
                customVirtualKeyboards: EXTRA_KEYBOARD,
                virtualKeyboards: this.keyboardList,
                virtualKeyboardMode: 'manual',
                keypressSound: 'none',
                mathModeSpace: '\\:',
                inlineShortcuts: {
                    'lim': { mode: 'math', value: '\\lim\\limits_{x \\to \\infty}' },
                },
            }
            Object.assign(mathliveOptions, this.editor.editorOptions.mathliveOptions)
            let that = this
            const mf = new MathfieldElement()
            mf.setOptions(mathliveOptions);
            if (this.doesKatexHaveErrors()) {
                this.isFormulaBroken = true
            }
            mf.value = that.getMathliveModifiedValue(this.katex)
            // formulaEditPanel is a string, the default value as sth to click on to load MathLive
            if (mf.value === 'formulaEditPanel') {
                // mathfield should have a preset value to be able to get clicked on, so we give it a space
                mf.value = '$\\enspace$'
            }

            this.mf = mf

            mf.addEventListener('keydown', (ev) => {
                this.setKatexShortkeys(ev, mf)
                that.latexData = that.getMathliveModifiedValue(mf.getValue())
            })
            mf.addEventListener('input', (ev) => {
                that.latexData = that.getMathliveModifiedValue(mf.getValue())
            })

            // selection-change : listens to every change such as pointer change
            // mf.addEventListener('selection-change', (ev) => {
            //     console.log('selection-change ev', this.mf.getValue())
            // })

            this.$refs.mathfield.appendChild(mf)

            that.latexData = that.getMathliveModifiedValue(mf.getValue())
        },
        setKatexShortkeys (ev, mf) {
            const keyCode = ev.code
            let keystroke = ''
            if (ev.ctrlKey) {
                keystroke += 'ctrl+'
            }
            if (ev.altKey) {
                keystroke += 'alt+'
            }
            if (ev.shiftKey) {
                keystroke += 'shift+'
            }
            if (keyCode) {
                keystroke += '['+ keyCode +']'
            }
            if (keystroke === 'ctrl+[Enter]') {
                ev.preventDefault()
                this.mf.executeCommand('toggleVirtualKeyboard')
                this.toggleEdit()
                this.editor.chain().focus('end').run()
            }
            if (ev.key === 'گ') {
                ev.preventDefault()
                mf.insert('گ')
                setTimeout(()=> {
                    mf.executeCommand('undo')
                }, 100)
            }
            if (ev.key === 'پ' && ev.keyCode === 220) {
                ev.preventDefault()
                setTimeout(()=> {
                    mf.executeCommand('undo')
                    mf.insert('پ')
                }, 100)
            }
            for (let i = 0; i < katexShortkeys.length; i++) {
                if (keystroke === katexShortkeys[i].shortKey && katexShortkeys[i].class === 'math') {
                    ev.preventDefault()
                    mf.insert(katexShortkeys[i].insert)
                }
            }
            if (this.editor.editorOptions.persianKeyboard) {
                for (let i = 0; i < katexShortkeys.length; i++) {
                    if (keystroke === katexShortkeys[i].shortKey && katexShortkeys[i].class === 'persian') {
                        ev.preventDefault()
                        mf.insert(katexShortkeys[i].insert)
                    }
                }
            }
        }
    }
}

export default MixinComponentFormula
