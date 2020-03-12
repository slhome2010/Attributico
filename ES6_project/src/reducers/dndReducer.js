import { DND_MERGE_NODE, DND_REPLACE_PARENT, DND_SORT_NODE, UPDATE_NODE, COPY_NODE } from '../constants/actions'

export default function dnd(state = {}, action) {
    switch (action.type) {
        case DND_MERGE_NODE:
            console.log('DnD Reduced action', action.type)
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
            console.log('DnD Reduced action', action.type)
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
            console.log('DnD Reduced action', action.type)
            return {
                ...state,
                tree: action.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.sourceNode,
                altActiveNode: action.sourceNode,
                selfReload: action.selNodes ? true : false
            }
        case UPDATE_NODE:
            console.log('CruD Reduced action', action.type)
            return {
                ...state,
                tree: action.node.tree,
                sourceNode: null,
                targetNode: action.node,
                activeNode: action.node,
                altActiveNode: action.node.getParent(),
                selfReload: false
            }
        case COPY_NODE:
            console.log('CruD Reduced action', action.type)
            return {
                ...state,
                tree: action.targetNode.tree,
                sourceNode: null,
                targetNode: action.targetNode,
                activeNode: action.targetNode,
                altActiveNode: action.targetNode.getParent(),
                selfReload: true
            }
        default:
            return state;
    }
}