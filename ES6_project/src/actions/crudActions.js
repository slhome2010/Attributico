import { COPY_NODE, RENAME_NODE, UPDATE_NODE, DELETE_NODE } from '../constants/actions'

export function copyNode (targetNode) {
	return {
		type: COPY_NODE,		
		targetNode
	}
}

export function renameNode (node) {
	return {
		type: RENAME_NODE,
		node
	}
}

export function updateNode (node) {
	return {
		type: UPDATE_NODE,
		node
	}
}

export function deleteNode (node) {
	return {
		type: DELETE_NODE,
		node
	}
}