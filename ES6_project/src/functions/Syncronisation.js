import { ATTRIBUTE_SYNCRO_TREES, CATEGORY_TREE } from '../constants/global'

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

    $(CATEGORY_TREE).each(function (indx, element) {
        const tree = $("#" + element.id).fancytree("getTree");
        let activeNode = node !== null ? node : tree.getActiveNode();

        if (activeNode !== null && activeNode !== undefined) {
            tree.getNodeByKey(activeNode.key).setActive(false);
            tree.getNodeByKey(activeNode.key).setActive(true);
        }
    });
}

export function reloadAttribute() {
    $(ATTRIBUTE_SYNCRO_TREES).each(function (indx, element) {
        const tree = $("#" + element.id).fancytree("getTree");
        let activeNode = tree.getActiveNode();

        tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");
        tree.reload().done(function () {
            if (activeNode !== null) {
                tree.getNodeByKey(activeNode.key).setActive(true);
            }
        });
    });
}

export function smartReload(tree, nodeList) {
    nodeList.forEach(function (node) {
        let findedNode = tree.getNodeByKey(node.key);
        if (findedNode !== null) {
            findedNode.getChildren().forEach(function (child) {
                if (child.isTemplate() || child.isValue()) {
                    child.resetLazy();
                    child.load(true).done(function (result) {
                        //   console.log(tree.$div[0].id, child.key);
                    });
                }
            });
        }
    });
}