import { ATTRIBUTE_SYNCRO_TREES } from "../constants/global";

/**
 * @class Observer
 */
export default class Observer {
    constructor(store) {
        this.store = store;
        this.clearFilter = this.clearFilter.bind(this);
       // this.treeReload = this.treeReload.bind(this)
    }

    /* Clear Filter if tree reload */
    clearFilter = (tree) => {
         if (tree.isFilterActive()) {
             tree.clearFilter();

        $('input[name *= "search"]').val("");
        $('span[id *= "matches"]').text("");
        $("[id ^=loadImg]").hide();
          }
    }

    treeReload() {
        let state = this.store.getState().dndReducer;
        console.log(state.activeNode.key, state.sourceNode.key, state.targetNode.key);
        $(ATTRIBUTE_SYNCRO_TREES).each(function (indx, element) {
            let tree = $("#" + element.id).fancytree("getTree");
            tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");
            if ((tree !== state.tree) || state.selfReload) { // not reload active tree
                this.clearFilter(tree).bind(this);
                tree.reload().done(function () {
                    /* Зачем нужен флаг, что дерево в процессе перезагрузки?  */
                    tree.options.source.data.isPending = false;
                    /* В каждом дереве установим активный узел */
                    let localActiveNode = tree.getNodeByKey(state.activeNode.key);
                    if (localActiveNode && localActiveNode !== undefined) {
                        localActiveNode.setActive();
                        /* newnode.makeVisible();
                        newnode.scrollIntoView(); */
                    }
                });
            }
        });
        /* Если активное дерево не перезагружалось, то надо установить активный узел принудительно */
        if (!state.selfReload) {
            state.activeNode.setActive();           
        }        
    }

    init() {
        this.store.subscribe(this.treeReload.bind(this))
    }
}