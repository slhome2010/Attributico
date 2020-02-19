import { DND_MERGE_NODE, DND_REPLACE_PARENT, DND_SORT_NODE } from '../constants/actions'

export function dndMergeNode (node) {
	return {
		type: DND_MERGE_NODE,
		node
	}
}

export function dndReplaceParent (node) {
	return {
		type: DND_REPLACE_PARENT,
		node
	}
}

export function dndSortNode (node) {
	return {
		type: DND_SORT_NODE,
		node
	}
}