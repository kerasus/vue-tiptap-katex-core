import {TableCell} from '@tiptap/extension-table-cell';

const CustomTable = TableCell.extend({
    addAttributes() {
        // Return an object with attribute configuration
        return {
            backgroundColor: {
                default: 'white',
                parseHTML: element => element.getAttribute('data-background-color'),
                renderHTML: attributes => {
                    return {
                        'data-background-color': attributes.backgroundColor,
                        style: `background-color: ${attributes.backgroundColor}`,
                    }
                },
            },
            borderRight: {
                default: '2px solid rgba(114, 114, 114, 1)',
                parseHTML: element => element.getAttribute('data-border-right'),
                renderHTML: attributes => {
                    return {
                        'data-border-right': attributes.borderRight,
                        style: `border-right: ${attributes.borderRight}`
                    }
                }
            },
            borderLeft: {
                default: '2px solid rgba(114, 114, 114, 1)',
                parseHTML: element => element.getAttribute('data-border-left'),
                renderHTML: attributes => {
                    return {
                        'data-border-left': attributes.borderLeft,
                        style: `border-left: ${attributes.borderLeft}`
                    }
                }
            },
            borderTop: {
                default: '2px solid rgba(114, 114, 114, 1)',
                parseHTML: element => element.getAttribute('data-border-top'),
                renderHTML: attributes => {
                    return {
                        'data-border-top': attributes.borderTop,
                        style: `border-top: ${attributes.borderTop}`
                    }
                }
            },
            borderBottom: {
                default: '2px solid rgba(114, 114, 114, 1)',
                parseHTML: element => element.getAttribute('data-border-bottom'),
                renderHTML: attributes => {
                    return {
                        'data-border-bottom': attributes.borderBottom,
                        style: `border-bottom: ${attributes.borderBottom}`
                    }
                }
            },
            borderCollapse: {
                default: 'collapse',
                renderHTML: attributes => {
                    return {
                        style: `border-collapse: ${attributes.borderCollapse}`
                    }
                }
            },
            // position: {
            //     default: '1px',
            //     renderHTML: attributes => {
            //         return {
            //             style: `margin: ${attributes.position} !important`
            //         }
            //     }
            // },
            colspan: {
                default: 1,
            },
            rowspan: {
                default: 1,
            },
            colwidth: {
                default: null,
                parseHTML: element => {
                    const colwidth = element.getAttribute('colwidth')
                    const value = colwidth
                        ? [parseInt(colwidth, 10)]
                        : null

                    return value
                },
            },
        }
    }
})

export default CustomTable;
export { CustomTable };
