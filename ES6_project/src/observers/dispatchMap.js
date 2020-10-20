// File ,  function, action

const { moveNode } = require("../functions/Move");

CommonSettings.js, /*  event handler for cache on/off */,  store.dispatch(checkOptions());
CommonSettings.js, /*  // event handler for multistore categories output */,  store.dispatch(checkOptions());
SaveAfterEdit.js,  saveAfterEdit(event, data, store)/* Edit template */, store.dispatch(updateNode(data.node));
SaveAfterEdit.js,  saveAfterEdit(event, data, store)/* Edit value */, store.dispatch(updateNode(data.node));
SaveAfterEdit.js,  saveAfterEdit(event, data, store)/* Edit Attribute or Group */, store.dispatch(updateNode(data.node));
Crud.js, deleteAttribute(node, store), store.dispatch(deleteNode(node));
Crud.js, addAttributeToCategory(sourceNode, targetNode, clipboard, remove, store), store.dispatch(dndAddNode(sourceNode, targetNode, clipboard ? clipboard : [sourceNode]));
Crud.js, deleteAttributesFromCategory(sourceNode, targetNode, clipboard, store), store.dispatch(dndReplaceParent(targetNode.tree, sourceNode, targetNode, clipboard ? clipboard : [sourceNode]));
Crud.js, deleteDuty(node, store), store.dispatch(deleteNode(node));
Crud.js, pasteNodes(targetNode, lng_id, store), store.dispatch(copyNode(sourceNode, parentNode));
Move.js, moveNode(...) /* merge */, store.dispatch(dndMergeNode(targetNode.tree, sourceNode, targetNode, clipboard));
Move.js, moveNode(...) /* replace */, store.dispatch(dndReplaceParent(targetNode.tree, sourceNode, targetNode, clipboard));
Move.js, moveNode(...) /* sort */, store.dispatch(dndSortNode(targetNode.tree, sourceNode, targetNode, clipboard));