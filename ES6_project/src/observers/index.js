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

    setActiveNode(tree, estimatedAactiveNode, possibleActiveNode) {
        let currentActiveNode = tree.getActiveNode();
        let activeNode = estimatedAactiveNode !== null ? tree.getNodeByKey(estimatedAactiveNode.key) : currentActiveNode !== null ? tree.getNodeByKey(currentActiveNode.key) : null;
        let altActiveNode = possibleActiveNode != null ? tree.getNodeByKey(possibleActiveNode.key) : null;
        console.log('6 set active for:', tree.$div[0].id);
        if (activeNode !== null) {
            /* console.log('activeNode', activeNode.key, activeNode.title); */
            activeNode.getParent().setExpanded(true).done(function () { activeNode.setActive(true) });
            /* Если бы могли, то подогнали бы в область видимости newnode.makeVisible(); newnode.scrollIntoView(); */
        } else if (altActiveNode !== null) {
            /* console.log('!altActiveNode', altActiveNode.key, altActiveNode.title); */
            altActiveNode.getParent().setExpanded(true).done(function () { altActiveNode.setActive(true) });
        }
    }


    // TODO make it promise
    async smartReload(tree, nodeList) {
        console.log('5 Nodes received for:', tree.$div[0].id,);
        async function loadChild(child) {
            if (child.isTemplate() || child.isValue()) {
                child.resetLazy();
                await child.load(true).done(() => {
                    console.log('0 Lazy loaded for:', child.title, child.tree.$div[0].id);
                });
            }
        }

        async function allChildLoaded(findedNode) {
            let childrens = findedNode.getChildren()
            for (let child of childrens) {
                await loadChild(child);
                console.log('1 Child loaded for:', child.title, child.tree.$div[0].id);
            }
            return 'The end of allChildren'
        }

        async function allNodesLoaded(nodeList) {
            for (let node of nodeList) {
                let findedNode = tree.getNodeByKey(node.key);
                await allChildLoaded(findedNode)
                console.log('2 Childrens loaded for:', findedNode.title, findedNode.tree.$div[0].id)
            }
        }

        await allNodesLoaded(nodeList)
        console.log('3 Nodes loaded for:', tree.$div[0].id,);
        /* this.setActiveNode(tree, state.activeNode, state.altActiveNode) */
    }

    treeReload() {
        let state = { ...this.store.getState().reloadReducer, ...this.store.getState().smartReducer };
        this.printState(state)
        /* Если активное дерево не перезагружалось, то надо установить активный узел принудительно */
        if (!state.selfReload && state.activeNode !== null) {
            /* console.log('selfActiveNode', state.activeNode.key, state.activeNode.title); */
            state.activeNode.getParent().setExpanded(true).done(function () { state.activeNode.setActive(true) });
        }

        $(state.boundTrees).each(async function (indx, element) {
            let tree = $.ui.fancytree.getTree("#" + element.id);

            tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");

            if (state.affectedNodes !== null) {
                await this.smartReload(tree, state.affectedNodes)
                this.setActiveNode(tree, state.activeNode, state.altActiveNode)
            } else
                if ((tree !== state.tree) || state.selfReload) { // not reload active tree
                    this.clearFilter(tree);
                    tree.reload().done(() => {
                        /* В каждом дереве установим активный узел или альтернативный, н-р, родителя */
                        console.log(tree.$div[0].id, ' has reloaded');
                        this.setActiveNode(tree, state.activeNode, state.altActiveNode)
                    });
                }

        }.bind(this));
    }

    init() {
        this.store.subscribe(this.treeReload.bind(this))
    }
}