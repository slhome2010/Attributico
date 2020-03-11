import { COPY_NODE, RENAME_NODE, ADD_NODE, DELETE_NODE } from '../constants/actions'

export default function crud(state = {}, action) {
    switch (action.type) {
        case COPY_NODE:
        case RENAME_NODE:
       
        case DELETE_NODE:
            console.log('Reduced action', action)
            return { count: state.count + 1 };
        default:
            return state;
    }
}