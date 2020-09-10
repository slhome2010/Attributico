export default function RefreshTree(contextTree) {

    let savedState = contextTree.options.autoCollapse;

    contextTree.reload();

    contextTree.options.autoCollapse = savedState;
}
