export default class ProductTree {
    constructor(element) {
        this.lng_id = parseInt(element.id.replace(/\D+/ig, ''));        
        this.tree = $("#product_tree" + this.lng_id);
        this.diver = $('input[id = "diver_product_tree' + this.lng_id + '"]:checkbox').is(":checked");      

        this.config = {     
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'language_id': this.lng_id,
                    'invert': this.diver
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
            dblclick: (event, data) => {
                if (data.node.getLevel() <= 2) {
                    data.node.setExpanded(!data.node.isExpanded());
                    return false;
                }
                var about_blank = $('input[id = "input-attributico_about_blank"]:checkbox').is(":checked");
                var attribute_product_tree = $("#attribute_product_tree" + this.lng_id).fancytree("getTree");
                var attribute_node = attribute_product_tree.getActiveNode();
                if (about_blank) {
                    $("#reload.alert-danger").show();
                    window.open("index.php?route=catalog/product/" + edit + '&user_token=' + user_token + '&token=' + token + "&product_id=" + data.node.key.split('_')[1] + "&attribute_id=" + attribute_node.key.split('_')[1], '_blank');
                } else {
                    window.location.href = "index.php?route=catalog/product/" + edit + '&user_token=' + user_token + '&token=' + token + "&product_id=" + data.node.key.split('_')[1] + "&attribute_id=" + attribute_node.key.split('_')[1];
                }
                // index.php?route=catalog/product/update for 1.5.5
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