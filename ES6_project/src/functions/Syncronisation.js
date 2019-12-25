/* import  'jquery.fancytree';
 */
/* Clear Filter if tree reload */
function ClearFilter(tree) {
    if (tree.isFilterActive()) {
        tree.clearFilter();

        $('input[name *= "search"]').val("");
        $('span[id *= "matches"]').text("");
        $("[id ^=loadImg]").hide();
    }
}

/* Functions for trees handling logic */
export function reactivateCategory() {
    let node = arguments.length !== 0 ? arguments[0] : null;

    CATEGORY_TREE.each(function (indx, element) {
        const tree = $("#" + element.id).fancytree("getTree");
        let activeNode = node !== null ? node : tree.getActiveNode();

        if (activeNode !== null && activeNode !== undefined) {
            tree.getNodeByKey(activeNode.key).setActive(false);
            tree.getNodeByKey(activeNode.key).setActive(true);
        }
    });
}

export function reloadAttribute() {
    if (arguments.length == 0) {
        ATTRIBUTE_SYNCRO_TREES.each(function (indx, element) {
            const tree = $("#" + element.id).fancytree("getTree");
            let activeNode = tree.getActiveNode();

            ClearFilter(tree);

            tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");
            tree.reload().done(function () {
                tree.options.source.data.isPending = false;
                if (activeNode !== null)
                    tree.getNodeByKey(activeNode.key).setActive(true);
            });
        });
    } else {
        var node = arguments[0];
        var self = arguments[1];
        ATTRIBUTE_SYNCRO_TREES.each(function (indx, element) {
            var tree = $("#" + element.id).fancytree("getTree");
            tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");
            if ((tree !== node.tree) || self) { // not reload active tree
                ClearFilter(tree);
                tree.reload().done(function () {
                    tree.options.source.data.isPending = false;
                    var newnode = tree.getNodeByKey(node.key); // || node.getNextSibling() || node.getPrevSibling() || node.getParent(); // ????
                    if (newnode && newnode !== undefined) {
                        newnode.setActive();
                    }
                });
            }
        });
        if (!self) {
            node.setActive();
        }
        // reactivateCategory(node);
    }
}