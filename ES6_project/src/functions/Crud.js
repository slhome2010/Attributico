import { getSelectedKeys, getSelectedTitles, deSelectNodes, deSelectCategories } from './Select'
import { reactivateCategory, smartReload } from './Syncronisation'
import { copyNode, deleteNode, dndAddNode, dndReplaceParent } from '../actions';
import { moveNode } from './Move';

export function addNewAttribute(activeNode, activeKey, lng_id) {
    /* This function for previously insert New record in DataBase and  editing this in tree after */
    let node = activeNode,
        parentLevel = (activeKey === 'attribute') ? 2 : 1;
    while (node.getLevel() > parentLevel) {
        node = node.getParent();
    }
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
            'key': node.key,
            name: activeKey === 'attribute' ? textNewAttribute : textNewGroup
        },
        url: 'index.php?route=' + extension + 'module/attributico/addAttribute',
        success: function (new_id) {
            node.editCreateNode("child", {
                title: activeKey === 'attribute' ? textNewAttribute[lng_id] + "_" + new_id : textNewGroup[lng_id] + "_" + new_id,
                key: activeKey + "_" + new_id,
                folder: (activeKey === 'group') ? true : false
            });
        }
    });
}

export function deleteAttribute(node, store) {
    let level = node.getLevel();
    if (level === 2 || level === 3 || level === 5) {
        $.ajax({
            data: {
                'user_token': user_token,
                'token': token,
                'keys': selNodes ? getSelectedKeys(selNodes) : [node.key],
                'titles': selNodes ? getSelectedTitles(selNodes) : [node.title],
                'language_id': node.getLanguageId()
            },
            url: 'index.php?route=' + extension + 'module/attributico/deleteAttributes',
            success: function () {
                store.dispatch(deleteNode(node)); // Надо до remove

                if (selNodes) {
                    // selNodes не всегда есть, т.к. они создаются только по ctrl+click 
                    $.each(selNodes, function (i, o) {
                        o.remove();
                    });
                } else {
                    node.remove();
                }

                selNodes = null;
            }
        });
    }
}

// sourceNode = data.otherNode это узел источника
// Синхронизировать деревья атрибутов надо, т.к. могли добавиться или удалиться значения после add/delete
export function addAttributeToCategory(sourceNode, targetNode, clipboard, remove, store) {
    $.ajax({
        data: {
            'attributes': clipboard ? getSelectedKeys(clipboard) : [sourceNode.key],
            'category_id': targetNode.key,
            'categories': selCategories ? getSelectedKeys(selCategories) : []
        },
        url: 'index.php?route=' + extension + 'module/attributico/addCategoryAttributes' + '&user_token=' + user_token + '&token=' + token,
        type: 'POST'
    }).done(function () {
        // Это либо смена категории либо копипаст из CategoryAttributeTree
        if (!remove) {
            //smartReload(sourceNode.tree, clipboard ? clipboard : [sourceNode]); // TODO возможно надо будет удалить если включено в reloadAttribute
            deSelectCategories();
            reactivateCategory(targetNode);
            // Надо перезагружать остальные деревья, чтоб подхватить новые значения и шаблоны (попробовать перенести в смарт)            
            store.dispatch(dndAddNode(sourceNode, targetNode, clipboard ? clipboard : [sourceNode]));
            deSelectNodes();
        } else {
            deSelectCategories(); // чтобы не удалялось в отмеченных категориях
            deleteAttributesFromCategory(sourceNode, targetNode, clipboard, store);
        }
    });
}

export function deleteAttributesFromCategory(sourceNode, targetNode, clipboard, store) {
    let category_id = sourceNode.getParent().key;

    $.ajax({
        data: {
            'attributes': clipboard ? getSelectedKeys(clipboard) : [sourceNode.key],
            'category_id': category_id,
            'categories': selCategories ? getSelectedKeys(selCategories) : []
        },
        url: 'index.php?route=' + extension + 'module/attributico/deleteAttributesFromCategory' + '&user_token=' + user_token + '&token=' + token,
        type: 'POST',
        success: function () {
            reactivateCategory(targetNode);
            // при удалении надо засинхронизировать все деревья где были lazy вдруг это были последние
            store.dispatch(dndReplaceParent(targetNode.tree, sourceNode, targetNode, clipboard ? clipboard : [sourceNode]));
        }
    });
    deSelectNodes();
}

export function deleteDuty(node, store) {
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
            'key': node.key,
            'language_id': node.getLanguageId(),
            'name': '',
        },
        url: 'index.php?route=' + extension + 'module/attributico/editAttribute',
        success: function () {
            // при удалении надо перезагрузить дерево т.к. поле не удаестя сделать пустым при edit
            store.dispatch(deleteNode(node));
        }
    });
}

export function copyPaste(action, actionNode, store) {
    let activeTree = actionNode.tree;
    // actionNode в операциях cut & copy играет роль sourceNode, а в операции paste targetNode
    switch (action) {
        case "cut":
        case "copy":
            // Селектор нужен т.к. источником узлов могут служить разные деревья. В селекторе убираем цифры.
            let TREE_SELECTOR = '[name ^=' + activeTree.$div[0].id.replace(/[0-9]/g, '') + ']';
            pasteMode = action;
            // selNodes надо переписать в буфер обмена, т.к. при нажатии без ctrl сработет deselectNodes()
            // заполняем буфер обмена clipboard выделенными узлами для каждого языка
            // для операций move нужен список узлов не важно для какого языка
            // для операций delete нужен список узлов не важно для какого языка
            // для операций addToCategory нужен список узлов не важно для какого языка
            // если нужен список узлов, то используется selNodes или [sourceNode.key]
            // однако для функций addAttribute... нужна структура типа :
            // [[empty,A1ru,empty,A1en],[empty,A2ru,empty,A2en],...[empty,A100ru,empty,A100en]]
            $(TREE_SELECTOR).each(function (indx, element) {
                let tree = $.ui.fancytree.getTree("#" + element.id);
                let lng_id = parseInt(element.id.replace(/\D+/ig, ''));

                clipboardNodes[lng_id] = [];
                clipboardTitles[lng_id] = [];

                if (selNodes) {
                    selNodes.forEach(function (node, i) {
                        let selNode = tree.getNodeByKey(node.key);
                        if (selNode !== null) {
                            clipboardNodes[lng_id].push(selNode);
                            clipboardTitles[lng_id].push(selNode.title);
                        }

                    });
                } else {
                    let selNode = tree.getNodeByKey(actionNode.key);
                    if (selNode !== null) {
                        clipboardNodes[lng_id].push(selNode);
                        clipboardTitles[lng_id].push(selNode.title);
                    }
                }
            });
            break;
        case "paste":
            let direct = 'after';
            let lng_id = parseInt(activeTree.$div[0].id.replace(/\D+/ig, ''));

            if (clipboardNodes.length == 0) {
                alert("Clipoard is empty.");
                break;
            }

            if (pasteMode == "cut") {
                // Cut mode: check for recursion and remove source 
                let parentNode = actionNode.getParentByKey('group') || actionNode.getParentByKey('category');
                let sourceNode = clipboardNodes[lng_id][0];
                let targetLevel = actionNode.getLevel();
                let sourceLevel = sourceNode.getLevel();

                if (targetLevel < sourceLevel) {
                    direct = 'over';
                }

                if (parentNode.isCategory()) {
                    addAttributeToCategory(sourceNode, parentNode, clipboardNodes[lng_id], true, store);
                } else {
                    // clipboardNodes[lng_id] - список узлов не важно для какого языка
                    moveNode(sourceNode, actionNode, clipboardNodes[lng_id], false, direct, store)
                }

            } else {
                pasteNodes(actionNode, lng_id, store);
            }

            clipboardNodes = [];
            clipboardTitles = [];
            pasteMode = null;

            break;
        default:
            alert("Unhandled clipboard action '" + action + "'");
    }
}

export function pasteNodes(targetNode, lng_id, store) {
    let parentNode = targetNode.getParentByKey('group') || targetNode.getParentByKey('category');
    let sourceNode = clipboardNodes[lng_id][0];
    let oldClipboardStructure = [];
    // Make array for addAttribute... (see below)
    clipboardTitles.forEach((listNodes, lngId) => {
        let lng = lngId
        listNodes.forEach((node, index) => {
            oldClipboardStructure.push([])
            oldClipboardStructure[index][lng] = node
        })
    })
    oldClipboardStructure = oldClipboardStructure.filter(element => element.length > 0)
    /* oldClipboardStructure = oldClipboardStructure.filter(String) // Почему-то тоже работает */    
    if (parentNode.isGroup()) {
        $.ajax({
            data: {
                'user_token': user_token,
                'token': token,
                'target': parentNode.key,
                'attributes': oldClipboardStructure
            },
            url: 'index.php?route=' + extension + 'module/attributico/addAttributes',
            success: function () {
                store.dispatch(copyNode(sourceNode, parentNode));
            }
        });
    }
    if (parentNode.isCategory()) {
        addAttributeToCategory(sourceNode, parentNode, clipboardNodes[lng_id], false, store);
    }
}