export default class CategoryCheckTree {
    constructor(element) {
        this.tree = $(element);
        this.sortOrder = $('input[name = "attributico_sortorder"]:checkbox').is(":checked");
       
        this.config = {
            autoCollapse: true,
            autoScroll: true,
            minExpandLevel: 2,
            checkbox: true,
            selectMode: $('input[id = "input-attributico_multiselect"]:checkbox').is(":checked") ? 3 : 2,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'sortOrder': this.sortOrder
                },
                url: 'index.php?route=' + extension + 'module/attributico/getCategoryTree'
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