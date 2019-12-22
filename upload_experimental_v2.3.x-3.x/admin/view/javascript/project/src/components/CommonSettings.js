import { reloadAttribute } from "../functions/Syncronisation";

/**
* Common settings change event hundlers
*
**/
export default function commonSettings() {

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

}