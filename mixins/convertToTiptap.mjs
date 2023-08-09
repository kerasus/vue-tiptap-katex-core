import katex from 'katex'
import * as Assist from '../assist.js'

const mixinConvertToTiptap = {
    methods: {
        convertToTiptap(string) {
            return Assist.convertToTiptap(string)
        },
        convertKatex(string) {
            return Assist.convertKatex(string)
        },
        convertImage(string) {
            return Assist.convertImage(string)
        },
        // todo: refactor: modify method name
        removeEmptyFormulaElements (htmlElement) {
            return Assist.removeEmptyFormulaElements(htmlElement)
        },
        correctCurlyBrackets (input) {
            return Assist.correctCurlyBrackets(input)
        },
        // todo: modify method : method must find elements outside data-katex
        modifySpecialElements (input) {
            return Assist.modifySpecialElements(input)
        },
        getRegexPatternForFormula() {
            return Assist.getRegexPatternForFormula()
        },
        replaceKatexSigns(string) {
            return Assist.replaceKatexSigns(string)
        },
        renderKatexToHTML (input, katexConfig = {
            throwOnError: false,
            strict: 'warn',
            safe: true,
            trust: true
        }) {
            return Assist.renderKatexToHTML(input, katexConfig)
        }
    }
}

export default mixinConvertToTiptap