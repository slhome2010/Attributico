import { COPY_NODE, RENAME_NODE, ADD_NODE, DELETE_NODE } from '../constants/actions'

export function copyNode (node) {
	return {
		type: COPY_NODE,
		node
	}
}

export function renameNode (node) {
	return {
		type: RENAME_NODE,
		node
	}
}

export function addNode (node) {
	return {
		type: ADD_NODE,
		node
	}
}

export function deleteNode (node) {
	return {
		type: DELETE_NODE,
		node
	}
}