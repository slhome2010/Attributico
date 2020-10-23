/** Backend functions for moveNode works with list of nodes for one of language
 * no matter from language_id.
 * There are using only node_id (attribute_id or gruop_id) in Sql query   **/
/* sourceNode, targetNode, clipboard (or selNodes), ctrlKey, direct (hitMode : before?after?over), store */
import { dndMergeNode, dndSortNode, dndReplaceParent } from '../actions'
import { deSelectNodes, getSelectedKeys } from './Select';

export function moveNode(sourceNode, targetNode, clipboard, ctrlKey, direct, store) {
    
    let targetLevel = targetNode.getLevel();
    let sourceLevel = sourceNode.getLevel();    
    let replace = targetNode.getParent() !== sourceNode.getParent();
    let merge = ctrlKey && (targetLevel === sourceLevel);
    let url = '';
    let dispatchAction = null;

    if (merge && !confirm(textConfirm)) {
        return;
    }

    if (clipboard) {
        $.each(clipboard, function (i, selNode) {
            if (merge) {
                selNode.remove();
            } else {
                selNode.moveTo(targetNode, direct);
            }
        });
    } else {
        if (merge) {
            sourceNode.remove();
        } else {
            sourceNode.moveTo(targetNode, direct);
        }
    }
    if (merge) {
        url = 'index.php?route=' + extension + 'module/attributico/mergeAttributeGroup';        
        dispatchAction = dndMergeNode;
    } else if (replace) {
        url = 'index.php?route=' + extension + 'module/attributico/replaceAttributeGroup';        
        dispatchAction = dndReplaceParent;
    } else {
        url = 'index.php?route=' + extension + 'module/attributico/sortAttributeGroup';        
        dispatchAction = dndSortNode;
    }
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
            'subjects': clipboard ? getSelectedKeys(clipboard) : [sourceNode.key],
            'group': targetNode.getParent().key,
            'target': targetNode.key,
            'direct': direct
        },
        url: url,
        success: () => {
            store.dispatch(dispatchAction(targetNode.tree, sourceNode, targetNode, clipboard));
            deSelectNodes();
        }
    });
}