import { ContextmenuCommandDuty } from '../ContextMenu';
import { KeydownCommandDuty } from '../KeyDownCommand';
import Filter from '../FancyFilter';
import { reloadAttribute } from '../../functions/Syncronisation';

// --------------------------------------- duty attribute tree ----------------------------------------------
export default class DutyTree {
    constructor(element) {
        this.lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        this.currentTab = 'tab-duty';
        this.tree = $("#duty_attribute_tree" + this.lng_id);
        this.sortOrder = $('input[id = "sortOrder_duty_attribute_tree' + this.lng_id + '"]:checkbox').is(":checked");
        this.lazyLoad = $('input[id = "lazyLoad_duty_attribute_tree' + this.lng_id + '"]:checkbox').is(":checked");

        this.config = {
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
                    'language_id': this.lng_id,
                    'sortOrder': this.sortOrder,
                    'lazyLoad': this.lazyLoad,
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
                    if (!data.node.permission(['group', 'attribute', 'duty'])) {
                        return false;
                    }
                    // Return false to prevent edit mode
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
                let command = new KeydownCommandDuty(e, data);
                command.permissions = {
                    remove: data.node.permission(['duty']),
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
                        data.tree.$div.contextmenu("enableEntry", "remove", node.permission(['duty']));
                        data.tree.$div.contextmenu("enableEntry", "rename", node.permission(['group', 'attribute', 'duty']));
                        // data.tree.$div.contextmenu("enableEntry", "remove", true);
                        data.tree.$div.contextmenu("enableEntry", "addSibling", false);
                        data.tree.$div.contextmenu("enableEntry", "addChild", false);
                        node.setActive();
                    },
                    select: function (event, ui) {
                        let command = new ContextmenuCommandDuty(ui);
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