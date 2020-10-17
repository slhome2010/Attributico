import { DND_MERGE_NODE, DND_REPLACE_PARENT, DND_SORT_NODE, DND_ADD_NODE, UPDATE_NODE, COPY_NODE, DELETE_NODE, RENAME_NODE, ADD_NODE, PASTE_NODE, CUT_NODE, CHECK_OPTIONS } from '../constants/actions'
import { GROUP_SYNCRO_TREES, ATTRIBUTE_SYNCRO_TREES, VALUE_SYNCRO_TREES } from "../constants/global";

export default function reload(state = {}, action) {
     console.log('Reduced action', action.type)

    switch (action.type) {
        case DND_MERGE_NODE:
            return {
                ...state,
                boundTrees: action.sourceNode.isGroup() ? GROUP_SYNCRO_TREES : ATTRIBUTE_SYNCRO_TREES,
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
                boundTrees: ATTRIBUTE_SYNCRO_TREES,
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
                boundTrees: action.sourceNode.isGroup() ? GROUP_SYNCRO_TREES : ATTRIBUTE_SYNCRO_TREES,
                tree: action.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.sourceNode,
                altActiveNode: action.sourceNode,
                selfReload: action.selNodes ? true : false // for correctly sorting if multiselect
            }        
        case DND_ADD_NODE:
            return {
                ...state,
                boundTrees: action.sourceNode.isGroup() ? GROUP_SYNCRO_TREES : ATTRIBUTE_SYNCRO_TREES,
                tree: action.sourceNode.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.sourceNode,
                altActiveNode: action.sourceNode.getParent(),
                selfReload: false
            }
            case RENAME_NODE:
        case UPDATE_NODE:
            return {
                ...state,
                boundTrees: action.node.isGroup() ? GROUP_SYNCRO_TREES : ATTRIBUTE_SYNCRO_TREES,
                tree: action.node.tree,
                sourceNode: null,
                targetNode: action.node,
                activeNode: action.node,
                altActiveNode: action.node.getParent(),
                selfReload: false                
            }
        case COPY_NODE:
            return {
                ...state,
                boundTrees: ATTRIBUTE_SYNCRO_TREES,
                tree: action.targetNode.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.targetNode.getFirstChild(),
                altActiveNode: action.targetNode,
                selfReload: true
            }
        case DELETE_NODE:
            return {
                ...state,
                boundTrees: action.node.isGroup() ? GROUP_SYNCRO_TREES : ATTRIBUTE_SYNCRO_TREES,
                tree: action.node.tree,
                sourceNode: action.node,
                targetNode: null,
                activeNode: action.node.findUnselectedSibling(),
                altActiveNode: action.node.getParent(),
                selfReload: action.node.isDuty() || action.node.isTemplate() || action.node.isValue() ? true : false
            }
        case PASTE_NODE:
            return {
                ...state,
                boundTrees: ATTRIBUTE_SYNCRO_TREES,
                tree: action.targetNode.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.targetNode.getFirstChild(),
                altActiveNode: action.targetNode,
                selfReload: true
            }
        case CHECK_OPTIONS:
            return {
                ...state,
                boundTrees: ATTRIBUTE_SYNCRO_TREES,
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