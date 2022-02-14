const MixinComponentReading = {
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
            type: Object
        }
    }
}

export default MixinComponentReading
