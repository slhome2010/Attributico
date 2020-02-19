import { DND_MERGE_NODE, DND_REPLACE_PARENT, DND_SORT_NODE } from '../constants/actions'

export default function crud(state = { count : 0}, action) {
    switch (action.type) {
        case DND_MERGE_NODE :
        case DND_REPLACE_PARENT : 
        case DND_SORT_NODE :          
            console.log('DnD Reduced action', action)
            return { count: state.count + 1};          
        default:
            return state;
    }
}