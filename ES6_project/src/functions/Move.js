/** Backend functions for moveNode works with list of nodes for one of language
 * no matter from language_id.
 * There are using only node_id (attribute_id or gruop_id) in Sql query   **/
/* sourceNode, targetNode, clipboard (or selNodes), ctrlKey, direct (hitMode : before?after?over), store */
import { dndMergeNode, dndSortNode, dndReplaceParent } from '../actions'
import { deSelectNodes, getSelectedKeys } from './Select';

export async function moveNode(sourceNode, targetNode, clipboard, ctrlKey, direct, store) {

    let targetLevel = targetNode.getLevel();
    let sourceLevel = sourceNode.getLevel();
    let replace = targetNode.getParent() !== sourceNode.getParent();
    let merge = ctrlKey && (targetLevel === sourceLevel);
    let url = '';
    let dispatchAction = null;
    let sourceGroup = sourceNode.getParentGroup();
    let affectedNodes;

    if (merge && !confirm(textConfirm)) {
        return;
    }

    if (clipboard) { //TODO maid it async and self false in reducer
        clipboard.forEach(async clipNode => {
            if (merge) {
                await moveChidren(clipNode, targetNode, direct)
                clipNode.remove();
            } else {
                clipNode.moveTo(targetNode, direct);
            }
        });
    } else {
        if (merge) {
            await moveChidren(sourceNode, targetNode, direct)
            sourceNode.remove();
        } else {
            sourceNode.moveTo(targetNode, direct);
        }
    }

    if (merge) {
        url = 'index.php?route=' + extension + 'module/attributico/mergeAttributeGroup';
        affectedNodes = sourceNode.isGroup() ? null : [sourceGroup, targetNode.getParentGroup()]
        dispatchAction = dndMergeNode;
    } else if (replace) {
        url = 'index.php?route=' + extension + 'module/attributico/replaceAttributeGroup';
        affectedNodes = [sourceGroup, targetNode.getParentGroup()]
        dispatchAction = dndReplaceParent;
    } else {
        url = 'index.php?route=' + extension + 'module/attributico/sortAttributeGroup';
        if (sourceNode.isGroup()) {
            affectedNodes = null
        } else {
            affectedNodes = [targetNode.getParentGroup()]
        }
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
            store.dispatch(dispatchAction(sourceNode, targetNode, affectedNodes));
            deSelectNodes();
        }
    });
}

async function moveChidren(sourceNode, targetNode, direct) {
    if (sourceNode.isGroup()) {
        let attributes = sourceNode.getChildren()
        let l = attributes.length
        while (l > 0) {
            await attributes[0].moveTo(targetNode, direct);
            l--
        }
    }
}