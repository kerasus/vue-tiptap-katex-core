const MixinComponentImageUpload = {
    data() {
        return {
            files: [],
            naturalWidth: 0,
            naturalHeight: 0
        }
    },
    mounted () {
        this.setNaturalSize()
    },
    methods: {
        getValidChainedObject (object, keys) {
            if (!Array.isArray(keys) && typeof keys !== 'string') {
                console.warn('keys must be array or string')
                return false
            }

            if (keys === '') {
                return object
            }

            let keysArray = keys
            if (typeof keys === 'string') {
                keysArray = keys.split('.')
            }

            if (keysArray.length === 1) {
                if (typeof object === 'undefined' || object === null || typeof object[keysArray[0]] === 'undefined') {
                    return null
                }
                return object[keysArray[0]]
            }

            if (typeof object[keysArray[0]] !== 'undefined' && object[keysArray[0]] !== null) {
                return this.getValidChainedObject(object[keysArray[0]], keysArray.splice(1))
            }

            return (typeof object[keysArray[0]] !== 'undefined' && object[keysArray[0]] !== null)
        },
        getImageKeyOfResponse () {
            const responseKey = this.editor.editorOptions.uploadServer.responseKey
            if (!responseKey) {
                return 'url'
            }

            return responseKey
        },
        getImageUrlFromResponse (response) {
            const responseKey = this.getImageKeyOfResponse()

            return this.getValidChainedObject(response, responseKey)
        },
        setNaturalSize () {
            if (this.node.attrs.url) {
                const node = this.node
                let img = new Image();
                let that = this
                img.onload = function () {
                    if (node.attrs.width && node.attrs.height) {
                        that.naturalHeight = node.attrs.height
                        that.naturalWidth = node.attrs.width
                    } else {
                        that.naturalHeight = img.naturalHeight
                        that.naturalWidth = img.naturalWidth
                    }
                };
                img.src = this.node.attrs.url
            }
        },
        onFileUpload (err, file) {
            if (err) {
                return
            }

            const imageUrl = this.getImageUrlFromResponse(JSON.parse(file.serverId))
            this.updateAttributes({
                url: imageUrl
            })
            let img = new Image();
            let that = this
            img.onload = function() {
                that.updateAttributes({
                    width: img.naturalWidth,
                    height: img.naturalHeight
                })
                that.setNaturalSize()
            };
            img.src = imageUrl
        },
        resizeEnd (event) {
            this.updateAttributes({
                width: event.width,
                height: event.height
            })
            if (this.editor.editorOptions.onResizeEnd) {
                this.updateAttributes({
                    url: this.editor.editorOptions.onResizeEnd(this.node.attrs.url, event.width, event.height)
                })
            }
        },
        dragEnd (event) {
            this.updateAttributes({
                vertical: event.top
            })
        }
    },
}

export default MixinComponentImageUpload
