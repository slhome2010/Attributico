/** http://servenus.com © 2015-2019 All Rights Reserved **/
/** For Attribut&co v.3.0.6  **/

import 'jquery-ui/ui/widgets/dialog'; 
import 'jquery.fancytree'; 

import buildFilter from './containers/BuildFilter'
import initTrees from './containers/InitTrees' 
import tools from './functions/WindowContext/Tools'
import apply from './functions/WindowContext/Apply'
import { checkForUpdates, dutyUpgrade } from './functions/WindowContext/Upgrade'
import { reloadAttribute } from './functions/Syncronisation';
import './functions/Plugin/Dropmenu.js';

window.tools = tools;
window.apply = apply;
window.checkForUpdates = checkForUpdates;
window.dutyUpgrade = dutyUpgrade;

// document ready actions
$(function () {     
    var t0 = performance.now();   

    $('.fancyfilter').each(buildFilter);

    initTrees();

    var ajaxFinished = 0;
    var totalAjax = 19; //Total of ajax functions you have

    $(document).ajaxComplete(function() { //Listener for a complete Ajax function
        ajaxFinished += 1;
        if (ajaxFinished == totalAjax) { //here you know that all tasks are finish
            var t1 = performance.now();
            console.log("Call to initTrees took " + (t1 - t0) + " milliseconds.");
        }
    });
    
      
    /* Button Save onclick event */
    $("#form-attributico").submit(function () {
        // Render hidden <input> elements for active and selected nodes
        $('[id ^= "tree"].settings').each(function (indx, element) {
            $(element).fancytree("getTree").generateFormElements();
        });
        // alert("POST data:\n" + jQuery.param($(this).serializeArray()));
        // return false to prevent submission of this sample
        //  return false;
    });

    /**
     * Alerts for tools when tasks is running
     * Placed in div = column-2, because column-1 is vtabs
     **/
    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        $("#column-2 .alert-success").hide();
        $("#column-2 .task-complete").hide();
        $("#column-2 .alert-info").show();
    });
   
    /**
     * Common settings change event hundlers
     *
     **/
    // access to autoadd radio
    $('[name = "attributico_product_text"]').each(function (indx, element) {
        if (!$('[name = "attributico_autoadd"]').is(":checked")) {
            $(element).prop({
                "disabled": true,
                "checked": false
            });
        }
    });
    // autoadd attribute values to product
    $('input[name = "attributico_autoadd"]:checkbox').change(function (e) {
        flag = $(this).is(":checked");
        $('[name = "attributico_product_text"]').each(function (indx, element) {
            $(element).prop({
                "disabled": !flag
            });
        });
    });
    // event handler for smartscroll
    $('input[name = "attributico_smart_scroll"]:checkbox').change(function (e) {
        if ($(this).is(":checked")) {
            $('[id *= "tree"]:not(.settings) > ul.fancytree-container').addClass("smart-scroll");
        } else {
            $("ul.fancytree-container").removeClass("smart-scroll");
        }
    });
    // event handler for cache on/off
    $('input[name = "attributico_cache"]:checkbox').change(function (e) {
        $.ajax({
            data: {
                'user_token': user_token,
                'token': token
            },
            url: 'index.php?route=' + extension + 'module/attributico/cacheDelete',
            success: function (json) {
                let size = CATEGORY_SYNCRO_TREES.size();
                CATEGORY_SYNCRO_TREES.each(function (indx, element) {
                    var tree = $("#" + element.id).fancytree("getTree");
                    tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");
                    tree.reload().done(function () {
                        tree.options.source.data.isPending = false;
                        if (indx + 1 == size) {
                            reloadAttribute();
                            // reactivateCategory();
                        }
                    });
                });
            }
        });
    });
    // event handler for multistore categories output
    $('input[name = "attributico_multistore"]:checkbox').change(function (e) {
        $.ajax({
            data: {
                'user_token': user_token,
                'token': token
            },
            url: 'index.php?route=' + extension + 'module/attributico/cacheDelete',
            success: function (json) {
                let size = CATEGORY_SYNCRO_TREES.size();
                CATEGORY_SYNCRO_TREES.each(function (indx, element) {
                    var tree = $("#" + element.id).fancytree("getTree");
                    tree.options.source.data.multistore = $('input[name = "attributico_multistore"]:checkbox').is(":checked");
                    tree.reload().done(function () {
                        tree.options.source.data.isPending = false;
                        if (indx + 1 == size) {
                            reloadAttribute();
                            // reactivateCategory();
                        }
                    });
                });
            }
        });
    });

    /**
     * Context menu dialog events
     *
     **/
    // Attach dialog
    $('[id *= "options_"]').dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        buttons: [{
            icons: {
                primary: "ui-icon-check"
            },
            'class': "hawt-button",
            title: "Apply",
            click: function () {
                $(this).dialog("close");
            }
        }]
    });

    // on/off lazyload
    $('input[id ^= "lazyLoad"]:checkbox').change(function (e) {
        var id = $(this).attr("id"),
            tree = $("#" + id.replace("lazyLoad_", "")).fancytree("getTree"),
            lazyLoad = $(this).is(":checked");
        tree.options.source.data.lazyLoad = lazyLoad;
        tree.reload();
    });
    // on/off sortOrder
    $('input[id ^= "sortOrder"]:checkbox').change(function (e) {
        var id = $(this).attr("id"),
            tree = $("#" + id.replace("sortOrder_", "")).fancytree("getTree"),
            sortOrder = $(this).is(":checked");
        tree.options.source.data.sortOrder = sortOrder;
        tree.options.source.data.category_id = currentCategory;
        tree.reload();
    });
    // autocollapse control
    $('input[id ^= "autoCollapse"]:checkbox').change(function (e) {
        var id = $(this).attr("id"),
            flag = $(this).is(":checked");
        $("#" + id.replace("autoCollapse_", "")).fancytree("getTree").options.autoCollapse = flag;
    });
    // hierarchical select category
    $('input[id ^= "multiSelect"]:checkbox').change(function (e) {
        var id = $(this).attr("id"),
            tree = $("#" + id.replace("multiSelect_", "")).fancytree("getTree");
        tree.options.selectMode = $(this).is(":checked") ? 3 : 2;
    });
    // on/off Divergence
    $('input[id ^= "diver"]:checkbox').change(function (e) {
        var id = $(this).attr("id");
        var lng_id = parseInt(id.replace(/\D+/ig, ''));
        var tree = $("#attribute_product_tree" + lng_id).fancytree("getTree");
        tree.reactivate();
    });

}); // end of document ready