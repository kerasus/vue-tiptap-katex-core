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
        editor: {
            type: Object
        }
    },
    mounted () {
    }
}

export default MixinComponentPoem
