import { deSelectNodes, getSelectedKeys, selectControl } from '../../functions/Select';
import { reactivateCategory } from '../../functions/Syncronisation';
import { addAttributeToCategory } from '../../functions/Crud';
import { KeydownCommandCategory } from '../KeyDownCommand';
import { ContextmenuCommandCategory } from '../ContextMenuCommand';

// --------------------------------------- category attribute tree -------------------------------------
export default class CategoryAttributeTree {
    constructor(element) {
        this.lng_id = parseInt(element.id.replace(/\D+/ig, ''));        
        this.tree = $("#category_attribute_tree" + this.lng_id);
        this.sortOrder = $('input[id = "sortOrder_category_attribute_tree' + this.lng_id + '"]:checkbox').is(":checked");        

        this.config = {
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            selectMode: 2,
            extensions: ["edit", "dnd"],
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': this.lng_id,
                    'category_id': currentCategory,
                    'sortOrder': this.sortOrder,
                    'tree': "4"
                },
                url: 'index.php?route=' + extension + 'module/attributico/getCategoryAttributeTree'
            },
            loadError: function (e, data) {
                let error = data.error;
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
                triggerStart: [],
                inputCss: {
                    minWidth: "18em"
                },
                beforeEdit: function (event, data) {
                    if (!data.isNew) {
                        return false;
                    }
                },
                edit: (event, data) => {
                    data.input.dropmenu({
                        'source': function (request, response) {
                            $.ajax({
                                data: {
                                    'user_token': user_token,
                                    'token': token,
                                    'filter_name': encodeURIComponent(request),
                                    'language_id': this.lng_id
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
                save: (event, data) => {
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
                    remove: !data.node.key.indexOf('attribute'),
                    addChild: true,
                    addSibling: false,
                    copy: !data.node.key.indexOf('attribute'),
                    paste: true
                };
                command.execute();
            },
            focusTree: function (e, data) {
                data.tree.$container.focus();
            },
            init: (event, data) => {
                //console.log(data.tree.$div.context.id, ' has loaded');
                //data.tree.$container.each(function(index,element){console.log("CategoryAttributeTree", element)});
                if (smartScroll.is(":checked"))
                    data.tree.$container.addClass("smart-scroll");
                    
                data.tree.$div.contextmenu({
                    delegate: "span.fancytree-title",
                    menu: contextmenuConfig[this.lng_id],
                    beforeOpen: function (event, ui) {
                        let node = $.ui.fancytree.getNode(ui.target);
                        data.tree.$div.contextmenu("enableEntry", "remove", !node.key.indexOf('attribute'));
                        data.tree.$div.contextmenu("enableEntry", "rename", false);
                        data.tree.$div.contextmenu("enableEntry", "addSibling", false);
                        data.tree.$div.contextmenu("enableEntry", "copy", !node.key.indexOf('attribute'));
                        data.tree.$div.contextmenu("enableEntry", "paste", !(clipboardNodes.length == 0));
                        node.setActive();
                    },
                    select: function (event, ui) {
                        let command = new ContextmenuCommandCategory(ui);
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