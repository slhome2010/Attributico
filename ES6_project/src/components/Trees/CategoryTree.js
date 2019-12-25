import { ContextmenuCommand } from '../ContextMenuCommand';
import { KeydownCommand } from '../KeyDownCommand';
import { addAttributeToCategory } from '../../functions/Crud';

// --------------------------------------- category tree ------------------------------------------------
export default class CategoryTree {
    constructor(element) {
        this.lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        this.currentTab = 'tab-category';
        this.tree = $("#category_tree" + this.lng_id);
        this.sortOrder = $('input[id = "sortOrder_category_tree' + this.lng_id + '"]:checkbox').is(":checked");

        this.config = {
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            extensions: ["dnd"],
            checkbox: true,
            selectMode: $('input[id = "multiSelect_category_tree' + this.lng_id + '"]:checkbox').is(":checked") ? 3 : 2,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': this.lng_id,
                    'sortOrder': this.sortOrder
                },
                url: 'index.php?route=' + extension + 'module/attributico/getCategoryTree'
            },
            activate: (event, data)  => {
                // var node = data.node;
                let tree = $("#category_attribute_tree" + this.lng_id).fancytree("getTree");
                currentCategory = data.node.key;
                tree.reload({
                    data: {
                        'user_token': user_token,
                        'token': token,
                        'language_id': this.lng_id,
                        'category_id': currentCategory,
                        'sortOrder': $('input[id = "sortOrder_category_attribute_tree' + this.lng_id + '"]:checkbox').is(":checked"),
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
            },
            init: (event, data) => {
                //console.log(data.tree.$div.context.id, ' has loaded');
                if (smartScroll.is(":checked"))
                    data.tree.$container.addClass("smart-scroll");
                    
                data.tree.$div.contextmenu({
                    delegate: "span.fancytree-title",
                    menu: contextmenuConfig[this.lng_id],
                    beforeOpen: function (event, ui) {
                        let node = $.ui.fancytree.getNode(ui.target);
                        data.tree.$div.contextmenu("enableEntry", "remove", false);
                        data.tree.$div.contextmenu("enableEntry", "rename", false);
                        data.tree.$div.contextmenu("enableEntry", "addSibling", false);
                        data.tree.$div.contextmenu("enableEntry", "addChild", false);
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