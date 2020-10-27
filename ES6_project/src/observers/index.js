/**
 * @class Observer
 */
import { getSelectedTitles } from '../functions/Select'
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
            tree: state.tree !== null ? state.tree.$div[0].id : null,
            sourceNode: state.sourceNode !== null ? state.sourceNode.title : null,
            targetNode: state.targetNode !== null ? state.targetNode.title : null,
            activeNode: state.activeNode !== null ? state.activeNode.title : null,
            altActiveNode: state.altActiveNode !== null ? state.altActiveNode.title : null,
            selfReload: state.selfReload,
            affectedNodes: getSelectedTitles(state.affectedNodes)
        }
        console.log('stateInfo', stateInfo)
    }

    async setExpandedParents(node) {
        let parentList = node.getParentList()
        for (let parent of parentList) {
            await parent.setExpanded(true)
        }
    }

    async setActiveNode(tree, estimatedAactiveNode, possibleActiveNode) {
        let currentActiveNode = tree.getActiveNode();
        let activeNode = estimatedAactiveNode !== null ? tree.getNodeByKey(estimatedAactiveNode.key) : currentActiveNode !== null ? tree.getNodeByKey(currentActiveNode.key) : null;
        let altActiveNode = possibleActiveNode != null ? tree.getNodeByKey(possibleActiveNode.key) : null;

        if (activeNode !== null) {
            await this.setExpandedParents(activeNode)
            activeNode.setActive(true)
            /* Если бы могли, то подогнали бы в область видимости newnode.makeVisible(); newnode.scrollIntoView(); */
        } else if (altActiveNode !== null) {
            await this.setExpandedParents(altActiveNode)
            altActiveNode.setActive(true)
        }
    }

    async allChildLoaded(node) {
        let childrens = node.getChildren()

        for (let child of childrens) {
            if (child.isTemplate() || child.isValue()) {
                child.resetLazy();
                await child.load(true)
                /* console.log('1 Child loaded for:', child.key, child.tree.$div[0].id); */
            }
        }
    }

    async parentLoaded(node) {

        node.resetLazy();
        await node.load(true)

    }

    async allNodesLoaded(tree, nodeList) {
        for (let node of nodeList) {
            let findedNode = tree.getNodeByKey(node.key);
            if (findedNode.isGroup()) {
                await this.parentLoaded(findedNode)
            } else {
                await this.allChildLoaded(findedNode)
            }
            /* console.log('2 Childrens loaded for:', findedNode.title, findedNode.tree.$div[0].id) */
        }
    }

    async smartReload(tree, nodeList) {
        await this.allNodesLoaded(tree, nodeList)
        /* console.log('3 Nodes loaded for:', tree.$div[0].id,);  */
    }

    /* Асинхронная функция. Деревья и узлы грузятся параллельно, но установка активного узла только после загрузки. */
    treeReload() {
        let state = { ...this.store.getState().reloadReducer, ...this.store.getState().smartReducer };
        this.printState(state)
        /* Если активное дерево не перезагружалось, то надо установить активный узел принудительно */
        if (!state.selfReload && state.activeNode !== null) {
            state.activeNode.getParent().setExpanded(true).done(() => { state.activeNode.setActive(true) });
        }

        $(state.boundTrees).each(async function (indx, treeSelector) {
            let tree = $.ui.fancytree.getTree("#" + treeSelector.id);
            tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");
            if (state.affectedNodes !== null) {
                // self перенести в реюсер т.к. разное управление для разных операций
                /* console.log('(', tree !== state.tree, '||', state.targetNode.getParent().isLazy(), ') ||', state.selfReload) */
                if ((tree !== state.tree) || state.selfReload) {
                    await this.smartReload(tree, state.affectedNodes)
                }
                this.setActiveNode(tree, state.activeNode, state.altActiveNode)
            } else
                if ((tree !== state.tree) || state.selfReload) { // not reload active tree
                    this.clearFilter(tree);
                    tree.reload().done(() => {
                        /* В каждом дереве установим активный узел или альтернативный, н-р, родителя */
                        this.setActiveNode(tree, state.activeNode, state.altActiveNode)
                    });
                }
        }.bind(this));
    }
    /* Функция приведенная к синхронному виду. Деревья и узлы грузятся последовательно */
    /* async asyncTreeReload() {
        let state = { ...this.store.getState().reloadReducer, ...this.store.getState().smartReducer };
        let trees = [];
        // Сформируем массив для последующего синхронного цикла for...of
        $(state.boundTrees).each((indx, treeSelector) => {
            let tree = $.ui.fancytree.getTree("#" + treeSelector.id);
            trees.push(tree)
        })
        
        if (!state.selfReload && state.activeNode !== null) {
            state.activeNode.getParent().setExpanded(true).done(() => { state.activeNode.setActive(true) });
        }

        for (let tree of trees) {
            tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");
            if (state.affectedNodes !== null) {
                await this.smartReload(tree, state.affectedNodes)
                this.setActiveNode(tree, state.activeNode, state.altActiveNode)
            } else
                if ((tree !== state.tree) || state.selfReload) { 
                    this.clearFilter(tree);
                    tree.reload().done(() => {                       
                        this.setActiveNode(tree, state.activeNode, state.altActiveNode)
                    });
                }
        }
    } */

    init() {
        this.store.subscribe(this.treeReload.bind(this))
    }
}