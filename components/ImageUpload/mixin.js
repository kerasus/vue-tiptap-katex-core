const MixinComponentPoem = {
    props: {
        node: {
            type: Object,
            required: true
        },
        updateAttributes: {
            type: Function,
            required: true,
        },
        // postAction,
        // putAction
    },
    data() {
        return {
            vertical: 0,
            toggleJustify: null,
            width: 0,
            height: 0,
            top: 0,
            left: 20,
            editMode: true,
            // postAction: '/api/v1/question/upload/5ffdf5345590063ba07fad54',
            // putAction: '/api/v1/question/upload/5ffdf5345590063ba07fad54',
            url: '',
            files: [],
            accept: 'image/png,image/gif,image/jpeg,image/webp',
            extensions: 'gif,jpg,jpeg,png,webp',
            // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
            // extensions: /\.(gif|jpe?g|png|webp)$/i,
            minSize: 1,
            size: 1024 * 1024 * 10,
            multiple: true,
            directory: false,
            drop: true,
            dropDirectory: true,
            createDirectory: false,
            addIndex: false,
            thread: 3,
            name: 'file',
            // postAction: '/upload/post',
            // putAction: '/upload/put',
            data: {
                // '_csrf_token': 'xxxxxx',
            },
            autoCompress: 1024 * 1024,
            uploadAuto: false,
            addData: {
                show: false,
                name: '',
                type: '',
                content: '',
            },
            editFile: {
                show: false,
                name: '',
            },
        }
    },
    computed: {
        accessToken () {
            return this.node.attrs.token
        },
        headers () {
            return {
                Authorization: 'Bearer ' + this.accessToken
            }
        },
        postAction () {
            return this.node.attrs.upload
        },
        putAction() {
            return this.node.attrs.upload
        },
    },
    watch: {
        vertical () {
            console.log('vertical', this.vertical)
        },
        'node.attrs.justify' () {
            if (this.node.attrs.justify === 'right') {
                this.left = (this.$refs.resizer.clientWidth) - (this.width) - 20
            }

            if (this.node.attrs.justify === 'left') {
                this.left = 20
            }

            this.toggleJustify = this.node.attrs.justify
        },
        'editFile.show'(newValue, oldValue) {
            if (!newValue && oldValue) {
                this.$refs.upload.update(this.editFile.id, { error: this.editFile.error || '' })
            }
            if (newValue) {
                this.$nextTick( () => {
                    if (!this.$refs.editImage) {
                        return
                    }
                    let cropper = new Cropper(this.$refs.editImage, {
                        autoCrop: false,
                    })
                    this.editFile = {
                        ...this.editFile,
                        cropper
                    }
                })
            }
        },
        'addData.show'(show) {
            if (show) {
                this.addData.name = ''
                this.addData.type = ''
                this.addData.content = ''
            }
        },
    },
    methods: {
        dragstop (object) {
            this.vertical = object.top
            this.updateAttributes({
                vertical: -1 * this.vertical
            })
        },
        setJustify (justify) {
            this.updateAttributes({
                justify
            })
        },
        resize(newRect) {
            // this.width = newRect.width;
            // this.height = newRect.height;
            console.log(newRect)
            this.updateAttributes({
                width: newRect.width,
                height: newRect.height
            })
        },
        copyImageAddress (url) {
            const el = document.createElement('textarea')
            el.value = '![](' + url + ')'
            document.body.appendChild(el)
            el.select()
            document.execCommand('copy')
            document.body.removeChild(el)
            this.$notify({
                group: 'notifs',
                title: 'توجه',
                text: 'آدرس فایل به کلیپبورد منتقل شد',
                type: 'success'
            })
        },
        formatSize (size) {
            if (size > 1024 * 1024 * 1024 * 1024) {
                return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
            } else if (size > 1024 * 1024 * 1024) {
                return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
            } else if (size > 1024 * 1024) {
                return (size / 1024 / 1024).toFixed(2) + ' MB'
            } else if (size > 1024) {
                return (size / 1024).toFixed(2) + ' KB'
            }
            return size.toString() + ' B'
        },
        inputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                // Before adding a file
                // 添加文件前
                // Filter system files or hide files
                // 过滤系统文件 和隐藏文件
                if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                    return prevent()
                }
                // Filter php html js file
                // 过滤 php html js 文件
                if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                    return prevent()
                }
                // Automatic compression
                // 自动压缩
                if (newFile.file && newFile.error === '' && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
                    newFile.error = 'compressing'
                    const imageCompressor = new ImageCompressor(null, {
                        convertSize: 1024 * 1024,
                        maxWidth: 512,
                        maxHeight: 512,
                    })
                    imageCompressor.compress(newFile.file)
                        .then((file) => {
                            this.$refs.upload.update(newFile, { error: '', file, size: file.size, type: file.type })
                        })
                        .catch((err) => {
                            this.$refs.upload.update(newFile, { error: err.message || 'compress' })
                        })
                }
            }
            if (newFile && newFile.error === '' && newFile.file && (!oldFile || newFile.file !== oldFile.file)) {
                // Create a blob field
                // 创建 blob 字段
                newFile.blob = ''
                let URL = (window.URL || window.webkitURL)
                if (URL) {
                    newFile.blob = URL.createObjectURL(newFile.file)
                }
                // Thumbnails
                // 缩略图
                newFile.thumb = ''
                if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                    newFile.thumb = newFile.blob
                }
            }
            // image size
            // image 尺寸
            if (newFile && newFile.error === '' && newFile.type.substr(0, 6) === 'image/' && newFile.blob && (!oldFile || newFile.blob !== oldFile.blob)) {
                newFile.error = 'image parsing'
                let img = new Image();
                img.onload = () => {
                    this.$refs.upload.update(newFile, {error: '', height: img.height, width: img.width})
                }
                img.οnerrοr = () => {
                    this.$refs.upload.update(newFile, { error: 'parsing image size'})
                }
                img.src = newFile.blob
            }
        },
        updateNodeAfterUpload () {
            this.files.forEach((file) => {
                if (file.response.url) {
                    this.updateAttributes({
                        url: file.response.url,
                        width: file.width,
                        height: file.height
                    })
                    this.height = file.height
                    this.width = file.width
                }
            })
        },
        // add, update, remove File Event
        inputFile(newFile, oldFile) {
            if (newFile && oldFile) {
                // update
                if (newFile.active && !oldFile.active) {
                    // beforeSend
                    // min size
                    if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
                        this.$refs.upload.update(newFile, { error: 'size' })
                    }
                }
                if (newFile.progress !== oldFile.progress) {
                    // progress
                }
                if (newFile.error && !oldFile.error) {
                    // error
                }
                if (newFile.success && !oldFile.success) {
                    // success
                    this.updateNodeAfterUpload()
                }
            }
            if (!newFile && oldFile) {
                // remove
                if (oldFile.success && oldFile.response.id) {
                    // $.ajax({
                    //   type: 'DELETE',
                    //   url: '/upload/delete?id=' + oldFile.response.id,
                    // })
                }
            }
            // Automatically activate upload
            if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
                if (this.uploadAuto && !this.$refs.upload.active) {
                    this.$refs.upload.active = true
                }
            }
        },
        alert(message) {
            alert(message)
        },
        onEditFileShow(file) {
            this.editFile = { ...file, show: true }
            this.$refs.upload.update(file, { error: 'edit' })
        },
        onEditorFile() {
            if (!this.$refs.upload.features.html5) {
                this.alert('Your browser does not support')
                this.editFile.show = false
                return
            }
            let data = {
                name: this.editFile.name,
                error: '',
            }
            if (this.editFile.cropper) {
                let binStr = atob(this.editFile.cropper.getCroppedCanvas().toDataURL(this.editFile.type).split(',')[1])
                let arr = new Uint8Array(binStr.length)
                for (let i = 0; i < binStr.length; i++) {
                    arr[i] = binStr.charCodeAt(i)
                }
                data.file = new File([arr], data.name, { type: this.editFile.type })
                data.size = data.file.size
            }
            this.$refs.upload.update(this.editFile.id, data)
            this.editFile.error = ''
            this.editFile.show = false
        },
        // add folder
        onAddFolder() {
            if (!this.$refs.upload.features.directory) {
                this.alert('Your browser does not support')
                return
            }
            let input = document.createElement('input')
            input.style = 'background: rgba(255, 255, 255, 0);overflow: hidden;position: fixed;width: 1px;height: 1px;z-index: -1;opacity: 0;'
            input.type = 'file'
            input.setAttribute('allowdirs', true)
            input.setAttribute('directory', true)
            input.setAttribute('webkitdirectory', true)
            input.multiple = true
            document.querySelector('body').appendChild(input)
            input.click()
            input.onchange = () => {
                this.$refs.upload.addInputFile(input).then(function() {
                    document.querySelector('body').removeChild(input)
                })
            }
        },
        onAddData() {
            this.addData.show = false
            if (!this.$refs.upload.features.html5) {
                this.alert('Your browser does not support')
                return
            }
            let file = new window.File([this.addData.content], this.addData.name, {
                type: this.addData.type,
            })
            this.$refs.upload.add(file)
        }
    },
    created() {
        setTimeout(() => {
            if (this.node.attrs.url) {
                this.editMode = false
                this.height = this.node.attrs.height
                this.width = this.node.attrs.width
                if (!this.width && !this.height) {
                    this.width = 100
                    this.height = 100
                }
                this.vertical = -1 * this.node.attrs.vertical
                this.top = this.vertical
            }

            if (this.node.attrs.justify === 'right') {
                this.left = (this.$refs.resizer.clientWidth) - (this.width) - 20
            }

            if (this.node.attrs.justify === 'left') {
                this.left = 20
            }


            this.toggleJustify = this.node.attrs.justify
        }, 550)

    }
}

export default MixinComponentImageUpload
