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
            formula: '',
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
            // formula is a string, the default value as sth to click on to load MathLive
            if (newValue === 'formula') {
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
            return katex.renderToString(purifiedKatex, {
                throwOnError: false,
                safe: true,
                trust: true
            })
        }
    },
    created() {
        this.katex = this.node.attrs.katex.toString()
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
        // },
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
        getMathliveValue (mf) {
            return mf.getValue()
                .replaceAll('\\mleft', '\\left')
                .replaceAll('\\mright', '\\right')
                .replaceAll('&amp;', '&')
                .replaceAll(/&lt;/g, '<')
                .replaceAll(/&gt;/g, '>')
                .replaceAll('&amp;', '&')
                .replaceAll('&nbsp;', ' ')
        },
        loadMathLive() {
            let mathliveOptions = {
                customVirtualKeyboardLayers: EXTRA_KEYBOARD_LAYER,
                customVirtualKeyboards: EXTRA_KEYBOARD,
                virtualKeyboards: this.keyboardList,
                onKeystroke: (mathfield, keystroke /* , ev */) => {
                    // console.log('ev', ev)
                    // console.log('mathfield', mathfield)
                    if (keystroke === 'ctrl+[Enter]') {
                        this.mf.executeCommand('toggleVirtualKeyboard')
                        this.toggleEdit()
                        this.editor.chain().focus('end').run()
                        return false
                    }
                    for (let i = 0; i < katexShortkeys.length; i++) {
                        if (keystroke === katexShortkeys[i].shortKey && katexShortkeys[i].class === 'math') {
                            mf.insert(katexShortkeys[i].insert)
                            return false
                        }
                    }
                    if (this.editor.editorOptions.persianKeyboard) {
                        for (let i = 0; i < katexShortkeys.length; i++) {
                            if (keystroke === katexShortkeys[i].shortKey && katexShortkeys[i].class === 'persian') {
                                mf.insert(katexShortkeys[i].insert)
                                return false
                            }
                        }
                    }
                    // Keystroke not handled, return true for default handling to proceed.
                    return true;
                },
                mathModeSpace: '\\:',
                inlineShortcuts: {
                    'lim': { mode: 'math', value: '\\lim\\limits_{x \\to \\infty}' },
                },
            }
            Object.assign(mathliveOptions, this.editor.editorOptions.mathliveOptions)
            // this.katex = this.markdown.render(this.katex)
            let that = this
            const mf = new MathfieldElement(
                {
                    virtualKeyboardMode: 'manual',
                    onContentDidChange: (mf) => {
                        that.latexData = that.getMathliveValue(mf)
                    },
                });
            mf.setOptions(mathliveOptions);
            if (this.doesKatexHaveErrors()) {
                this.isFormulaBroken = true
            }
            mf.value = this.katex
            // formula is a string, the default value as sth to click on to load MathLive
            if (mf.value === 'formula') {
                // mathfield should have a preset value to be able to get clicked on, so we give it a space
                mf.value = '$\\enspace$'
            }
            this.mf = mf

            this.$refs.mathfield.appendChild(mf)

            // MathLive > 0.60
            // this.$refs.mathfield.setOptions({
            //   virtualKeyboardMode: 'manual',
            //   'customVirtualKeyboardLayers': EXTRA_KEYBOARD_LAYER,
            //   'customVirtualKeyboards': EXTRA_KEYBOARD,
            //   'virtualKeyboards': 'numeric functions symbols roman  greek matrix-keyboard others-keyboard extra-keyboard',
            //   mathModeSpace: '\\:'
            // });

            // console.log(mf.getOption())
            // mf.$setConfig(
            //     //{ macros: { ...mf.getConfig('macros'), smallfrac: '{}^{#1}\\!\\!/\\!{}_{#2}', }, }
            // );
            that.latexData = that.getMathliveValue(mf)
        }
    }
}

export default MixinComponentFormula
