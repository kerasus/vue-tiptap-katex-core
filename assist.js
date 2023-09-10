import katex from 'katex'

export const convertToTiptap = (string) => { //call this function when you want to convert pure HTML to tiptap format
    if (string === null || typeof string === 'undefined') {
        return ''
    }
    string = string.replaceAll('¬', '&#8202;')
    string = string.replaceAll('­', '&#8202;')
    string = string.replaceAll('', ' ')
    string = removeEmptyFormulaElements(string)
    // string = modifySpecialElements(string)
    string = convertKatex(string)
    // string = convertImage(string)
    return string
}
export const convertKatex = (string) => {
    string = string.replaceAll('\\[ ', '\\[')
    string = string.replaceAll(' \\]', '\\]')
    string = string.replaceAll(' $', '$')
    string = string.replaceAll('$ ', '$')

    let regex = getRegexPatternForFormula()
    string = string.replace(regex, (match) => {
        let finalMatch
        if (match.includes('$$')) {
            finalMatch = match.slice(2, -2)
        } else if (match.includes('$')) {
            finalMatch = match.slice(1, -1)
        } else {
            finalMatch = match.slice(2, -2)
        }
        finalMatch = finalMatch.replaceAll('&amp;', '&').replaceAll('&nbsp;', ' ')
        finalMatch = finalMatch.replaceAll('&amp;', '&')
        if (finalMatch.includes('\\~')) {
            finalMatch = finalMatch.replaceAll('~', 'sim ')
        }
        finalMatch = correctCurlyBrackets(finalMatch)
        return '<span data-katex="true">$' + finalMatch + '$</span>'
    })

    return string
}
export const convertImage = (string) => {
    if (typeof window === 'undefined') {
        return string
    }
    let wrapper = document.createElement('div');
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
                'data-vertical="' + marginBottom + '"  alt=""' +
                '></img>'
            let imageWrapper = document.createElement('span')
            imageWrapper.innerHTML = imageHTML
            item.parentElement.replaceWith(imageWrapper.children[0])
        }
    })
    return wrapper.innerHTML
}

// todo: refactor: modify method name
export const removeEmptyFormulaElements = (htmlElement) => {
    if (typeof window === 'undefined') {
        return ''
    }
    let parser = new DOMParser()
    let document = parser.parseFromString(htmlElement, 'text/html')
    document.querySelectorAll('span[data-katex]').forEach(spanEl => {
        if (spanEl.innerHTML === '$$' || spanEl.innerHTML === '') {
            spanEl.remove()
        }
    })
    return document.querySelector('body').innerHTML
}
export const correctCurlyBrackets = (input) => {
    const regex = /(\\begin{array})(.*?)(\\end{array)./gms
    return input.replaceAll(regex, (result) => {
        const lastCharOfResult = result.substring(result.length - 1)
        let finalResult = result
        // if (lastCharOfResult === '?'){
        //     finalResult = result.substring(0,result.length-1) + ')'
        // }
        if (lastCharOfResult !== '}') {
            finalResult = result.substring(0, result.length - 1) + '}' + lastCharOfResult
        }
        return finalResult
    })
}
// todo: modify method : method must find elements outside data-katex
export const modifySpecialElements = (input) => {
    if (input.includes('$')) {
        return input.replaceAll('$', '&#x24;')
    }
    return input
}
export const getRegexPatternForFormula = () => {
    return /(\${2}((?!\$\$).)+?\${2})|(\${1}((?!\$).)+?\${1})|(\\\[.+?\\\])|(\[\\.+?\]\\)/gms;
}
export const replaceKatexSigns = (string) => {
    return string
        .replaceAll('&amp;', '&')
        .replaceAll(/&lt;/g, '<')
        .replaceAll(/&gt;/g, '>')
        .replaceAll('&amp;', '&')
        .replaceAll('&nbsp;', ' ')
        .replaceAll('\\mleft', '\\left')
        .replaceAll('\\mright', '\\right')
}
export const renderKatexToHTML = (input, katexConfig = {
    throwOnError: false,
    strict: 'warn',
    safe: true,
    trust: true
}) => {
    let string = input
    string = convertToTiptap(string)
    let regex = getRegexPatternForFormula()
    string = string.replace(regex, (match) => {
        let finalMatch
        if (match.includes('$')) {
            finalMatch = match.slice(1, -1)
        } else {
            finalMatch = match.slice(2, -2)
        }
        if (finalMatch) {
            finalMatch = replaceKatexSigns(finalMatch)
        }
        return katex.renderToString(finalMatch, katexConfig)
    })
    return string
}
