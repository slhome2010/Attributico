import Filter from '../FancyFilter';
import { ContextmenuCommand } from '../ContextMenu';
import { KeydownCommand } from '../KeyDownCommand';
import { deSelectNodes, getSelectedKeys, selectControl } from '../../functions/Select';
import { reloadAttribute } from '../../functions/Syncronisation';
import { permission } from '../../functions/Plugin/NodeMethod';

export default class AttributeGroupTree {
    constructor(element) {
        this.lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        this.currentTab = 'tab-attribute';
        this.tree = $("#attribute_group_tree" + this.lng_id);
        this.sortOrder = $('input[id = "sortOrder_attribute_group_tree' + this.lng_id + '"]:checkbox').is(":checked");
        this.lazyLoad = $('input[id = "lazyLoad_attribute_group_tree' + this.lng_id + '"]:checkbox').is(":checked");

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
            loadError: function (e, data) {
                var error = data.error;
                if (error.status && error.statusText) {
                    data.message = "Ajax error: " + data.message;
                    data.details = "Ajax error: " + error.statusText + ", status code = " + error.status;
                } else {
                    data.message = "Custom error: " + data.message;
                    data.details = "An error occurred during loading: " + error;
                }
                console.log(data);
                console.log(error.responseText);
            },
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
                    if (!data.node.permission(['group', 'attribute', 'template', 'value'])) {
                        return false;
                    }
                    // Return false to prevent edit mode
                },
                edit: function (event, data) {
                    // Editor was opened (available as data.input)
                },
                beforeClose: function (event, data) {
                    // Return false to prevent cancel/save (data.input is available)
                },
                save: (event, data) => {
                    var parent = data.node.getParent();
                    $.ajax({
                        data: {
                            'user_token': user_token,
                            'token': token,
                            'key': data.node.key,
                            'name': data.input.val(),
                            'language_id': this.lng_id,
                            'oldname': data.orgTitle
                        },
                        url: 'index.php?route=' + extension + 'module/attributico/editAttribute'
                    }).done(function (result) {
                        if (data.node.key.indexOf('template') + 1) {
                            if (data.node.parent.isLazy()) {
                                parent.getNextSibling().load(true).done(function (result) {
                                    reloadAttribute(data.node, false);
                                });
                            } else {
                                reloadAttribute(data.node, true);
                            }
                        } else if (data.node.key.indexOf('value') + 1) {
                            if (data.node.parent.isLazy()) {
                                parent.getPrevSibling().load(true).done(function (result) {
                                    parent.load(true).done(function (result) {
                                        //   parent.setExpanded();
                                        (data.node.tree.getNodeByKey(data.node.key) || data.node.getPrevSibling() || data.node.getNextSibling()).setActive();
                                    });
                                }).done(function (result) {
                                    reloadAttribute(data.node, false);
                                });
                            } else {
                                reloadAttribute(data.node, true);
                            }
                        } else {
                            reloadAttribute(data.node, false);
                        }
                        // Server might return an error or a modified title
                        data.node.setTitle(result.acceptedTitle); // in case server modified it                        //
                        // Maybe also check for non-ajax errors, e.g. 'title invalid', ...
                    }).fail(function (result) {
                        // Ajax error: reset title (and maybe issue a warning)
                        data.node.setTitle(data.orgTitle);
                    }).always(function () {
                        $(data.node.span).removeClass("pending");
                    });
                    // Optimistically assume that save will succeed. Accept the user input
                    return true;
                },
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
                dragStart: function (node, data) {
                    //  if (data.node.isRootNode() || data.node.getLevel() !== 3) {
                    if (data.node.isRootNode() || data.node.getLevel() > 3) {
                        return false;
                    }
                    return true;
                },
                dragEnter: function (targetNode, data) {
                    var targetLevel = targetNode.getLevel();
                    var subjectLevel = data.otherNode.getLevel();
                    var subjectNode = data.otherNode;
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
                dragDrop: function (targetNode, data) {
                    var subjectNode = data.otherNode;
                    var targetLevel = targetNode.getLevel();
                    var subjectLevel = subjectNode.getLevel();
                    var selfreload = false;
                    var replace = targetNode.getParent() !== subjectNode.getParent();
                    var merge = data.originalEvent.ctrlKey && (targetLevel === subjectLevel);
                    let url = '';

                    if (merge && !confirm(textConfirm)) {
                        return;
                    }

                    if (selNodes) {
                        $.each(selNodes, function (i, subjectNode) {
                            if (merge) {
                                subjectNode.remove();
                            } else {
                                subjectNode.moveTo(targetNode, data.hitMode);
                                selfreload = true; // for correctly sorting if multiselect
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
                    } else if (replace) {
                        url = 'index.php?route=' + extension + 'module/attributico/replaceAttributeGroup';
                        selfreload = false;
                    } else {
                        url = 'index.php?route=' + extension + 'module/attributico/sortAttributeGroup';
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
                        url: url
                    }).done(function () {
                        reloadAttribute(subjectNode, selfreload);
                        deSelectNodes(subjectNode);
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
            keydown: function (e, data) {
                let command = new KeydownCommand(e, data);
                command.permissions = {
                    remove: data.node.permission(['group', 'attribute', 'template', 'value']),
                    addChild: true,
                    addSibling: true,
                    copy: data.node.permission(['attribute']),
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
                //console.log(data.tree.$div.context.id, ' has loaded');
                if (smartScroll.is(":checked"))
                    data.tree.$container.addClass("smart-scroll");
                    
                data.tree.$div.contextmenu({
                    delegate: "span.fancytree-title",
                    menu: contextmenuConfig[this.lng_id],
                    beforeOpen: function (event, ui) {
                        let node = $.ui.fancytree.getNode(ui.target);
                        data.tree.$div.contextmenu("enableEntry", "remove", node.permission(['group', 'attribute', 'template', 'value']));
                        data.tree.$div.contextmenu("enableEntry", "rename", node.permission(['group', 'attribute', 'template', 'value']));
                        data.tree.$div.contextmenu("enableEntry", "copy", !node.key.indexOf('attribute'));
                        data.tree.$div.contextmenu("enableEntry", "paste", !(clipboardNodes.length == 0) && !node.getParent().isRootNode());
                        node.setActive();
                    },
                    select: function (event, ui) {
                        let command = new ContextmenuCommand(ui);
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