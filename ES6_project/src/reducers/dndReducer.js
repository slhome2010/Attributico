import { DND_MERGE_NODE, DND_REPLACE_PARENT, DND_SORT_NODE } from '../constants/actions'

export default function crud(state = {}, action) {
    switch (action.type) {
        case DND_MERGE_NODE :
            console.log('DnD Reduced action', action.type)
            return { ...state, 
                tree: action.tree,
                sourceNode: action.sourceNode, 
                targetNode: action.targetNode,
                activeNode: action.targetNode,
                selfReload: false
             }         
        case DND_REPLACE_PARENT : 
        console.log('DnD Reduced action', action.type)
            return { ...state, 
                tree: action.tree,
                sourceNode: action.sourceNode, 
                targetNode: action.targetNode,
                activeNode: action.sourceNode,
                selfReload: false
             }         
        case DND_SORT_NODE :          
            console.log('DnD Reduced action', action.type)
            return { ...state, 
                tree: action.tree,
                sourceNode: action.sourceNode, 
                targetNode: action.targetNode,
                activeNode: action.sourceNode,
                selfReload: action.selNodes ? true : false
             }         
        default:
            return state;
    }
}