//import { reloadAttribute } from '../../functions/Syncronisation';
import { isTemplate, isValue } from '../../functions/Plugin/NodeMethod';
import { updateNode } from '../../actions';

export function saveAfterEdit(event, data, store) {
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
        /* Edit template */
        if (data.node.isTemplate() && affilateValue != null) {
            // Делаем аффилированный узел lazy, чтоб не перезагружать все активное дерево
            affilateValue.resetLazy();
            affilateValue.load(true).done(function (result) {
                /* Остальные деревья перезагружаем */
                store.dispatch(updateNode(data.node));
            });
        /* Edit value */
        } else if (data.node.isValue() && affilateTemplate != null) {
            affilateTemplate.resetLazy();
            affilateTemplate.load(true).done(function (result) {
                store.dispatch(updateNode(data.node));
            });
        /* Edit Attribute or Group */
        } else {
            store.dispatch(updateNode(data.node));
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