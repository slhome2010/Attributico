import Filter from '../FancyFilter';
import { ContextmenuCommand } from '../ContextMenuCommand';
import { KeydownCommand } from '../KeyDownCommand';

export default class AttributeProductTree {
    constructor(element) {
        this.lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        this.currentTab = 'tab-products';
        this.tree = $("#attribute_product_tree" + this.lng_id);
        this.sortOrder = $('input[id = "sortOrder_attribute_product_tree' + this.lng_id + '"]:checkbox').is(":checked");
        this.lazyLoad = $('input[id = "lazyLoad_attribute_product_tree' + this.lng_id + '"]:checkbox').is(":checked");

        this.config = {
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
                    'language_id': this.lng_id,
                    'sortOrder': this.sortOrder,
                    'lazyLoad': this.lazyLoad,
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
            activate: (event, data) => {
                var tree = $("#product_tree" + this.lng_id).fancytree("getTree");
                currentAttribute = data.node.key;
                tree.reload({
                    data: {
                        'user_token': user_token,
                        'token': token,
                        'language_id': this.lng_id,
                        'attribute_id': data.node.key,
                        'title': data.node.title,
                        'sortOrder': $('input[id = "sortOrder_attribute_product_tree' + this.lng_id + '"]:checkbox').is(":checked"),
                        'invert': $('input[id = "diver_product_tree' + this.lng_id + '"]:checkbox').is(":checked")
                    },
                    url: 'index.php?route=' + extension + 'module/attributico/getProductTree'
                });
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
            beforeSelect: function (event, data) {
                if (!selectControl(data)) {
                    return false;
                }
            },
            select: function (event, data) {
                selNodes = data.tree.getSelectedNodes();
            },
            click: function (event, data) { },
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
                        data.tree.$div.contextmenu("enableEntry", "remove", false);
                        data.tree.$div.contextmenu("enableEntry", "rename", false);
                        data.tree.$div.contextmenu("enableEntry", "addSibling", false);
                        data.tree.$div.contextmenu("enableEntry", "addChild", false);
                        data.tree.$div.contextmenu("enableEntry", "copy", false);
                        data.tree.$div.contextmenu("enableEntry", "paste", false);
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