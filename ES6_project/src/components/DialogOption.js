/**
 * Filter create and event services
 * @type {function}
 *
 **/
export default function dialogOptionEvents() {
    // attach dialog event hundlers 
    $('input[id ^= "lazyLoad"]:checkbox').change(changeSettings);
    $('input[id ^= "sortOrder"]:checkbox').change(changeSettings);
    $('input[id ^= "autoCollapse"]:checkbox').change(changeSettings);
    $('input[id ^= "multiSelect"]:checkbox').change(changeSettings);
    $('input[id ^= "diver"]:checkbox').change(changeSettings);


    function changeSettings(e) {
        let id = $(this).attr("id");
        let selector = $(this).attr("class");
        let flag = $(this).is(":checked");
        let tree = $("#" + id.replace(selector + "_", "")).fancytree("getTree");
        ///(options_)/i, '');

        switch (selector) {
            case 'sortOrder':
                tree.options.source.data.sortOrder = flag;
                tree.options.source.data.category_id = currentCategory;
                tree.reload();
                break;
            case 'lazyLoad':
                tree.options.source.data.lazyLoad = flag;
                tree.reload();
                break;
            case 'autoCollapse':
                tree.options.autoCollapse = flag;
                break;
            case 'multiSelect':
                tree.options.selectMode = flag ? 3 : 2;
                break;
            case 'diver':
                let lng_id = parseInt(id.replace(/\D+/ig, ''));
                let activetree = $("#attribute_product_tree" + lng_id).fancytree("getTree");
                activetree.reactivate();
                break;
            default:
                break;
        }
    }

}