import {TableCell} from '@tiptap/extension-table-cell';

const CustomTable = TableCell.extend({
    addAttributes() {
        // Return an object with attribute configuration
        return {
            backgroundColor: {
                default: 'white',
                renderHTML: attributes => {
                    return {
                        style: `background-color: ${attributes.backgroundColor}`,
                    }
                },
            },
            borderRight: {
                default: '2px solid rgba(114, 114, 114, 1)',
                renderHTML: attributes => {
                    return {
                        style: `border-right: ${attributes.borderRight}`
                    }
                }
            },
            borderLeft: {
                default: '2px solid rgba(114, 114, 114, 1)',
                renderHTML: attributes => {
                    return {
                        style: `border-left: ${attributes.borderLeft}`
                    }
                }
            },
            borderTop: {
                default: '2px solid rgba(114, 114, 114, 1)',
                renderHTML: attributes => {
                    return {
                        style: `border-top: ${attributes.borderTop}`
                    }
                }
            },
            borderBottom: {
                default: '2px solid rgba(114, 114, 114, 1)',
                renderHTML: attributes => {
                    return {
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
