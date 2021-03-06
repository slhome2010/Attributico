import { DND_MERGE_NODE, DND_REPLACE_PARENT, DND_REPLACE_CATEGORY, DND_SORT_NODE, DND_ADD_NODE } from '../constants/actions'

export function dndMergeNode (tree,sourceNode,targetNode,affectedNodes) {
	return {
		type: DND_MERGE_NODE,
		tree,
		sourceNode,
		targetNode,
		affectedNodes
	}
}

export function dndReplaceParent (tree,sourceNode,targetNode,affectedNodes) {
	return {
		type: DND_REPLACE_PARENT,
		tree,
		sourceNode,
		targetNode,
		affectedNodes
	}
}

export function dndReplaceCategory (tree,sourceNode,targetNode,affectedNodes) {
	return {
		type: DND_REPLACE_CATEGORY,
		tree,
		sourceNode,
		targetNode,
		affectedNodes
	}
}

export function dndSortNode (tree,sourceNode,targetNode,affectedNodes) {
	return {
		type: DND_SORT_NODE,
		tree,
		sourceNode,
		targetNode,
		affectedNodes
	}
}

export function dndAddNode(sourceNode,targetNode,affectedNodes) {
	return {
		type: DND_ADD_NODE,
		sourceNode,
		targetNode,
		affectedNodes
	}
}