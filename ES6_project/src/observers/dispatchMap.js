// File ,  function, action

const { moveNode } = require("../functions/Move");

*, CommonSettings.js, /*  event handler for cache on/off */,  store.dispatch(checkOptions());
*, CommonSettings.js, /*  // event handler for multistore categories output */,  store.dispatch(checkOptions());
*, UPDATE_NODE, SaveAfterEdit.js,  saveAfterEdit(event, data, store)/* Edit template */, store.dispatch(updateNode(data.node));
*, UPDATE_NODE, SaveAfterEdit.js,  saveAfterEdit(event, data, store)/* Edit value */, store.dispatch(updateNode(data.node));
*, UPDATE_NODE, SaveAfterEdit.js,  saveAfterEdit(event, data, store)/* Edit Attribute or Group */, store.dispatch(updateNode(data.node));
*, DELETE_NODE, Crud.js, deleteAttribute(node, store), store.dispatch(deleteNode(node, selNodes ? affectedAttributes : [node.getParentAttribute()]));
*, DELETE_NODE, Crud.js, deleteDuty(node, store), store.dispatch(deleteNode(node, null));
*, DND_ADD_NODE, Crud.js, addAttributeToCategory(sourceNode, targetNode, clipboard, remove, store), store.dispatch(dndAddNode(sourceNode, targetNode, clipboard ? clipboard : [sourceNode]));
*, DND_REPLACE_CATEGORY, Crud.js, deleteAttributesFromCategory(sourceNode, targetNode, clipboard, store), store.dispatch(dndReplaceCategory(targetTree, sourceNode, targetNode, clipboard ? clipboard : [sourceNode]));

*, COPY_NODE, Crud.js, pasteNodes(targetNode, lng_id, store), store.dispatch(copyNode(sourceNode, parentNode));
DND_MERGE_NODE, Move.js, moveNode(...) /* merge */, store.dispatch(dndMergeNode(targetNode.tree, sourceNode, targetNode, clipboard));
DND_REPLACE_PARENT, Move.js, moveNode(...) /* replace */, store.dispatch(dndReplaceParent(targetNode.tree, sourceNode, targetNode, clipboard));
DND_SORT_NODE, Move.js, moveNode(...) /* sort */, store.dispatch(dndSortNode(targetNode.tree, sourceNode, targetNode, clipboard));