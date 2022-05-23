import {TableRow} from '@tiptap/extension-table-row';

const CustomTable = TableRow.extend({
    content: 'tableCell*',
})

export default CustomTable;
export { CustomTable };
