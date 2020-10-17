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

    printState(state) {
        let stateInfo = {
            tree: state.tree.$div[0].id,
            sourceNode: state.sourceNode !== null ? state.sourceNode.title : null,
            targetNode: state.targetNode !== null ? state.targetNode.title : null,
            activeNode: state.activeNode !== null ? state.activeNode.title : null,
            altActiveNode: state.altActiveNode !== null ? state.altActiveNode.title : null,
            selfReload: state.selfReload
        }
        console.log('stateInfo', stateInfo)
    }

    treeReload() {
        let state = { ...this.store.getState().reloadReducer, ...this.store.getState().smartReducer };
        this.printState(state)
        $(state.boundTrees).each(function (indx, element) {
            let tree = $.ui.fancytree.getTree("#" + element.id);
            let currentActiveNode = tree.getActiveNode();
            tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");
            if ((tree !== state.tree) || state.selfReload) { // not reload active tree
                this.clearFilter(tree);
                tree.reload().done(function () {
                    /* В каждом дереве установим активный узел или альтернативный, н-р, родителя */
                    console.log(tree.$div[0].id, ' has reloaded');
                    let activeNode = state.activeNode !== null ? tree.getNodeByKey(state.activeNode.key) : currentActiveNode !== null ? tree.getNodeByKey(currentActiveNode.key) : null;
                    let altActiveNode = state.altActiveNode != null ? tree.getNodeByKey(state.altActiveNode.key) : null;

                    if (activeNode !== null) {
                        /* console.log('activeNode', activeNode.key, activeNode.title); */
                        activeNode.getParent().setExpanded(true).done(function () { activeNode.setActive(true) });
                        /* Если бы могли, то подогнали бы в область видимости newnode.makeVisible(); newnode.scrollIntoView(); */
                    } else if (altActiveNode !== null) {
                        /* console.log('!altActiveNode', altActiveNode.key, altActiveNode.title); */
                        altActiveNode.getParent().setExpanded(true).done(function () { altActiveNode.setActive(true) });
                    }
                });
            }
        }.bind(this));
        /* Если активное дерево не перезагружалось, то надо установить активный узел принудительно */
        if (!state.selfReload && state.activeNode !== null) {
            /* console.log('selfActiveNode', state.activeNode.key, state.activeNode.title); */
            state.activeNode.getParent().setExpanded(true).done(function () { state.activeNode.setActive(true) });
        }
    }

    init() {
        this.store.subscribe(this.treeReload.bind(this))
    }
}