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

            let regex = /(\${1}((?!\$).)+?\${1})|(\${2}((?!\$).)+?\${2})|(\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])|(\[\\((?! ).){1}((?!\$).)*?((?! ).){1}\]\\)/gms;
            string = string.replace(regex, (match) => {
                let finalMatch
                if (match.includes('$$')) {
                    finalMatch = match.slice(2, -2)
                } else if (match.includes('$')) {
                    finalMatch = match.slice(1, -1)
                } else {
                    finalMatch = match.slice(2, -2)
                }
                //currently just testing
                // if (match.includes('\\[') && match.includes('\\]')){
                //     finalMatch = finalMatch.replaceAll('\\[', '').replaceAll('\\]', '')
                // }
                //currently just testing
                finalMatch = finalMatch.replaceAll('&amp;', '&').replaceAll('&nbsp;', ' ')
                finalMatch = finalMatch.replaceAll('&amp;', '&')
                finalMatch = finalMatch.replaceAll(/&lt;/g, '<').replaceAll(/&gt;/g, '>')
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
        replaceKatexSigns(string) {
            return string.replaceAll('&amp;', '&')
                .replaceAll(/&lt;/g, '<')
                .replaceAll(/&gt;/g, '>')
                .replaceAll('&amp;', '&')
                .replaceAll('&nbsp;', ' ')
        },
        renderKatexToHTML (input) {
            let string = input
            string = this.convertToTiptap(string)
            const regex = /(\${1}((?!\$).)+?\${1})|(\${2}((?!\$).)+?\${2})|(\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])|(\[\\((?! ).){1}((?!\$).)*?((?! ).){1}\]\\)/gms
            string = string.replace(regex, (match) => {
                let finalMatch
                if (match.includes('$$')) {
                    finalMatch = match.slice(2, -2)
                } else if (match.includes('$')) {
                    finalMatch = match.slice(1, -1)
                } else {
                    finalMatch = match.slice(2, -2)
                }
                return katex.renderToString(finalMatch, {
                    throwOnError: false,
                    strict: 'warn'
                })
            })
            return string
        }
    }
}

export default mixinConvertToTiptap
