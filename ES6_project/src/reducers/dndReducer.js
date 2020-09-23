import { DND_MERGE_NODE, DND_REPLACE_PARENT, DND_SORT_NODE, UPDATE_NODE, COPY_NODE, DELETE_NODE, DND_ADD_NODE, CHECK_OPTIONS } from '../constants/actions'
//import { findUnselectedSibling } from '../functions/Plugin/NodeMethod';

export default function dnd(state = {}, action) {
    /*  console.log('Reduced action', action.type) */

    switch (action.type) {
        case DND_MERGE_NODE:
            return {
                ...state,
                tree: action.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.targetNode,
                altActiveNode: action.targetNode,
                selfReload: false
            }
        case DND_REPLACE_PARENT:
            return {
                ...state,
                tree: action.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.sourceNode,
                altActiveNode: action.sourceNode,
                selfReload: false
            }
        case DND_SORT_NODE:
            return {
                ...state,
                tree: action.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.sourceNode,
                altActiveNode: action.sourceNode,
                selfReload: action.selNodes ? true : false
            }        
        case DND_ADD_NODE:
            return {
                ...state,
                tree: action.sourceNode.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.sourceNode,
                altActiveNode: action.sourceNode.getParent(),
                selfReload: false
            }
        case CHECK_OPTIONS:
            return {
                ...state,
                tree: null,
                sourceNode: null,
                targetNode: null,
                activeNode: null,
                altActiveNode: null,
                selfReload: true
            }
        default:
            return state;
    }
}