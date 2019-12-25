/* Add methods to _FancytreeNodeClass */
/**
 * Return first parent node with key_prefix by key or null if not found
 * @returns {FancytreeNode}
 *
 **/
export const getParentByKey = $.ui.fancytree._FancytreeNodeClass.prototype.getParentByKey = function (key) {
    key = (key == null) ? null : "" + key;

    var node = this;

    if (key != null && key !== this.key) {
        while (node.key.indexOf(key) && !node.isRootNode()) {
            node = node.getParent();
        }
    }
    return !node.isRootNode() ? node : null;
};
/**
 * Return first sibling or parent not selected node
 * @returns {FancytreeNode}
 *
 **/
export const findUnselectedSibling = $.ui.fancytree._FancytreeNodeClass.prototype.findUnselectedSibling = function () {
    var siblingNode = this.getNextSibling() || this.getPrevSibling() || this.getParent();
    while (siblingNode.isSelected() && !siblingNode.isRootNode()) {
        siblingNode = siblingNode.getPrevSibling() || siblingNode.getParent();
    }
    return siblingNode;
};
/**
 * Return language_id from node.tree.selector
 * @returns (int){id}
 *
 **/
export const getLanguageId = $.ui.fancytree._FancytreeNodeClass.prototype.getLanguageId = function () {
    var selector = this.tree.$div[0].id;
    var lng_id = parseInt(selector.replace(/\D+/ig, ''));
    return lng_id;
};
/**
 * Return permission for node action
 * @returns boolean
 *
 **/
export const permission = $.ui.fancytree._FancytreeNodeClass.prototype.permission = function (actions) {   
    let permission = false;
    for (let i = 0; i < actions.length; i++) {
        permission = permission || !this.key.indexOf(actions[i]) && !this.unselectable;
    }
    return permission;
};