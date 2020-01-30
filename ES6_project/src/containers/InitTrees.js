/* import  'jquery.fancytree'; */
import 'jquery-ui';
import 'ui-contextmenu';

import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';
import 'jquery.fancytree/dist/modules/jquery.fancytree.dnd';

import ChildConfigTree from '../components/Trees/ChildConfigTree';
import AttributeGroupTree from '../components/Trees/AttributeGroupTree';
import CategoryTree from '../components/Trees/CategoryTree'
import CategoryAttributeTree from '../components/Trees/CategoryAttributeTree'
import AttributeTree from '../components/Trees/AttributeTree';
import DutyTree from '../components/Trees/DutyTree';
import AttributeProductTree from '../components/Trees/AttributeProductTree';
import ProductTree from '../components/Trees/ProductTree';
import GroupCheckTree from '../components/Trees/GroupCheckTree';
import CategoryCheckTree from '../components/Trees/CategoryCheckTree';

export default function initTrees() {

    /**
    * Building trees and configuring child nodes. (selectMode must be 2, see generateFormElements() description)
    *
    **/
    $('[id ^= "tree"]').each(function (indx, element) {
        let tree = new ChildConfigTree(element);
        tree.render();
    });

    /* 
        * Build deduplicate tree and detach tree for tools
        * This tree must have fixed position for correctly form serializing
        */
    GROUP_CHECK_TREE.each(function (indx, element) {
        let tree = new GroupCheckTree(element);
        tree.render();
    });

    /**
     * Build category attribute tree for tools
     * This tree must have fixed position for correctly form serializing
     **/
    CATEGORY_CHECK_TREE.each(function (indx, element) {
        let tree = new CategoryCheckTree(element);
        tree.render();
    });

    // ------------------------ main attribute table --------------------
    ATTRIBUTE_GROUP_TREE.each(function (indx, element) {
        let tree = new AttributeGroupTree(element);
        tree.render();
    });

    // ----------------------- category table --------------------------
    CATEGORY_TREE.each(function (indx, element) {
        let tree = new CategoryTree(element);
        tree.render();
    });

    CATEGORY_ATTRIBUTE_TREE.each(function (indx, element) {
        let tree = new CategoryAttributeTree(element);
        tree.render();
    });

    ATTRIBUTE_TREE.each(function (indx, element) {
        let tree = new AttributeTree(element);
        tree.render();
    });

    // ---------------------- duty attribute table ------------------
    DUTY_ATTRIBUTE_TREE.each(function (indx, element) {
        let tree = new DutyTree(element);
        tree.render();
    });

    // ------------------- product  attribute table -----------------
    ATTRIBUTE_PRODUCT_TREE.each(function (indx, element) {
        let tree = new AttributeProductTree(element);
        tree.render();
    });

    PRODUCT_TREE.each(function (indx, element) {
        let tree = new ProductTree(element);
        tree.render();
    });

} // end of Inittree()