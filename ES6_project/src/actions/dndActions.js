import { DND_MERGE_NODE, DND_REPLACE_PARENT, DND_SORT_NODE } from '../constants/actions'

export function dndMergeNode (tree,sourceNode,targetNode,selNodes) {
	return {
		type: DND_MERGE_NODE,
		tree,
		sourceNode,
		targetNode,
		selNodes
	}
}

export function dndReplaceParent (tree,sourceNode,targetNode,selNodes) {
	return {
		type: DND_REPLACE_PARENT,
		tree,
		sourceNode,
		targetNode,
		selNodes
	}
}

export function dndSortNode (tree,sourceNode,targetNode,selNodes) {
	return {
		type: DND_SORT_NODE,
		tree,
		sourceNode,
		targetNode,
		selNodes
	}
}