import { COPY_NODE, RENAME_NODE, ADD_NODE, DELETE_NODE, UPDATE_NODE, PASTE_NODE, CUT_NODE } from '../constants/actions'

export default function crud(state = {}, action) {
    switch (action.type) {

        case RENAME_NODE:
        case UPDATE_NODE:
            return {
                ...state,
                tree: action.node.tree,
                sourceNode: null,
                targetNode: action.node,
                activeNode: action.node,
                altActiveNode: action.node.getParent(),
                selfReload: false,
                affilateValue: action.node.getParent().getNextSibling(),
                affilateTemplate: action.node.getParent().getPrevSibling()
            }
        case COPY_NODE:
            return {
                ...state,
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
                tree: action.targetNode.tree,
                sourceNode: action.sourceNode,
                targetNode: action.targetNode,
                activeNode: action.targetNode.getFirstChild(),
                altActiveNode: action.targetNode,
                selfReload: true
            }

        default:
            return state;
    }
}