export default class GroupCheckTree {
    constructor(element) {                
        this.tree = $(element);
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

            }
        }
    }

    render() {
        this.tree.fancytree(this.config);
    }
}