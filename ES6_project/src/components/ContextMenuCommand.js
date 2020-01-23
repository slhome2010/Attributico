/**
 * Handling contextmenu commands
 * @returns {none}
 *
 **/

/* import  'jquery.fancytree'; */
import {copyPaste, deleteDuty, deleteAttributesFromCategory, deleteAttribute, addAttribute} from '../functions/Crud'
import { deSelectNodes } from '../functions/Select';
import CollapseExpande from './Events/CollapseExpande';

export class ContextmenuCommand {
    constructor(ui) {        
        this.ui = ui;
        this.node = $.ui.fancytree.getNode(ui.target);
        this.tree = $.ui.fancytree.getTree(ui.target);        
        this.selector = this.tree.$div[0].id;
        this.lng_id = parseInt(this.selector.replace(/\D+/ig, ''));
    }

    execute() {
        switch (this.ui.cmd) {
            case "expande":
            case "collapse":
                CollapseExpande(this.tree);
                break;
            case "options":
                $("#options_" + this.selector).dialog("open");
                break;
            case "rename":
                this.node.editStart();
                break;
            case "remove":
                if (!confirm(textConfirm)) {
                    break;
                }
                this.remove();
                break;
            case "addChild":
                if (this.node.getLevel() !== 1) {
                    this.addChild();
                }
                break;
            case "addSibling":
                this.addSibling();
                break;
            // case "cut":
            case "copy":
                copyPaste(this.ui.cmd, this.node);
                break;
            case "paste":
                copyPaste(this.ui.cmd, this.node);
                deSelectNodes(this.node);
                break;
            default:
                alert("Todo: appply action '" + this.ui.cmd + "' to node " + this.node);
        }
    }

    remove() {
        deleteAttribute(this.node)
    }

    addChild() {
        addAttribute(this.node, 'attribute', this.lng_id);
    }

    addSibling() {
        addAttribute(this.node, 'group', this.lng_id);
    }
}

/* Override methods for CategoryattributeTree and DutyTree*/
export class ContextmenuCommandCategory extends ContextmenuCommand {

    remove() {
        deleteAttributesFromCategory(this.node);
    }

    addChild() {
       // console.log(this.tree.getRootNode(),this.tree.getRootNode().getFirstChild());
        this.tree.getRootNode().getFirstChild().editCreateNode("child"); // add child attribute to root category
    }
}

export class ContextmenuCommandDuty extends ContextmenuCommand {

    remove() {
        deleteDuty(this.node);
    }
}