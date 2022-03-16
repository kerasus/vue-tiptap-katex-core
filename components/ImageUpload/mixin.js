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
            if (!err) {
                this.updateAttributes({
                    url: JSON.parse(file.serverId).url
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
                img.src = JSON.parse(file.serverId).url
            }
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
