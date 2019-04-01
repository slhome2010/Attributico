/** http://servenus.com © 2015-2019 All Rights Reserved **/
/** For Attribut&co v.3.0.5  **/
//var $jq = jQuery.noConflict(true);

/* Add methods to _FancytreeNodeClass */
/**
 * Return first parent node with key_prefix by key or null if not found
 * @returns {FancytreeNode}
 *
 **/
$.ui.fancytree._FancytreeNodeClass.prototype.getParentByKey = function (key) {
    key = (key == null) ? null : "" + key;

    var node = this;

    if (key != null && key !== this.key) {
        while (node.key.indexOf(key) && !node.isRootNode()) {
            node = node.getParent();
        }
    }
    return !node.isRootNode() ? node : null;
};
/**
 * Return first sibling or parent not selected node
 * @returns {FancytreeNode}
 *
 **/
$.ui.fancytree._FancytreeNodeClass.prototype.findUnselectedSibling = function () {
    var siblingNode = this.getNextSibling() || this.getPrevSibling() || this.getParent();
    while (siblingNode.isSelected() && !siblingNode.isRootNode()) {
        siblingNode = siblingNode.getPrevSibling() || siblingNode.getParent();
    }
    return siblingNode;
};
/**
 * Return language_id from node.tree.selector
 * @returns (int){id}
 *
 **/
$.ui.fancytree._FancytreeNodeClass.prototype.getLanguageId = function () {
    var selector = this.tree.$div.context.id;
    var lng_id = parseInt(selector.replace(/\D+/ig, ''));
    return lng_id;
};

/* Classes and constants */
/**
 * Handling contextmenu commands
 * @returns {none}
 *
 **/
class ContextmenuCommand {
    constructor(ui) {
        this.ui = ui;
        this.node = $.ui.fancytree.getNode(ui.target);
        this.tree = $.ui.fancytree.getTree(ui.target);
        this.selector = this.tree.$div.context.id;
        this.lng_id = parseInt(this.selector.replace(/\D+/ig, ''));
    }

    execute() {
        switch (this.ui.cmd) {
            case "expande":
            case "collapse":
                this.tree.visit(function (node) {
                    node.setExpanded(!node.isExpanded());
                });
                break;
            case "options":
                $("#options_" + this.selector).dialog("open");
                break;
            case "rename":
                this.node.editStart();
                break;
            case "remove":
                if (!confirm(textConfirm)) {
                    break;
                }
                this.remove();
                break;
            case "addChild":
                if (this.node.getLevel() !== 1) {
                    this.addChild();
                }
                break;
            case "addSibling":
                this.addSibling();
                break;
                // case "cut":
            case "copy":
                copyPaste(this.ui.cmd, this.node);
                break;
            case "paste":
                copyPaste(this.ui.cmd, this.node);
                deSelectNodes(this.node);
                break;
            default:
                alert("Todo: appply action '" + this.ui.cmd + "' to node " + this.node);
        }
    }

    remove() {
        deleteAttribute(this.node)
    }

    addChild() {
        addAttribute(this.node, 'attribute', this.lng_id);
    }

    addSibling() {
        addAttribute(this.node, 'group', this.lng_id);
    }
}

/* Override methods for CategoryattributeTree*/
class ContextmenuCommandCategory extends ContextmenuCommand {

    remove() {
        deleteAttributesFromCategory(this.node, this.node);
    }

    addChild() {
        this.tree.getRootNode().getFirstChild().editCreateNode("child"); // add child attribute to root category
    }
}
/**
 * Handling shortcut click commands
 * @type {class}
 *
 **/
class KeydownCommand {
    constructor(event, data) {
        this.e = event;
        this.node = data.node;
        this.tree = data.tree;
        this.selector = this.tree.$div.context.id;
        this.lng_id = parseInt(this.selector.replace(/\D+/ig, ''));
        this.access = {
            remove: true,
            addChild: true,
            addSibling: true,
            copy: true,
            paste: true
        };
    }

    set permissions(newPermissions) {
        this.access = newPermissions;
    }

    execute() {
        switch (this.e.which) {
            case 68:
                //     alt+D  cmd = "debug mode";
                if (this.e.altKey) {
                    console.log("Debug mode: ");
                    $.ajax({
                        data: {
                            'user_token': user_token,
                            'token': token,
                        },
                        url: 'index.php?route=' + extension + 'module/attributico/debugSwitch',
                        success: function (message) {
                            console.log(message);
                        }
                    });
                }
                break;
            case 66:
                //     ctrl+B  cmd = "expande/collapse";
                if (this.e.ctrlKey) {
                    this.tree.visit(function (node) {
                        node.setExpanded(!node.isExpanded());
                    });
                }
                break;
            case 46:
                //   del   cmd = "remove";
                if (this.access.remove && confirm(textConfirm))
                    this.remove();
                break;
            case 77:
                //   ctrl+M    cmd = "addSibling";
                if (this.access.addSibling && this.e.ctrlKey) {
                    this.addSibling();
                }
                break;
            case 81:
                //  ctrl+Q  cmd = "addChild";
                if (this.access.addChild && this.e.ctrlKey) {
                    this.addChild();
                }
                break;
            case 67:
                // Ctrl-C copy
                if (this.access.copy && this.e.ctrlKey) {
                    copyPaste("copy", this.node);
                    return false;
                }
                break;
            case 86:
                // Ctrl-V paste
                if (this.access.paste && this.e.ctrlKey) {
                    copyPaste("paste", this.node);
                    deSelectNodes(this.node);
                    return false;
                }
                break;
                //  case 88:
                //   if( event.ctrlKey ) { // Ctrl-X
                //      copyPaste("cut", node);
                //      return false;
                //    }
                //    break;
        }
    }

    remove() {
        deleteAttribute(this.node)
    }

    addChild() {
        addAttribute(this.node, 'attribute', this.lng_id);
    }

    addSibling() {
        addAttribute(this.node, 'group', this.lng_id);
    }
}
/* Override methods for CategoryattributeTree*/
class KeydownCommandCategory extends KeydownCommand {

    remove() {
        deleteAttributesFromCategory(this.node, this.node);
    }

    addChild() {
        this.tree.getRootNode().getFirstChild().editCreateNode("child"); // add child attribute to root category
    }
}
/**
 * Filter create and event services
 * @type {class}
 *
 **/
class Filter {
    constructor(tab, tree, lng_id) {
        this.data = {
            tab,
            tree,
            lng_id
        };
    }

    attachEvents() {
        $("input[name=" + this.data.tab + "_search" + this.data.lng_id + "]").keyup(this.data, this.search).focus();
        $("button#" + this.data.tab + "_btnSearch" + this.data.lng_id).click(this.data, this.search);
        $("div#" + this.data.tab + "_filter" + this.data.lng_id + " input:checkbox").change(this.data, this.changeSettings);
        $("button#" + this.data.tab + "_btnResetSearch" + this.data.lng_id).click(this.data, this.clear).attr("disabled", true);
        $("button#" + this.data.tab + "_btnSearch" + this.data.lng_id).attr("disabled", $("input#" + this.data.tab + "_autoComplete" + this.data.lng_id).is(":checked"));
    }

    clear(e) {
        if (e.data.tree.isFilterActive()) {
            e.data.tree.clearFilter();
            // if (e.data.length === 3) {
            $('input[name *= ' + e.data.tab + '_search' + e.data.lng_id + ']').val("");
            $('span[id *= ' + e.data.tab + '_matches' + e.data.lng_id + ']').text("");
            //  } else {
            //      $('input[name *= "search"]').val("");
            //      $('span[id *= "matches"]').text("");
            //  }
            $("[id ^=loadImg]").hide();
        }
    }

    changeSettings(e) {
        let id = $(this).attr("id");
        let flag = $(this).is(":checked");

        switch (id) {
            case e.data.tab + "_autoExpand" + e.data.lng_id:
            case e.data.tab + "_regex" + e.data.lng_id:
            case e.data.tab + "_leavesOnly" + e.data.lng_id:
            case e.data.tab + "_attributesOnly" + e.data.lng_id:
                break; // Re-apply filter only
            case e.data.tab + "_autoComplete" + e.data.lng_id:
                $("button#" + e.data.tab + "_btnSearch" + e.data.lng_id).attr("disabled", $(this).is(":checked"));
                break;
            case e.data.tab + "_hideMode" + e.data.lng_id:
                e.data.tree.options.filter.mode = flag ? "hide" : "dimm";
                break;
            case e.data.tab + "_counter" + e.data.lng_id:
            case e.data.tab + "_fuzzy" + e.data.lng_id:
            case e.data.tab + "_hideExpandedCounter" + e.data.lng_id:
            case e.data.tab + "_highlight" + e.data.lng_id:
                e.data.tree.options.filter[id.replace(/\d/g, '')] = flag;
                break;
        }
        e.data.tree.clearFilter();
        $("input[name=" + e.data.tab + "_search" + e.data.lng_id + "]").trigger("keyup");
    }

    search(e) {
        let n = 0;
        let opts = {
            autoExpand: $("#" + e.data.tab + "_autoExpand" + e.data.lng_id).is(":checked"),
            leavesOnly: $("#" + e.data.tab + "_leavesOnly" + e.data.lng_id).is(":checked")
        };
        let attributesOnly = $("#" + e.data.tab + "_attributesOnly" + e.data.lng_id).is(":checked");
        let match = $("input[name=" + e.data.tab + "_search" + e.data.lng_id + "]").val();
        // match = $(this).val();

        if (e && e.which === $.ui.keyCode.ESCAPE || $.trim(match) === "") {
            $("button#" + e.data.tab + "_btnResetSearch" + e.data.lng_id).click();
            return;
        }
        if (!$("#" + e.data.tab + "_autoComplete" + e.data.lng_id).is(":checked") && e.type === "keyup") {
            //console.log(e.type);
            return;
        }
        if (!attributesOnly && !e.data.tree.options.source.data.isPending) {
            e.data.tree.visit(function (node) {
                if (node.isLazy()) {
                    node.load(true);
                }
            });
            //  $("#loadImg" + e.data.lng_id).show();
            e.data.tree.options.source.data.isPending = true;
        }
        setTimeout(function () {
            if ($("#" + e.data.tab + "_regex" + e.data.lng_id).is(":checked")) {
                // Pass function to perform match
                n = e.data.tree.filterNodes(function (node) {
                    return new RegExp(match, "i").test(node.title);
                }, opts);
                $("span#" + e.data.tab + "_matches" + e.data.lng_id).text("(" + n + ")");
            } else {
                n = e.data.tree.filterNodes(match, opts);
                $("span#" + e.data.tab + "_matches" + e.data.lng_id).text("(" + n + ")");
            }
        }, 600);

        $("button#" + e.data.tab + "_btnResetSearch" + e.data.lng_id).attr("disabled", false);
        $("span#" + e.data.tab + "_matches" + e.data.lng_id).text("(" + n + ")");
    }
}
/* Clear Filter if tree reload */
function ClearFilter(tree) {
    if (tree.isFilterActive()) {
        tree.clearFilter();

        $('input[name *= "search"]').val("");
        $('span[id *= "matches"]').text("");
        $("[id ^=loadImg]").hide();
    }
}
/* Dropdown menu in filter */
function FilterAction(e, lng_id, tab) {
    $("span#" + tab + "_searchmode" + lng_id + " input#" + tab + "_regex" + lng_id + ":checkbox").prop({
        "checked": true
    });
    switch ($(e).attr("id")) {
        case 'f_' + tab + '_empty':
            $("input[name=" + tab + "_search" + lng_id + "]").val("^\s*$");
            $("button#" + tab + "_btnSearch" + lng_id).trigger("click");
            break;
        case 'f_' + tab + '_digital':
            $("input[name=" + tab + "_search" + lng_id + "]").val("[0-9]");
            $("button#" + tab + "_btnSearch" + lng_id).trigger("click");
            break;
        case 'f_' + tab + '_html':
            $("input[name=" + tab + "_search" + lng_id + "]").val("<[^>]+>");
            $("button#" + tab + "_btnSearch" + lng_id).trigger("click");
            break;
        case 'f_' + tab + '_default':
            $("span#" + tab + "_searchmode" + lng_id + " input#" + tab + "_regex" + lng_id + ":checkbox").prop({
                "checked": false
            });
            $("button#" + tab + "_btnResetSearch" + lng_id).trigger("click");
            break;
    }

    return false;
}

/* Functions */
function reactivateCategory() {
    var node = null;
    if (arguments.length !== 0) {
        node = arguments[0];
    }
    $category_tree.each(function (indx, element) {
        var tree = $("#" + element.id).fancytree("getTree");
        var categoryNode = (node ? tree.getNodeByKey(node.key) : null) || tree.getActiveNode();

        if (categoryNode && categoryNode !== undefined) {
            categoryNode.setActive(false);
            categoryNode.setActive(true);
        }
    });
}

function reloadAttribute() {
    if (arguments.length == 0) {
        $attribute_synchro_trees.each(function (indx, element) {
            var tree = $("#" + element.id).fancytree("getTree");
            tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");
            ClearFilter(tree);
            tree.reload().done(function () {
                tree.options.source.data.isPending = false;
            });
        });
    } else {
        var node = arguments[0],
                self = arguments[1];
        $attribute_synchro_trees.each(function (indx, element) {
            var tree = $("#" + element.id).fancytree("getTree");
            tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");
            if ((tree !== node.tree) || self) { // not reload active tree
                ClearFilter(tree);
                tree.reload().done(function () {
                    tree.options.source.data.isPending = false;
                    var newnode = tree.getNodeByKey(node.key); // || node.getNextSibling() || node.getPrevSibling() || node.getParent(); // ????
                    if (newnode && newnode !== undefined) {
                        newnode.setActive();
                    }
                });
            }
        });
        if (!self) {
            node.setActive();
        }
        // reactivateCategory(node);
    }
}

function getSelectedKeys(selNodes) {
    var selKeys = [];
    if (selNodes) {
        selNodes.forEach(function (node) {
            selKeys.push(node.key);
        });
    }
    return selKeys;
}

function getSelectedTitles(selNodes) {
    var selTitles = [];
    if (selNodes) {
        selNodes.forEach(function (node) {
            selTitles.push(node.title);
        });
    }
    return selTitles;
}

function deSelectNodes(node) {
    if (selNodes) {
        selNodes.forEach(function (node) {
            node.setSelected(false);
        });
        //   node.tree.visit(function (node) {
        //       node.setSelected(false);
        //   });
    }
    selNodes = null;
}

function selectControl(data) {
    if (data.node.isTopLevel()) { // not select root or 1-st level node
        data.node.setSelected(false);
        return false;
    }
    data.node.tree.visit(function (node) {
        if (data.node.getLevel() !== node.getLevel())
            node.setSelected(false);
    });
    return true;
}

function addAttribute(activeNode, activeKey, lng_id) {
    var node = activeNode,
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
                title: activeKey === 'attribute' ? textNewAttribute[lng_id] : textNewGroup[lng_id],
                key: activeKey + "_" + new_id,
                folder: (activeKey === 'group') ? true : false
            });
        }
    });
}

function deleteAttribute(node) {
    let level = node.getLevel();
    if (level === 2 || level === 3 || level === 5) {
        var siblingNode = node.findUnselectedSibling();
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
                if (selNodes) {
                    $.each(selNodes, function (i, o) {
                        o.remove();
                    });
                } else {
                    node.remove();
                }
                reloadAttribute(siblingNode, level === 5 ? true : false);
                //   siblingNode.setActive(true);
                selNodes = null;
            }
        });
    }
}

function copyAttributes(targetNode) {
    var node = targetNode.getParentByKey('group') || targetNode.getParentByKey('category');

    if (node.key.indexOf('group') + 1) {
        $.ajax({
            data: {
                'user_token': user_token,
                'token': token,
                'target': node.key,
                'attributes': clipboardTitles
            },
            url: 'index.php?route=' + extension + 'module/attributico/addAttributes',
            success: function () {
                reloadAttribute(targetNode, true);
            }
        });
    }
    if (node.key.indexOf('category') + 1) {
        $.ajax({
            data: {
                'attributes': selNodes ? getSelectedKeys(selNodes) : [clipboardNodes[0][1].key],
                'category_id': node.key,
                'categories': selCategories ? getSelectedKeys(selCategories) : [node.key]
            },
            url: 'index.php?route=' + extension + 'module/attributico/addCategoryAttributes' + '&user_token=' + user_token + '&token=' + token,
            type: 'POST',
            success: function () {
                reactivateCategory(node);
            }
        });
    }
}

function deleteAttributesFromCategory(node, targetnode) {
    var category_id = node.getParent().key;

    $.ajax({
        data: {
            'attributes': selNodes ? getSelectedKeys(selNodes) : [node.key],
            'category_id': category_id,
            'categories': selCategories ? getSelectedKeys(selCategories) : [category_id]
        },
        url: 'index.php?route=' + extension + 'module/attributico/deleteAttributesFromCategory' + '&user_token=' + user_token + '&token=' + token,
        type: 'POST',
        success: function () {
            reactivateCategory(targetnode);
            reloadAttribute(node, true); // при удалении надо засинхронизировать все деревья где были lazy вдруг это были последние
        }
    });
    selNodes = null;
}

function addAttributeToCategory(targetnode, data, remove) {
    $.ajax({
        data: {
            'attributes': selNodes ? getSelectedKeys(selNodes) : [data.otherNode.key],
            'category_id': targetnode.key,
            'categories': selCategories ? getSelectedKeys(selCategories) : [targetnode.key]
        },
        url: 'index.php?route=' + extension + 'module/attributico/addCategoryAttributes' + '&user_token=' + user_token + '&token=' + token,
        type: 'POST'
    }).done(function () {
        if (!remove) {
            deSelectNodes(data.otherNode);
            // reactivateCategory(targetnode);
            data.otherNode.tree.visit(function (node) { // при дбавлении надо засинхронизировать дерево атрибутов где были lazy вдруг это были первые
                if (node.isLazy()) {
                    node.load(true);
                }
            });
            reactivateCategory(targetnode);
            reloadAttribute(data.otherNode, false);
        } else {
            deleteAttributesFromCategory(data.otherNode, targetnode);
        }
    });
}

var clipboardNodes = [],
        clipboardTitles = [];
var pasteMode = null;

function copyPaste(action, targetNode) {
    switch (action) {
        case "cut":
        case "copy":
            // clipboardNode = node;
            pasteMode = action;
            if (selNodes) {
                selNodes.forEach(function (node, i) {
                    clipboardNodes[i] = [];
                    clipboardTitles[i] = [];
                    $attribute_group_tree.each(function (indx, element) {
                        var tree = $("#" + element.id).fancytree("getTree");
                        var lng_id = parseInt(element.id.replace(/\D+/ig, ''));
                        clipboardNodes[i][lng_id] = tree.getNodeByKey(node.key);
                        clipboardTitles[i][lng_id] = tree.getNodeByKey(node.key).title;
                    });
                });
            } else {
                clipboardNodes[0] = [];
                clipboardTitles[0] = [];
                $attribute_group_tree.each(function (indx, element) {
                    var tree = $("#" + element.id).fancytree("getTree");
                    var lng_id = parseInt(element.id.replace(/\D+/ig, ''));
                    clipboardNodes[0][lng_id] = tree.getNodeByKey(targetNode.key);
                    clipboardTitles[0][lng_id] = tree.getNodeByKey(targetNode.key).title;
                });
            }
            break;
        case "paste":
            if (clipboardNodes.length == 0) {
                alert("Clipoard is empty.");
                break;
            }
            if (pasteMode == "cut") {
                // Cut mode: check for recursion and remove source
                // todo
                copyAttributes(targetNode, clipboardTitles);
                clipboardNodes[indx].remove();
            } else {
                copyAttributes(targetNode, clipboardTitles);
            }
            clipboardNodes = [];
            clipboardTitles = [];
            //   selNodes = null;
            pasteMode = null;
            break;
        default:
            alert("Unhandled clipboard action '" + action + "'");
    }
}

function initTrees() {
    $attribute_group_tree.each(function (indx, element) {
        var lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        var currentTab = 'tab-attribute';
        var attribute_group_tree = $("#attribute_group_tree" + lng_id);
        // var currentTree = attribute_group_tree.fancytree("getTree");
        var sortOrder = $('input[id = "sortOrder_attribute_group_tree' + lng_id + '"]:checkbox').is(":checked");
        var lazyLoad = $('input[id = "lazyLoad_attribute_group_tree' + lng_id + '"]:checkbox').is(":checked");

        attribute_group_tree.fancytree({
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
                    'language_id': lng_id,
                    'sortOrder': sortOrder,
                    'lazyLoad': lazyLoad,
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
            lazyLoad: function (event, data) {
                data.result = {
                    data: {
                        'user_token': user_token,
                        'token': token,
                        'key': data.node.key,
                        'language_id': lng_id
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
                    if (data.node.isRootNode() || data.node.getLevel() === 1 || data.node.getLevel() === 4) {
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
                save: function (event, data) {
                    var parent = data.node.getParent();
                    $.ajax({
                        data: {
                            'user_token': user_token,
                            'token': token,
                            'key': data.node.key,
                            'name': data.input.val(),
                            'language_id': lng_id,
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
                draggable: {// modify default jQuery draggable options
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
                command.execute();
            },
            filter: {
                autoApply: true, // Re-apply last filter if lazy data is loaded
                counter: true, // Show a badge with number of matching child nodes near parent icons
                fuzzy: false, // Match single characters in order, e.g. 'fb' will match 'FooBar'
                hideExpandedCounter: true, // Hide counter badge, when parent is expanded
                highlight: true, // Highlight matches by wrapping inside <mark> tags
                mode: "dimm" // Grayout unmatched nodes (pass "hide" to remove unmatched node instead)
            }
        });

        var currentTree = attribute_group_tree.fancytree("getTree");
        // var collapse = true;

        let filter = new Filter(currentTab, currentTree, lng_id);
        filter.attachEvents();

        // ------------------------ attribute_group_tree.contextmenu ---------------------
        attribute_group_tree.contextmenu({
            delegate: "span.fancytree-title",
            menu: contextmenu[lng_id],
            beforeOpen: function (event, ui) {
                var node = $.ui.fancytree.getNode(ui.target);
                // attribute_group_tree.contextmenu("enableEntry", "remove", !node.key.indexOf('attribute') || !node.key.indexOf('group'));
                attribute_group_tree.contextmenu("enableEntry", "copy", !node.key.indexOf('attribute'));
                attribute_group_tree.contextmenu("enableEntry", "paste", !(clipboardNodes.length == 0) && !node.getParent().isRootNode());
                node.setActive();
            },
            select: function (event, ui) {
                let command = new ContextmenuCommand(ui);
                command.execute();
            }
        });
    });
    // --------------------------------------- category attribute table -------------------------------------
    // --------------------------------------- category tree ------------------------------------------------
    $category_tree.each(function (indx, element) {
        var lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        var category_tree = $("#category_tree" + lng_id);
        // var collapse = true;
        var sortOrder = $('input[id = "sortOrder_category_tree' + lng_id + '"]:checkbox').is(":checked");
        //var multistore = $('input[name = "attributico_multistore"]:checkbox').is(":checked");
        //  var selectMode = $('input[id = "multiSelect_category_tree' + lng_id + '"]:checkbox').is(":checked");

        category_tree.fancytree({
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            extensions: ["dnd"],
            checkbox: true,
            selectMode: $('input[id = "multiSelect_category_tree' + lng_id + '"]:checkbox').is(":checked") ? 3 : 2,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': lng_id,
                    'sortOrder': sortOrder
                },
                url: 'index.php?route=' + extension + 'module/attributico/getCategoryTree'
            },
            activate: function (event, data) {
                // var node = data.node;
                var tree = $("#category_attribute_tree" + lng_id).fancytree("getTree");
                currentCategory = data.node.key;
                tree.reload({
                    data: {
                        'user_token': user_token,
                        'token': token,
                        'language_id': lng_id,
                        'category_id': currentCategory,
                        'sortOrder': $('input[id = "sortOrder_category_attribute_tree' + lng_id + '"]:checkbox').is(":checked"),
                        'tree': "4"
                    },
                    url: 'index.php?route=' + extension + 'module/attributico/getCategoryAttributeTree'
                });
            },
            dnd: {
                autoExpandMS: 400,
                focusOnClick: false,
                preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
                dragStart: function (node, data) {
                    return false;
                },
                dragEnter: function (node, data) {
                    if (data.otherNode.getParent().key === node.key) { // category_id is itself
                        return false;
                    }
                    return true;
                },
                dragDrop: function (node, data) {
                    addAttributeToCategory(node, data, data.otherNode.tree.$div.context.id.indexOf('attribute_tree'));
                }
            },
            select: function (event, data) {
                selCategories = data.tree.getSelectedNodes();
                data.tree.options.autoCollapse = false;
                data.node.setExpanded(!(data.node.expanded && !selCategories.length));
            },
            keydown: function (e, data) {
                let command = new KeydownCommand(e, data);
                command.permissions = {
                    remove: false,
                    addChild: false,
                    addSibling: false,
                    copy: false,
                    paste: true
                };
                command.execute();
            },
            focusTree: function (e, data) {
                data.tree.$container.focus();
            }
        });

        category_tree.contextmenu({
            delegate: "span.fancytree-title",
            menu: contextmenu[lng_id],
            beforeOpen: function (event, ui) {
                var node = $.ui.fancytree.getNode(ui.target);
                category_tree.contextmenu("enableEntry", "remove", false);
                category_tree.contextmenu("enableEntry", "rename", false);
                category_tree.contextmenu("enableEntry", "addSibling", false);
                category_tree.contextmenu("enableEntry", "addChild", false);
                category_tree.contextmenu("enableEntry", "paste", !(clipboardNodes.length == 0) && !node.getParent().isRootNode());
                node.setActive();
            },
            select: function (event, ui) {
                let command = new ContextmenuCommand(ui);
                command.execute();
            }
        });
    });
    // --------------------------------------- category attribute tree -------------------------------------
    $category_attribute_tree.each(function (indx, element) {
        //var lng_id = (indx + 1);
        var lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        var category_attribute_tree = $("#category_attribute_tree" + lng_id);
        // var collapse = true;
        var sortOrder = $('input[id = "sortOrder_category_attribute_tree' + lng_id + '"]:checkbox').is(":checked");

        category_attribute_tree.fancytree({
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            selectMode: 2,
            extensions: ["edit", "dnd"],
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': lng_id,
                    'category_id': currentCategory,
                    'sortOrder': sortOrder,
                    'tree': "4"
                },
                url: 'index.php?route=' + extension + 'module/attributico/getCategoryAttributeTree'
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
            lazyLoad: function (event, data) {
                data.result = {
                    data: {
                        'user_token': user_token,
                        'token': token,
                        'key': data.node.key,
                        'language_id': lng_id
                    }, // cache:true,
                    url: 'index.php?route=' + extension + 'module/attributico/getLazyAttributeValues'
                };
            },
            edit: {
                triggerStart: [],
                inputCss: {
                    minWidth: "18em"
                },
                beforeEdit: function (event, data) {
                    if (!data.isNew) {
                        return false;
                    }
                },
                edit: function (event, data) {
                    data.input.dropmenu({
                        'source': function (request, response) {
                            $.ajax({
                                data: {
                                    'user_token': user_token,
                                    'token': token,
                                    'filter_name': encodeURIComponent(request),
                                    'language_id': lng_id
                                },
                                url: 'index.php?route=' + extension + 'module/attributico/autocomplete',
                                dataType: 'json',
                                success: function (json) {
                                    response($.map(json, function (item) {
                                        return {
                                            category: item.attribute_group,
                                            label: item.name,
                                            value: item.attribute_id
                                        };
                                    }));
                                }
                            });
                        },
                        'select': function (item) {
                            data.input.val(item.label);
                            data.node.key = 'attribute_' + item.value;
                        }
                    });
                },
                beforeClose: function (event, data) {
                    // Return false to prevent cancel/save (data.input is available)
                },
                save: function (event, data) {
                    $.ajax({
                        data: {
                            'attributes': [data.node.key],
                            'category_id': data.node.getParent().key,
                            'categories': selCategories ? getSelectedKeys(selCategories) : [data.node.getParent().key]
                        },
                        url: 'index.php?route=' + extension + 'module/attributico/addCategoryAttributes' + '&user_token=' + user_token + '&token=' + token,
                        type: 'POST'
                    }).done(function () {
                        $(data.node.span).removeClass("pending");
                        data.node.setTitle(data.node.title);
                        reactivateCategory(data.node.getParent());
                    });
                    return true;
                },
                close: function (event, data) {
                    if (data.save) {
                        $(data.node.span).addClass("pending");
                    }
                }
            },
            dnd: {
                autoExpandMS: 400,
                focusOnClick: false,
                preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
                dragStart: function (node, data) {
                    return true;
                },
                dragEnter: function (node, data) {
                    if (node.tree === data.otherNode.tree) {
                        return false;
                    }
                    if (node.getLevel() > 2) {
                        return false;
                    }
                    return true;
                },
                dragDrop: function (node, data) {
                    addAttributeToCategory(node.getParent().isRootNode() ? node : node.getParent(), data, false);
                }
            },
            beforeSelect: function (event, data) {
                if (!selectControl(data)) {
                    return false;
                }
            },
            select: function (event, data) {
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
                let command = new KeydownCommandCategory(e, data);
                command.permissions = {
                    remove: true,
                    addChild: true,
                    addSibling: false,
                    copy: true,
                    paste: true
                };
                command.execute();
            },
            focusTree: function (e, data) {
                data.tree.$container.focus();
            }
        });

        category_attribute_tree.contextmenu({
            delegate: "span.fancytree-title",
            menu: contextmenu[lng_id],
            beforeOpen: function (event, ui) {
                var node = $.ui.fancytree.getNode(ui.target);
                category_attribute_tree.contextmenu("enableEntry", "remove", !node.key.indexOf('attribute'));
                category_attribute_tree.contextmenu("enableEntry", "rename", false);
                category_attribute_tree.contextmenu("enableEntry", "addSibling", false);
                category_attribute_tree.contextmenu("enableEntry", "copy", !node.key.indexOf('attribute'));
                category_attribute_tree.contextmenu("enableEntry", "paste", !(clipboardNodes.length == 0));
                node.setActive();
            },
            select: function (event, ui) {
                let command = new ContextmenuCommandCategory(ui);
                command.execute();
            }
        });
    });
    // ------------------- attribute tree --------------------------------------------------------------
    $attribute_tree.each(function (indx, element) {
        var currentTab = 'tab-category';
        var lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        var attribute_tree = $("#attribute_tree" + lng_id);
        //var collapse = true;
        var sortOrder = $('input[id = "sortOrder_attribute_tree' + lng_id + '"]:checkbox').is(":checked");
        var lazyLoad = $('input[id = "lazyLoad_attribute_tree' + lng_id + '"]:checkbox').is(":checked");

        attribute_tree.fancytree({
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            extensions: ["dnd", "filter"],
            selectMode: 2,
            checkbox: false,
            quicksearch: true,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': lng_id,
                    'sortOrder': sortOrder,
                    'lazyLoad': lazyLoad,
                    'isPending': false,
                    'tree': "3"
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
            lazyLoad: function (event, data) {
                data.result = {
                    data: {
                        'user_token': user_token,
                        'token': token,
                        'key': data.node.key,
                        'language_id': lng_id
                    }, // cache:true,
                    url: 'index.php?route=' + extension + 'module/attributico/getLazyAttributeValues'
                };
            },
            dnd: {
                autoExpandMS: 800,
                focusOnClick: true,
                preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
                dragStart: function (node, data) {
                    if (data.node.getLevel() !== 3) {
                        return false;
                    }
                    return true;
                },
                draggable: {// modify default jQuery draggable options
                    revert: true,
                    cursorAt: {
                        top: -5,
                        left: -5
                    },
                    connectToFancytree: true, // let Fancytree accept drag events
                    appendTo: "body",
                    scroll: true // disable auto-scrolling
                }
            },
            beforeSelect: function (event, data) {
                if (!selectControl(data)) {
                    return false;
                }
            },
            select: function (event, data) {
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
                    remove: false,
                    addChild: false,
                    addSibling: false,
                    copy: true,
                    paste: false
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
            }
        });

        var currentTree = attribute_tree.fancytree("getTree");
        let filter = new Filter(currentTab, currentTree, lng_id);
        filter.attachEvents();

        attribute_tree.contextmenu({
            delegate: "span.fancytree-title",
            menu: contextmenu[lng_id],
            beforeOpen: function (event, ui) {
                var node = $.ui.fancytree.getNode(ui.target);
                attribute_tree.contextmenu("enableEntry", "remove", false);
                attribute_tree.contextmenu("enableEntry", "rename", false);
                attribute_tree.contextmenu("enableEntry", "addSibling", false);
                attribute_tree.contextmenu("enableEntry", "addChild", false);
                attribute_tree.contextmenu("enableEntry", "copy", !node.key.indexOf('attribute'));
                node.setActive();
            },
            select: function (event, ui) {
                let command = new ContextmenuCommand(ui);
                command.execute();
            }
        });
    });

    // --------------------------------------- duty attribute table -------------------------------------
    // --------------------------------------- duty category tree ------------------------------------------------
    $duty_attribute_tree.each(function (indx, element) {
        var lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        var duty_attribute_tree = $("#duty_attribute_tree" + lng_id);
        var currentTab = 'tab-duty';
        var sortOrder = $('input[id = "sortOrder_duty_attribute_tree' + lng_id + '"]:checkbox').is(":checked");
        var lazyLoad = $('input[id = "lazyLoad_duty_attribute_tree' + lng_id + '"]:checkbox').is(":checked");

        duty_attribute_tree.fancytree({
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            extensions: ["edit", "filter"],
            checkbox: false,
            quicksearch: true,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': lng_id,
                    'sortOrder': sortOrder,
                    'lazyLoad': lazyLoad,
                    'isPending': false,
                    'tree': "2"
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
            lazyLoad: function (event, data) {
                data.result = {
                    data: {
                        'user_token': user_token,
                        'token': token,
                        'key': data.node.key,
                        'language_id': lng_id
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
                    if (data.node.isRootNode() || data.node.getLevel() === 1) {
                        return false;
                    }
                    // Return false to prevent edit mode
                },
                save: function (event, data) {
                    var parent = data.node.getParent();
                    $.ajax({
                        data: {
                            'user_token': user_token,
                            'token': token,
                            'key': data.node.key,
                            'name': data.input.val(),
                            'language_id': lng_id,
                            'oldname': data.orgTitle
                        },
                        url: 'index.php?route=' + extension + 'module/attributico/editAttribute'
                    }).done(function (result) {
                        if (data.node.key.indexOf('template') + 1) {
                            parent.getNextSibling().load(true).done(function (result) {
                                reloadAttribute(data.node, false);
                            });
                        } else if (data.node.key.indexOf('value') + 1) {
                            parent.getPrevSibling().load(true).done(function (result) {
                                parent.load(true).done(function (result) {
                                    //   parent.setExpanded();
                                    (data.node.tree.getNodeByKey(data.node.key) || data.node.getPrevSibling() || data.node.getNextSibling()).setActive();
                                });
                            }).done(function (result) {
                                reloadAttribute(data.node, false);
                            });
                        } else {
                            reloadAttribute(data.node, false);
                        }
                        data.node.setTitle(result.acceptedTitle);
                    }).fail(function (result) {
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
            beforeSelect: function (event, data) {
                return false;
            },
            keydown: function (e, data) {
                let command = new KeydownCommand(e, data);
                command.permissions = {
                    remove: false,
                    addChild: false,
                    addSibling: false,
                    copy: false,
                    paste: false
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
            }
        });

        var currentTree = duty_attribute_tree.fancytree("getTree");
        let filter = new Filter(currentTab, currentTree, lng_id);
        filter.attachEvents();

        // ------------------------ duty_attribute_tree.contextmenu ---------------------
        duty_attribute_tree.contextmenu({
            delegate: "span.fancytree-title",
            menu: contextmenu[lng_id],
            beforeOpen: function (event, ui) {
                var node = $.ui.fancytree.getNode(ui.target);
                duty_attribute_tree.contextmenu("enableEntry", "remove", false);
                duty_attribute_tree.contextmenu("enableEntry", "addSibling", false);
                duty_attribute_tree.contextmenu("enableEntry", "addChild", false);
                node.setActive();
            },
            select: function (event, ui) {
                let command = new ContextmenuCommand(ui);
                command.execute();
            }
        });
    });
    // ------------------- Products --------------------------------------------------------------
    // ------------------- attribute tree --------------------------------------------------------
    $attribute_product_tree.each(function (indx, element) {
        var currentTab = 'tab-products';
        var lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        var attribute_product_tree = $("#attribute_product_tree" + lng_id);
        // var collapse = true;
        var sortOrder = $('input[id = "sortOrder_attribute_product_tree' + lng_id + '"]:checkbox').is(":checked");
        var lazyLoad = $('input[id = "lazyLoad_duty_attribute_tree' + lng_id + '"]:checkbox').is(":checked");

        attribute_product_tree.fancytree({
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            extensions: ["filter"],
            selectMode: 2,
            checkbox: false,
            quicksearch: true,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': lng_id,
                    'sortOrder': sortOrder,
                    'lazyLoad': lazyLoad,
                    'isPending': false,
                    'tree': "5"
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
            beforeActivate: function (event, data) {
                if (data.node.getLevel() === 4) {
                    return false;
                }
            },
            activate: function (event, data) {
                // var node = data.node;
                var tree = $("#product_tree" + lng_id).fancytree("getTree");
                //currentAttributeID = data.node.key;
                tree.reload({
                    data: {
                        'user_token': user_token,
                        'token': token,
                        'language_id': lng_id,
                        'attribute_id': data.node.key,
                        'title': data.node.title,
                        'sortOrder': sortOrder,
                        'invert': $('input[id = "diver_product_tree' + lng_id + '"]:checkbox').is(":checked")
                    },
                    url: 'index.php?route=' + extension + 'module/attributico/getProductTree'
                });
            },
            lazyLoad: function (event, data) {
                data.result = {
                    data: {
                        'user_token': user_token,
                        'token': token,
                        'key': data.node.key,
                        'language_id': lng_id
                    }, // cache:true,
                    url: 'index.php?route=' + extension + 'module/attributico/getLazyAttributeValues'
                };
            },
            beforeSelect: function (event, data) {
                if (!selectControl(data)) {
                    return false;
                }
            },
            select: function (event, data) {
                selNodes = data.tree.getSelectedNodes();
            },
            click: function (event, data) {},
            keydown: function (e, data) {
                let command = new KeydownCommand(e, data);
                command.permissions = {
                    remove: false,
                    addChild: false,
                    addSibling: false,
                    copy: false,
                    paste: false
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
            }
        });

        var currentTree = attribute_product_tree.fancytree("getTree");
        let filter = new Filter(currentTab, currentTree, lng_id);
        filter.attachEvents();

        attribute_product_tree.contextmenu({
            delegate: "span.fancytree-title",
            menu: contextmenu[lng_id],
            beforeOpen: function (event, ui) {
                var node = $.ui.fancytree.getNode(ui.target);
                attribute_product_tree.contextmenu("enableEntry", "remove", false);
                attribute_product_tree.contextmenu("enableEntry", "rename", false);
                attribute_product_tree.contextmenu("enableEntry", "addSibling", false);
                attribute_product_tree.contextmenu("enableEntry", "addChild", false);
                attribute_product_tree.contextmenu("enableEntry", "copy", false);
                attribute_product_tree.contextmenu("enableEntry", "paste", false);
                node.setActive();
            },
            select: function (event, ui) {
                let command = new ContextmenuCommand(ui);
                command.execute();
            }
        });
    });
    // --------------------------------------- product tree -------------------------------------
    $product_tree.each(function (indx, element) {
        //var lng_id = (indx + 1);
        var lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        var product_tree = $("#product_tree" + lng_id);
        // var collapse = true;
        //var sortOrder = $('input[id = "sortOrder_product_tree' + lng_id + '"]:checkbox').is(":checked");
        var diver = $('input[id = "diver_product_tree' + lng_id + '"]:checkbox').is(":checked");
        //var attribute_id = currentAttributeID;

        product_tree.fancytree({
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': lng_id,
                    //'attribute_id': attribute_id,
                    //'sortOrder': sortOrder,
                    'invert': diver
                },
                url: 'index.php?route=' + extension + 'module/attributico/getProductTree'
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
            dblclick: function (event, data) {
                if (data.node.getLevel() <= 2) {
                    data.node.setExpanded(!data.node.isExpanded());
                    return false;
                }
                var about_blank = $('input[id = "input-attributico_about_blank"]:checkbox').is(":checked");
                var attribute_product_tree = $("#attribute_product_tree" + lng_id).fancytree("getTree");
                var attribute_node = attribute_product_tree.getActiveNode();
                if (about_blank) {
                    $("#reload.alert-danger").show();
                    window.open("index.php?route=catalog/product/" + edit + '&user_token=' + user_token + '&token=' + token + "&product_id=" + data.node.key.split('_')[1] + "&attribute_id=" + attribute_node.key.split('_')[1], '_blank');
                } else {
                    window.location.href = "index.php?route=catalog/product/" + edit + '&user_token=' + user_token + '&token=' + token + "&product_id=" + data.node.key.split('_')[1] + "&attribute_id=" + attribute_node.key.split('_')[1];
                }
                // index.php?route=catalog/product/update for 1.5.5
            },
            click: function (event, data) {},
            keydown: function (e, data) {
                let command = new KeydownCommand(e, data);
                command.permissions = {
                    remove: false,
                    addChild: false,
                    addSibling: false,
                    copy: false,
                    paste: false
                };
                command.execute();
            },
            focusTree: function (e, data) {
                data.tree.$container.focus();
            }
        });

        product_tree.contextmenu({
            delegate: "span.fancytree-title",
            menu: contextmenu[lng_id],
            beforeOpen: function (event, ui) {
                var node = $.ui.fancytree.getNode(ui.target);
                product_tree.contextmenu("enableEntry", "remove", false);
                product_tree.contextmenu("enableEntry", "rename", false);
                product_tree.contextmenu("enableEntry", "addSibling", false);
                product_tree.contextmenu("enableEntry", "addChild", false);
                product_tree.contextmenu("enableEntry", "copy", false);
                product_tree.contextmenu("enableEntry", "paste", false);
                node.setActive();
            },
            select: function (event, ui) {
                let command = new ContextmenuCommand(ui);
                command.execute();
            }
        });
    });
}

// Autocomplete for fancytree*/
(function ($) {
    $.fn.dropmenu = function (option) {
        return this.each(function () {
            this.timer = null;
            this.items = new Array();

            $div = $("<div />");
            $ul = $("<ul class='drop-menu' />");
            $menu = $ul;

            $.extend(this, option);

            $(this).attr('autocomplete', 'off');

            // Focus
            $(this).on('focus', function (event) {
                //  console.log('focus');
                event.preventDefault();

                this.request();
            });

            // Blur
            $(this).on('blur', function () {
                //   console.log('blur');
                setTimeout(function (object) {
                    object.hide();
                }, 200, this);
            });

            // Keydown
            $(this).on('keydown', function (event) {
                event.preventDefault();
                //   console.log('keydown');
                switch (event.keyCode) {
                    case 27: // escape
                        this.hide();
                        break;
                    default:
                        this.request();
                        break;
                }
            });

            // Mousedown perehvat
            $(this).on("mousedown", function (event) {
                //    console.log('attributico.fancytree-edit');
                event.preventDefault();
                event.stopPropagation();
                $(this).focus();
            });

            // Click
            this.click = function (event) {
                //    console.log('click');
                event.preventDefault();
                //    event.stopPropagation();  // нельзя будет вылетать
                value = $(event.target).parent().attr('data-value');

                if (value && this.items[value]) {
                    this.select(this.items[value]);
                }
            }

            // Show
            this.show = function () {
                var pos = $(this).position();

                $(this).siblings('div').children($menu).css({//============
                    top: pos.top + $(this).outerHeight(),
                    left: pos.left
                });

                $(this).siblings('div').children($menu).show(); //========
            }

            // Hide
            this.hide = function () {
                $(this).siblings('div').children($menu).hide(); // ===========
            }

            // Request
            this.request = function () {
                clearTimeout(this.timer);

                this.timer = setTimeout(function (object) {
                    object.source($(object).val(), $.proxy(object.response, object));
                }, 200, this);
            }

            // Response
            this.response = function (json) {
                html = '';

                if (json.length) {
                    for (i = 0; i < json.length; i++) {
                        this.items[json[i]['value']] = json[i];
                    }

                    for (i = 0; i < json.length; i++) {
                        if (!json[i]['category']) {
                            html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
                        }
                    }

                    // Get all the ones with a categories
                    var category = new Array();

                    for (i = 0; i < json.length; i++) {
                        if (json[i]['category']) {
                            if (!category[json[i]['category']]) {
                                category[json[i]['category']] = new Array();
                                category[json[i]['category']]['name'] = json[i]['category'];
                                category[json[i]['category']]['item'] = new Array();
                            }

                            category[json[i]['category']]['item'].push(json[i]);
                        }
                    }

                    for (i in category) {
                        //  html += '<li>' + category[i]['name'] + '</li>';
                        html += '<li class="drop-header">' + category[i]['name'] + '</li>';
                        for (j = 0; j < category[i]['item'].length; j++) {
                            html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
                        }
                    }
                }

                if (html) {
                    this.show();
                } else {
                    this.hide();
                }

                $(this).siblings('div').children($menu).html(html);

            }

            $(this).after($div);
            $menu.appendTo($div);
            $(this).siblings('div').children($menu).delegate('a', 'mousedown', $.proxy(this.click, this));

        });
    }
})(window.jQuery);

function dutyUpgrade() {
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
        },
        url: 'index.php?route=' + extension + 'module/attributico/dutyUpgrade',
        //  async: false,
        success: function () {
            location.reload();
        }
    });
}

function apply() {
    $('[id ^= "tree"].settings').each(function (indx, element) {
        $(element).fancytree("getTree").generateFormElements();
    });
    //alert("POST data:\n" + jQuery.param($("#form-attributico").serializeArray()));
    $(".alert-success, #error_warning.alert-danger").hide();
    $.post($("#form-attributico").attr('action'), $("#form-attributico").serialize(), function (html) {
        var $success = $(html).find(".alert-success, #error_warning.alert-danger"); // если после редиректа форма выставила success
        if ($success.length > 0) {
            $(".alert-before").before($success);
        } else {
            var $href = $(html).find("[selected=\"selected\"]").val(); // если нет, то ищем success по ссылке, котрая в селекте
            $.post($href, "", function (html) {
                var $success = $(html).find(".alert-success, #error_warning.alert-danger");
                if ($success.length > 0) {
                    $(".alert-before").before($success);
                }
            });
        }
        // Re-apply settings for each trees and contextmenus
        $('input[id ^= "multiSelect"]:checkbox').prop("checked", $('input[name = "attributico_multiselect"]:checkbox').is(":checked"));
        $('input[id ^= "sortOrder"]:checkbox').prop("checked", $('input[name = "attributico_sortorder"]:checkbox').is(":checked"));
        $('input[id ^= "lazyLoad"]:checkbox').prop("checked", $('input[name = "attributico_lazyload"]:checkbox').is(":checked"));
        $category_tree.each(function (indx, element) {
            var tree = $("#" + element.id).fancytree("getTree");
            tree.options.selectMode = $('input[id ^= "multiSelect"]:checkbox').is(":checked") ? 3 : 2;
        });
        $category_check_tree.each(function (indx, element) {
            var tree = $("#" + element.id).fancytree("getTree");
            tree.options.selectMode = $('input[id ^= "multiSelect"]:checkbox').is(":checked") ? 3 : 2;
        });
        $attribute_synchro_trees.each(function (indx, element) { // reload function is located inside as asynchronous request
            var tree = $("#" + element.id).fancytree("getTree");
            tree.options.source.data.sortOrder = $('input[id ^= "sortOrder"]:checkbox').is(":checked");
            tree.options.source.data.lazyLoad = $('input[id ^= "lazyLoad"]:checkbox').is(":checked");
            tree.options.source.data.category_id = currentCategory;
            tree.reload();
        });
    });
}

function check_for_updates() {
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
        },
        url: 'index.php?route=' + extension + 'module/attributico/check_for_updates',
        dataType: 'json',
        success: function (check) {
            $('#infoModal').modal('show');
            if (check.errno) {
                console.log(check);
                $('#infoModal #modal-content').html(check.errmsg);
            } else {
                if (!check.compare) {
                    $('#infoModal #modal-content').html(check.content.news);
                    $('#infoModal #modal-content').append(check.content.links);
                    $('#infoModal #modal-content').append(check.content.copyright);
                } else {
                    $('#infoModal #modal-content').html(check.content.well);
                    $('#infoModal #modal-content').append(check.content.copyright);
                }
            }
        }
    });
}

$(function () { // document ready actions
    /**
     * Building trees and configuring child nodes. (selectMode must be 2, see generateFormElements() description)
     *
     **/
    $('[id ^= "tree"]').each(function (indx, element) {
        $(element).fancytree({
            checkbox: true,
            selectMode: 2,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'tree': indx + 1
                },
                url: 'index.php?route=' + extension + 'module/attributico/getChildrenSettings'
            }
        });
    });

    $("#form-attributico").submit(function () {
        // Render hidden <input> elements for active and selected nodes
        $('[id ^= "tree"].settings').each(function (indx, element) {
            $(element).fancytree("getTree").generateFormElements();
        });
        // alert("POST data:\n" + jQuery.param($(this).serializeArray()));
        // return false to prevent submission of this sample
        //  return false;
    });
    /**
     * Alerts for tools when tasks is running
     * Placed in div = column-2, because column-1 is vtabs
     **/
    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        $("#column-2 .alert-success").hide();
        $("#column-2 .task-complete").hide();
        $("#column-2 .alert-info").show();
    });
    // $('a[data-toggle="pill"]').tabs( "option", "event", "show" );
    $('#vtabs2').bind('tabsselect', function (event, ui) {
        alert('select');
        $("#column-2 .alert-success").hide();
        $("#column-2 .task-complete").hide();
        $("#column-2 .alert-info").show();
    });
    /**
     * Common settings
     *
     **/
    $('[name = "attributico_product_text"]').each(function (indx, element) { // access to autoadd radio
        if (!$('[name = "attributico_autoadd"]').is(":checked")) {
            $(element).prop({
                "disabled": true,
                "checked": false
            });
        }
    });

    $('input[name = "attributico_autoadd"]:checkbox').change(function (e) { // autoadd attribute values to product
        flag = $(this).is(":checked");
        $('[name = "attributico_product_text"]').each(function (indx, element) {
            $(element).prop({
                "disabled": !flag
            });
        });
    });

    $('input[name = "attributico_smart_scroll"]:checkbox').change(function (e) { // event handler for smartscroll
        if ($(this).is(":checked")) {
            $('[id *= "tree"]:not(.settings) > ul.fancytree-container').addClass("smart-scroll");
        } else {
            $("ul.fancytree-container").removeClass("smart-scroll");
        }
    });

    $('input[name = "attributico_cache"]:checkbox').change(function (e) { // event handler for cache on/off
        $.ajax({
            data: {
                'user_token': user_token,
                'token': token
            },
            url: 'index.php?route=' + extension + 'module/attributico/cacheDelete',
            success: function (json) {
                $category_synchro_trees.each(function (indx, element) {
                    var tree = $("#" + element.id).fancytree("getTree");
                    tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");
                    tree.reload().done(function () {
                        tree.options.source.data.isPending = false;
                        reloadAttribute();
                        reactivateCategory();
                    });
                });
            }
        });
    });

    $('input[name = "attributico_multistore"]:checkbox').change(function (e) { // event handler for multistore categories output
        $.ajax({
            data: {
                'user_token': user_token,
                'token': token
            },
            url: 'index.php?route=' + extension + 'module/attributico/cacheDelete',
            success: function (json) {
                $category_synchro_trees.each(function (indx, element) {
                    var tree = $("#" + element.id).fancytree("getTree");
                    tree.options.source.data.multistore = $('input[name = "attributico_multistore"]:checkbox').is(":checked");
                    tree.reload().done(function () {
                        tree.options.source.data.isPending = false;
                        reloadAttribute();
                        reactivateCategory();
                    });
                });
            }
        });
    });
    /**
     * Context menu settings
     *
     **/
    $('input[id ^= "lazyLoad"]:checkbox').change(function (e) { // on/off lazyload
        var id = $(this).attr("id"),
                tree = $("#" + id.replace("lazyLoad_", "")).fancytree("getTree"),
                lazyLoad = $(this).is(":checked");
        tree.options.source.data.lazyLoad = lazyLoad;
        tree.reload();
    });

    $('input[id ^= "sortOrder"]:checkbox').change(function (e) { // on/off sortOrder
        var id = $(this).attr("id"),
                tree = $("#" + id.replace("sortOrder_", "")).fancytree("getTree"),
                sortOrder = $(this).is(":checked");
        tree.options.source.data.sortOrder = sortOrder;
        tree.options.source.data.category_id = currentCategory;
        tree.reload();
    });

    $('input[id ^= "autoCollapse"]:checkbox').change(function (e) { // autocollapse control
        var id = $(this).attr("id"),
                flag = $(this).is(":checked");
        $("#" + id.replace("autoCollapse_", "")).fancytree("getTree").options.autoCollapse = flag;
    });

    $('input[id ^= "multiSelect"]:checkbox').change(function (e) { // hierarchical select category
        var id = $(this).attr("id"),
                tree = $("#" + id.replace("multiSelect_", "")).fancytree("getTree");
        tree.options.selectMode = $(this).is(":checked") ? 3 : 2;
    });

    $('input[id ^= "diver"]:checkbox').change(function (e) { // on/off Divergence
        var id = $(this).attr("id");
        var lng_id = parseInt(id.replace(/\D+/ig, ''));
        var tree = $("#attribute_product_tree" + lng_id).fancytree("getTree");
        tree.reactivate();
    });

    /**
     * Build deduplicate tree (and detach tree)
     *
     **/
    $group_check_tree.each(function (indx, element) {
        var sortOrder = $('input[name = "attributico_sortorder"]:checkbox').is(":checked");
        $(element).fancytree({
            checkbox: true,
            selectMode: 3,
            autoScroll: true,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'sortOrder': sortOrder,
                    'onlyGroup': true,
                    'isPending': false
                },
                url: 'index.php?route=' + extension + 'module/attributico/getAttributeGroupTree'
            }
        });
    });
    /**
     * Build category attribute tree for tools
     *
     **/
    $category_check_tree.each(function (indx, element) {
        var sortOrder = $('input[name = "attributico_sortorder"]:checkbox').is(":checked");
        // var multistore = $('input[name = "attributico_multistore"]:checkbox').is(":checked");
        $(element).fancytree({
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            checkbox: true,
            selectMode: $('input[id = "input-attributico_multiselect"]:checkbox').is(":checked") ? 3 : 2,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'sortOrder': sortOrder
                },
                url: 'index.php?route=' + extension + 'module/attributico/getCategoryTree'
            }
        });
    });
}); // end of document ready

function tools(task) {
    $('[id *= "tree"].options').each(function (indx, element) {
        $(element).fancytree("getTree").generateFormElements(true, true, {
            filter: null,
            stopOnParents: false
        });
    });
    //var complete_img = '<img class= "complete-img" src="view/javascript/fancytree/skin-custom/accept.png"/>  ';
    // alert("POST data:\n" + jQuery.param($("#form-attributico").serializeArray()));
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
            'task': task,
            'options': $("#form-attributico").serialize()
        },
        url: 'index.php?route=' + extension + 'module/attributico/tools',
        beforeSend: function () {
            //  $("#column-2 .complete-img").hide();
            $("#column-2 .loader-img").show();
            $("#column-2 .alert-success").hide();
            // $("#column-2 .task-complete").hide();
            $("#column-2 .alert-warning").show();
        },
        success: function (json) {
            reloadAttribute();
            reactivateCategory();
            $("#column-2 .loader-img").hide();
            // $("#column-2 .complete-img").show();
            $("#column-2 .alert-warning").hide();
            $("#column-2 .alert-success").show();
            // $("#column-2 .task-complete").show();
            $("#column-2 .alert-success").html(json);
        }
    });
}