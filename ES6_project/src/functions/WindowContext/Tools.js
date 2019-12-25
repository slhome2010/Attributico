import { reloadAttribute, reactivateCategory } from "../Syncronisation";

export default function tools(task) {
    $('[id *= "tree"].options').each(function (indx, element) {
        $(element).fancytree("getTree").generateFormElements(true, true, {
            filter: null,
            stopOnParents: false
        });
    });
    //var complete_img = '<img class= "complete-img" src="view/javascript/fancytree/skin-custom/accept.png"/>  ';
    // alert("POST data:\n" + jQuery.param($("#form-attributico").serializeArray()));
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
            'task': task,
            'options': $("#form-attributico").serialize()
        },
        url: 'index.php?route=' + extension + 'module/attributico/tools',
        beforeSend: function () {
            //  $("#column-2 .complete-img").hide();
            $("#column-2 .loader-img").show();
            $("#column-2 .alert-success").hide();
            // $("#column-2 .task-complete").hide();
            $("#column-2 .alert-warning").show();
        },
        success: function (json) {
            reloadAttribute();
            reactivateCategory();
            $("#column-2 .loader-img").hide();
            // $("#column-2 .complete-img").show();
            $("#column-2 .alert-warning").hide();
            $("#column-2 .alert-success").show();
            // $("#column-2 .task-complete").show();
            $("#column-2 .alert-success").html(json);
        }
    });
}