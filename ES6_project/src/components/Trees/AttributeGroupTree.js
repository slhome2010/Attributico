import Filter from '../FancyFilter';
import { ContextmenuCommand } from '../ContextMenuCommand';
import { KeydownCommand } from '../KeyDownCommand';
import { deSelectNodes, getSelectedKeys, selectControl } from '../../functions/Select';
//import { reloadAttribute } from '../../functions/Syncronisation';
import { hasPermission, isAttribute, isTemplate, isValue } from '../../functions/Plugin/NodeMethod';
import { loadError } from '../Events/LoadError';
import { saveAfterEdit } from '../Events/SaveAfterEdit'
import { editDuty } from '../Events/EditDuty';
import { smartScroll } from '../../constants/global';
import { dndMergeNode, dndSortNode, dndReplaceParent } from '../../actions'

export default class AttributeGroupTree {
    constructor(element,store) {
        this.lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        this.currentTab = 'tab-attribute';
        this.tree = $("#attribute_group_tree" + this.lng_id);
        this.sortOrder = $('input[id = "sortOrder_attribute_group_tree' + this.lng_id + '"]:checkbox').is(":checked");
        this.lazyLoad = $('input[id = "lazyLoad_attribute_group_tree' + this.lng_id + '"]:checkbox').is(":checked");
        this.store = store;
        
        this.config = {
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            extensions: ["edit", "dnd", "filter"],
            selectMode: 2,
            checkbox: false,
            quicksearch: true,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': this.lng_id,
                    'sortOrder': this.sortOrder,
                    'lazyLoad': this.lazyLoad,
                    'tree': "1",
                    'isPending': false
                },
                url: 'index.php?route=' + extension + 'module/attributico/getAttributeGroupTree'
            },
            loadError: (e, data) => loadError(e, data),
            lazyLoad: (event, data) => {
                data.result = {
                    data: {
                        'user_token': user_token,
                        'token': token,
                        'key': data.node.key,
                        'language_id': this.lng_id
                    }, // cache:true,
                    url: 'index.php?route=' + extension + 'module/attributico/getLazyAttributeValues'
                };
            },
            edit: {
                triggerStart: ["f2", "shift+click", "mac+enter"],
                inputCss: {
                    minWidth: "18em"
                },
                beforeEdit: function (event, data) {
                    if (!data.node.hasPermission(['group', 'attribute', 'template', 'value', 'duty'])) {
                        return false;
                    }
                    // Return false to prevent edit mode                    
                },
                edit: (event, data) => editDuty(event, data), // Editor was opened (available as data.input)                
                beforeClose: function (event, data) {
                    // Return false to prevent cancel/save (data.input is available)
                },
                save: (event, data) => saveAfterEdit(event, data, this.store),
                close: function (event, data) {
                    if (data.save) {
                        $(data.node.span).addClass("pending");
                    }
                }
            },
            dnd: {
                autoExpandMS: 600,
                focusOnClick: true,
                preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                preventRecursiveMoves: false, // Prevent dropping nodes on own descendants
                dragStart: (node, data) => {
                    //  if (data.node.isRootNode() || data.node.getLevel() !== 3) {
                    if (data.node.isRootNode() || data.node.getLevel() > 3) {
                        return false;
                    }
                    return true;
                },
                dragEnter: (targetNode, data)  => {
                    let targetLevel = targetNode.getLevel();
                    let subjectLevel = data.otherNode.getLevel();
                    let subjectNode = data.otherNode;
                    // embargo on levels mixing
                    if (targetLevel === 1 || targetLevel > subjectLevel) {
                        return false;
                    }

                    if (targetNode === subjectNode.parent) {
                        return false;
                    }
                    // embargo to sort nodes if tree option "sortOrder" turned off
                    if (targetNode.parent === subjectNode.parent && !data.tree.options.source.data.sortOrder && !data.originalEvent.ctrlKey) {
                        return false;
                    }

                    if (targetLevel === subjectLevel && !data.originalEvent.ctrlKey) {
                        return ["before", "after"];
                    }
                    return ["over"];
                },
                dragDrop: (targetNode, data)  => {
                    let subjectNode = data.otherNode;
                    let targetLevel = targetNode.getLevel();
                    let subjectLevel = subjectNode.getLevel();
                    let selfreload = false;
                    let replace = targetNode.getParent() !== subjectNode.getParent();
                    let merge = data.originalEvent.ctrlKey && (targetLevel === subjectLevel);
                    let url = '';
                    let dispatchAction = null;

                    if (merge && !confirm(textConfirm)) {
                        return;
                    }

                    if (selNodes) {
                        $.each(selNodes, function (i, selNode) {
                            if (merge) {
                                selNode.remove();
                            } else {
                                selNode.moveTo(targetNode, data.hitMode);                                
                            }
                        });
                    } else {
                        if (merge) {
                            subjectNode.remove();
                        } else {
                            subjectNode.moveTo(targetNode, data.hitMode);
                        }
                    }
                    if (merge) {
                        url = 'index.php?route=' + extension + 'module/attributico/mergeAttributeGroup';
                        selfreload = true;
                        dispatchAction = dndMergeNode;
                    } else if (replace) {
                        url = 'index.php?route=' + extension + 'module/attributico/replaceAttributeGroup';
                        selfreload = false;
                        dispatchAction = dndReplaceParent;
                    } else {
                        url = 'index.php?route=' + extension + 'module/attributico/sortAttributeGroup';
                        selfreload = selNodes ? true : false; // for correctly sorting if multiselect
                        dispatchAction = dndSortNode;
                    }
                    $.ajax({
                        data: {
                            'user_token': user_token,
                            'token': token,
                            'subjects': selNodes ? getSelectedKeys(selNodes) : [subjectNode.key],
                            'group': targetNode.getParent().key,
                            'target': targetNode.key,
                            'direct': data.hitMode
                        },
                        url: url,
                        success: () => {
                            this.store.dispatch(dispatchAction(data.tree, subjectNode, targetNode, selNodes));
                            //reloadAttribute(subjectNode, selfreload);
                            deSelectNodes();                            
                        }
                    });
                },
                draggable: { // modify default jQuery draggable options
                    scroll: true // disable auto-scrolling
                }
            },
            beforeSelect: function (event, data) {
                if (!selectControl(data)) {
                    return false;
                }
            },
            select: function (event, data) {
                // Display list of selected nodes
                selNodes = data.tree.getSelectedNodes();
            },
            click: function (event, data) {
                if (event.ctrlKey) {
                    data.node.toggleSelected();
                } else {
                    deSelectNodes(data.node);
                }
            },
            keydown: (e, data)  => {
                let command = new KeydownCommand(e, data, this.store);
                command.permissions = {
                    remove: data.node.hasPermission(['group', 'attribute', 'template', 'value']),
                    addChild: true,
                    addSibling: true,
                    copy: data.node.hasPermission(['attribute']),
                    paste: true
                };
                command.execute();
            },
            filter: {
                autoApply: true, // Re-apply last filter if lazy data is loaded
                counter: true, // Show a badge with number of matching child nodes near parent icons
                fuzzy: false, // Match single characters in order, e.g. 'fb' will match 'FooBar'
                hideExpandedCounter: true, // Hide counter badge, when parent is expanded
                highlight: true, // Highlight matches by wrapping inside <mark> tags
                mode: "dimm" // Grayout unmatched nodes (pass "hide" to remove unmatched node instead)
            },
            init: (event, data) => {
                let filter = new Filter(this.currentTab, data.tree, this.lng_id);
                filter.attachEvents();
               /*  console.log(data.tree.$div[0].id, ' has initialised'); */
                if ($(smartScroll).is(":checked"))
                    data.tree.$container.addClass("smart-scroll");

                data.tree.$div.contextmenu({
                    delegate: "span.fancytree-title",
                    menu: contextmenuConfig[this.lng_id],
                    beforeOpen: function (event, ui) {
                        let node = $.ui.fancytree.getNode(ui.target);
                        data.tree.$div.contextmenu("enableEntry", "remove", node.hasPermission(['group', 'attribute', 'template', 'value']));
                        data.tree.$div.contextmenu("enableEntry", "rename", node.hasPermission(['group', 'attribute', 'template', 'value', 'duty']));
                        data.tree.$div.contextmenu("enableEntry", "copy", node.isAttribute());
                        data.tree.$div.contextmenu("enableEntry", "paste", !(clipboardNodes.length == 0) && !node.getParent().isRootNode());
                        node.setActive();
                    },
                    select: (event, ui) => {
                        let command = new ContextmenuCommand(ui, this.store);
                        command.execute();
                    }
                });
            }
        }
    }

    render() {
        this.tree.fancytree(this.config);
    }
}