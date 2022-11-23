import katex from 'katex'

const mixinConvertToTiptap = {
    methods: {
        convertToTiptap(string) { //call this function when you want to convert pure HTML to tiptap format
            if (string === null || typeof string === 'undefined') {
                return ''
            }
            string = string.replaceAll('¬', '&#8202;')
            string = string.replaceAll('­', '&#8202;')
            string = string.replaceAll('', ' ')
            string = this.convertKatex(string)
            // string = this.convertImage(string)
            return string
        },
        convertKatex(string) {
            string = string.replaceAll('\\[ ', '\\[')
            string = string.replaceAll(' \\]', '\\]')
            string = string.replaceAll(' $', '$')
            string = string.replaceAll('$ ', '$')

            let regex = this.getRegexPatternForFormula()
            string = string.replace(regex, (match) => {
                let finalMatch
                if (match.includes('$$')) {
                    finalMatch = match.slice(2, -2)
                } else if (match.includes('$')) {
                    finalMatch = match.slice(1, -1)
                } else {
                    finalMatch = match.slice(2, -2)
                }
                finalMatch = finalMatch.replace(/\\\[.*\\]/gms, (bracketMatch) => {
                    if (finalMatch.indexOf('\\[') === 0 && finalMatch.indexOf('\\]') === finalMatch.length-2){
                        return bracketMatch.replace('\\[', '').replace('\\]', '')
                    }
                    return bracketMatch
                })
                finalMatch = finalMatch.replaceAll('&amp;', '&').replaceAll('&nbsp;', ' ')
                finalMatch = finalMatch.replaceAll('&amp;', '&')
                if (finalMatch.includes('\\~')) {
                    finalMatch = finalMatch.replaceAll('~', 'sim ')
                }
                finalMatch = this.correctParenthesis(finalMatch)
                finalMatch = this.correctCurlyBrackets(finalMatch)
                return '<span data-katex="true">$' + finalMatch + '$</span>'
            })

            return string
        },
        convertImage(string) {
            var wrapper = document.createElement('div')
            wrapper.innerHTML = string
            let imagesParent = wrapper.querySelectorAll('span img')
            imagesParent.forEach(item => {
                let imageHTML = item.attributes[0].nodeValue
                if (imageHTML) {
                    let marginBottom = 0
                    if (item.style.top) {
                        marginBottom = item.style.top.slice(0, -2)
                    }
                    imageHTML =
                        '<img ' +
                        'src="' + item.attributes['src'].nodeValue + '" ' +
                        'width="' + item.attributes['width'].nodeValue + '" ' +
                        'height="' + item.attributes['height'].nodeValue + '" ' +
                        'data-vertical="' + marginBottom + '" ' +
                        '></img>'
                    var imageWrapper = document.createElement('span')
                    imageWrapper.innerHTML = imageHTML
                    item.parentElement.replaceWith(imageWrapper.children[0])
                }
            })
            return wrapper.innerHTML
        },
        correctParenthesis (input) {
            const regex = /(\\left\()(.*?)(\\right)./gms
            return input.replaceAll(regex, (result) => {
                const lastCharOfResult = result.substring(result.length-1)
                let finalResult = result
                if (lastCharOfResult === '?'){
                    finalResult = result.substring(0,result.length-1) + ')'
                }
                else if (lastCharOfResult !== ')') {
                    finalResult = result.substring(0,result.length-1) + ')' + lastCharOfResult
                }
                return finalResult
            })
        },
        correctCurlyBrackets (input) {
            const regex = /(\\begin{array})(.*?)(\\end{array)./gms
            return input.replaceAll(regex, (result) => {
                const lastCharOfResult = result.substring(result.length-1)
                let finalResult = result
                // if (lastCharOfResult === '?'){
                //     finalResult = result.substring(0,result.length-1) + ')'
                // }
                if (lastCharOfResult !== '}') {
                    finalResult = result.substring(0,result.length-1) + '}' + lastCharOfResult
                }
                return finalResult
            })
        },
        getRegexPatternForFormula() {
            return /(\${2}((?!\$\$).)+?\${2})|(\${1}((?!\$).)+?\${1})|(\\\[.+?\\\])|(\[\\.+?\]\\)/gms;
        },
        replaceKatexSigns(string) {
            return string
                .replaceAll('&amp;', '&')
                .replaceAll(/&lt;/g, '<')
                .replaceAll(/&gt;/g, '>')
                .replaceAll('&amp;', '&')
                .replaceAll('&nbsp;', ' ')
                .replaceAll('\\mleft', '\\left')
                .replaceAll('\\mright', '\\right')
        },
        renderKatexToHTML (input, katexConfig = {
            throwOnError: false,
            strict: 'warn',
            safe: true,
            trust: true
        }) {
            let string = input
            string = this.convertToTiptap(string)
            let regex = this.getRegexPatternForFormula()
            string = string.replace(regex, (match) => {
                let finalMatch
                if (match.includes('$')) {
                    finalMatch = match.slice(1, -1)
                } else {
                    finalMatch = match.slice(2, -2)
                }
                if (finalMatch){
                    finalMatch = this.replaceKatexSigns(finalMatch)
                }
                return katex.renderToString(finalMatch, katexConfig)
            })
            return string
        }
    }
}

export default mixinConvertToTiptap
