import { ATTRIBUTE_SYNCRO_TREES } from "../constants/global";

/**
 * @class Observer
 */
export default class Observer {
    constructor(store) {
        this.store = store;
        // this.clearFilter = this.clearFilter.bind(this);
        // this.treeReload = this.treeReload.bind(this)
    }

    /* Clear Filter if tree reload */
    clearFilter(tree) {
        if (tree.isFilterActive()) {

            tree.clearFilter();

            $('input[name *= "search"]').val("");
            $('span[id *= "matches"]').text("");
            $("[id ^=loadImg]").hide();
        }
    }

    treeReload() {
        let state = this.store.getState().dndReducer;
        /* console.log('state', state); */
        /* console.log('state.tree ', state.tree.$div[0].id); */
        $(ATTRIBUTE_SYNCRO_TREES).each(function (indx, element) {
            let tree = $("#" + element.id).fancytree("getTree");
            tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");
            if ((tree !== state.tree) || state.selfReload) { // not reload active tree
                this.clearFilter(tree);
                tree.reload().done(function () {
                    /* Зачем нужен флаг, что дерево в процессе перезагрузки?  */
                    tree.options.source.data.isPending = false;
                    /* В каждом дереве установим активный узел или альтернативный, н-р, родителя */
                    /* console.log(tree.$div[0].id, ' has reloaded'); */
                    let activeNode = state.activeNode !== null ? tree.getNodeByKey(state.activeNode.key) : null;
                    let altActiveNode = state.altActiveNode != null ? tree.getNodeByKey(state.altActiveNode.key) : null;

                    if (activeNode !== null) {
                        /* console.log('activeNode', activeNode.key); */
                        activeNode.setActive();
                        /* Если бы могли, то подогнали бы в область видимости newnode.makeVisible(); newnode.scrollIntoView(); */
                    } else if (altActiveNode !== null) {
                        /* console.log('altActiveNode', altActiveNode.key); */
                        altActiveNode.setActive();
                    }
                });
            }
        }.bind(this));
        /* Если активное дерево не перезагружалось, то надо установить активный узел принудительно */
        if (!state.selfReload) {
            state.activeNode.setActive();
        }
    }

    init() {
        this.store.subscribe(this.treeReload.bind(this))
    }
}