import { reloadAttribute } from '../../functions/Syncronisation';
import { isTemplate, isValue } from '../../functions/Plugin/NodeMethod';

export function saveAfterEdit(event, data) {
    let parent = data.node.getParent();
    let lng_id = parseInt(data.tree.$div[0].id.replace(/\D+/ig, ''));
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
            'key': data.node.key,
            'name': data.input.val(),
            'language_id': lng_id,
            'oldname': data.orgTitle
        },
        url: 'index.php?route=' + extension + 'module/attributico/editAttribute'
    }).done(function (result) {
        let affilateValue = parent.getNextSibling();
        let affilateTemplate = parent.getPrevSibling();

        if (data.node.isTemplate() && affilateValue != null) {
            // Делаем аффилированный узел lazy, чтоб не перезагружать все дерево
            affilateValue.resetLazy();
            affilateValue.load(true).done(function (result) {
                reloadAttribute(data.node, false);
            });
        } else if (data.node.isValue() && affilateTemplate != null) {
            affilateTemplate.resetLazy();
            affilateTemplate.load(true).done(function (result) {               
                reloadAttribute(data.node, false);
            });
        } else {
            reloadAttribute(data.node, false);
        }
        // Server might return an error or a modified title
        data.node.setTitle(result.acceptedTitle); // in case server modified it                        //
        // Maybe also check for non-ajax errors, e.g. 'title invalid', ...
    }).fail(function (result) {
        // Ajax error: reset title (and maybe issue a warning)
        data.node.setTitle(data.orgTitle);
    }).always(function () {
        $(data.node.span).removeClass("pending");
    });
    // Optimistically assume that save will succeed. Accept the user input
    return true;
}