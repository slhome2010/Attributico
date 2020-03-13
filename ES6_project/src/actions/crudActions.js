/* 
CRUD — Википедия
ru.wikipedia.org›CRUD
CRUD — акроним, обозначающий четыре базовые функции, используемые при работе с базами данных: 
создание (англ. create), чтение (read), модификация (update), удаление (delete)
 */
import { COPY_NODE, RENAME_NODE, UPDATE_NODE, DELETE_NODE } from '../constants/actions'

export function copyNode (sourceNode, targetNode) {
	return {
		type: COPY_NODE,		
		sourceNode, 
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