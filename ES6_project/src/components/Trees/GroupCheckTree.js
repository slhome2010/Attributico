import { ContextmenuCommand } from '../ContextMenuCommand';
//import { KeydownCommand } from '../KeyDownCommand';
export default class GroupCheckTree {
    constructor(element) {
        this.tree = $(element);
        this.lng_id = config_language;
        this.sortOrder = $('input[name = "attributico_sortorder"]:checkbox').is(":checked");

        this.config = {
            checkbox: true,
            selectMode: 3,
            autoScroll: true,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'sortOrder': this.sortOrder,
                    'onlyGroup': true,
                    'isPending': false
                },
                url: 'index.php?route=' + extension + 'module/attributico/getAttributeGroupTree'
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