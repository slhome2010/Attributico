export default function RefreshTree(contextTree) {

    let currentActiveNode = contextTree.getActiveNode();
    let activeParent = currentActiveNode.getParent();
    let newActiveNode, newParent;
    
    contextTree.reload().done(function () {
        if (currentActiveNode !== null && !currentActiveNode.isTopLevel()) {
            newParent = contextTree.getNodeByKey(activeParent.key);
            // if parent node is lazy we need to expand it previously
            if (newParent !== null && newParent.isLazy()) { 
                newParent.setExpanded(true).done(function () {
                    newActiveNode = contextTree.getNodeByKey(currentActiveNode.key);                    
                    newActiveNode.setActive(true);
                });
            } else {
                // set new node active
                newActiveNode = contextTree.getNodeByKey(currentActiveNode.key);
                newActiveNode.setActive(true);
            }
        } else {
            // set active visible top level node
            contextTree.getRootNode().getFirstChild().setActive(true);
        }       
    });
}
