<?php echo $header; ?>
<div id="content">
    <div class="breadcrumb">
        <?php foreach ($breadcrumbs as $breadcrumb) { ?>
            <?php echo $breadcrumb['separator']; ?><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a>
        <?php } ?>
    </div>
    <?php if ($error_warning) { ?>
        <div class="warning"><?php echo $error_warning; ?></div>
    <?php } ?>
    <div id="reload" class="alert attention alert-danger alert-dismissible" role="alert" style="display: none"><i class="fa fa-exclamation-triangle"></i> <?php echo $alert_reload; ?>
    </div>
    <div class="box">
        <div class="heading">
            <h1><?php echo $heading_title; ?></h1>
            <div class="buttons">
                <a onclick="$('#form-attributico').submit();" class="button"><?php echo $button_save; ?></a>
                <a href="<?php echo $cancel; ?>" class="button"><?php echo $button_cancel; ?></a>
            </div>
        </div>
        <div class="content">
            <form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data" id="form-attributico">
                <div id="tabs" class="htabs">
                    <a href="#tab-general"><?php echo $tab_general; ?></a>
                    <a href="#tab-attribute"><?php echo $tab_attribute; ?></a>
                    <a href="#tab-duty"><?php echo $tab_duty; ?></a>
                    <a href="#tab-category"><?php echo $tab_category; ?></a>
                    <a href="#tab-products"><?php echo $tab_products; ?></a>
                    <a href="#tab-tools"><?php echo $tab_tools; ?></a>
                    <a href="#tab-support"><?php echo $tab_support; ?></a>
                </div>

                <div id="tab-general">
                    <div id="vtabs1" class="vtabs">
                        <a href="#tab-common" data-toggle="tab"><?php echo $legend_general ?></a>
                        <a href="#tab-children" data-toggle="tab"><?php echo $legend_children ?></a>
                        <a href="#tab-ct" data-toggle="tab"><?php echo $legend_category ?></a>
                        <a href="#tab-inherit" data-toggle="tab"><?php echo $legend_inherit ?></a>
                        <a href="#tab-algorithm" data-toggle="tab"><?php echo $legend_algorithm ?></a>
                    </div>
                    <div id="tab-common" class="vtabs-content">
                        <h2><?php echo $legend_general ?></h2>
                        <table class="form">
                            <tr>
                                <td> <label for="input-attributico_splitter"><?php echo $entry_splitter; ?></label></td>
                                <td> <input type="text" name="attributico_splitter" value="<?php echo $attributico_splitter; ?>" class="form-control"></td>
                            </tr>
                            <tr>
                                <td><label for="input-attributico_sortorder"><span data-toggle="tooltip" title="<?php echo $help_sortorder; ?>"><?php echo $entry_sortorder; ?></span></label>
                                    <br>
                                    <span class="help"> <?php echo $help_sortorder; ?></span>
                                </td>
                                <td>
                                    <label>
                                        <?php if ($attributico_sortorder) { ?>
                                            <input type="checkbox" name="attributico_sortorder" value="1" checked="checked" id="input-attributico_sortorder">
                                        <?php } else { ?>
                                            <input type="checkbox" name="attributico_sortorder" value="1" id="input-attributico_sortorder">
                                        <?php } ?>
                                        &nbsp; </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="input-attributico_smart_scroll"><span data-toggle="tooltip" title="<?php echo $help_smart_scroll; ?>"><?php echo $entry_smart_scroll; ?></span></label>
                                    <br>
                                    <span class="help"> <?php echo $help_smart_scroll; ?></span>
                                </td>
                                <td>
                                    <label>
                                        <?php if ($attributico_smart_scroll) { ?>
                                            <input type="checkbox" name="attributico_smart_scroll" value="1" checked="checked" id="input-attributico_smart_scroll">
                                        <?php } else { ?>
                                            <input type="checkbox" name="attributico_smart_scroll" value="1" id="input-attributico_smart_scroll">
                                        <?php } ?>
                                        &nbsp; </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="input-attributico_empty"><span data-toggle="tooltip" title="<?php echo $help_empty; ?>"><?php echo $entry_empty; ?></span></label>
                                    <br>
                                    <span class="help"> <?php echo $help_empty; ?></span>
                                </td>
                                <td class="checkbox">
                                    <label>
                                        <?php if ($attributico_empty) { ?>
                                            <input type="checkbox" name="attributico_empty" value="1" checked="checked" id="input-attributico_empty" />
                                        <?php } else { ?>
                                            <input type="checkbox" name="attributico_empty" value="1" id="input-attributico_empty" />
                                        <?php } ?>
                                        &nbsp; </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="input-attributico_about_blank"><span data-toggle="tooltip" title="<?php echo $help_about_blank; ?>"><?php echo $entry_about_blank; ?></span></label>
                                    <br>
                                    <span class="help"> <?php echo $help_about_blank; ?></span>
                                </td>
                                <td class="checkbox">
                                    <label>
                                        <?php if ($attributico_about_blank) { ?>
                                            <input type="checkbox" name="attributico_about_blank" value="1" checked="checked" id="input-attributico_about_blank" />
                                        <?php } else { ?>
                                            <input type="checkbox" name="attributico_about_blank" value="1" id="input-attributico_about_blank" />
                                        <?php } ?>
                                        &nbsp; </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="input-attributico_lazyload"><span data-toggle="tooltip" title="<?php echo $help_lazyload; ?>"><?php echo $entry_lazyload; ?></span></label>
                                    <br>
                                    <span class="help"> <?php echo $help_lazyload; ?></span>
                                </td>
                                <td class="checkbox">
                                    <label>
                                        <?php if ($attributico_lazyload) { ?>
                                            <input type="checkbox" name="attributico_lazyload" value="1" checked="checked" id="input-attributico_lazyload" />
                                        <?php } else { ?>
                                            <input type="checkbox" name="attributico_lazyload" value="1" id="input-attributico_lazyload" />
                                        <?php } ?>
                                        &nbsp; </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="input-attributico_cache"><span data-toggle="tooltip" title="<?php echo $help_cache; ?>"><?php echo $entry_cache; ?></span></label>
                                    <br>
                                    <span class="help"> <?php echo $help_cache; ?></span>
                                </td>
                                <td>
                                    <label>
                                        <?php if ($attributico_cache) { ?>
                                            <input type="checkbox" name="attributico_cache" value="1" checked="checked" id="input-attributico_cache">
                                        <?php } else { ?>
                                            <input type="checkbox" name="attributico_cache" value="1" id="input-attributico_cache">
                                        <?php } ?>
                                        &nbsp; </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="input-attributico_multistore"><span data-toggle="tooltip" title="<?php echo $help_multistore; ?>"><?php echo $entry_multistore; ?></span></label>
                                    <br>
                                    <span class="help"> <?php echo $help_multistore; ?></span>
                                </td>
                                <td>
                                    <label>
                                        <?php if ($attributico_multistore) { ?>
                                            <input type="checkbox" name="attributico_multistore" value="1" checked="checked" id="input-attributico_multistore">
                                        <?php } else { ?>
                                            <input type="checkbox" name="attributico_multistore" value="1" id="input-attributico_multistore">
                                        <?php } ?>
                                        &nbsp; </label>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="tab-children" class="vtabs-content">
                        <h2><?php echo $legend_children ?></h2>
                        <table class="form">
                            <tr>
                                <td> <label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_children; ?>"><?php echo $entry_attribute_groups; ?></span></label>
                                    <div id="tree1" class="settings"></div>
                                </td>
                                <td> <label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_children; ?>"><?php echo $tab_duty; ?></span></label>
                                    <div id="tree2" class="settings"></div>
                                </td>
                            </tr>
                            <tr>
                                <td><label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_children; ?>"><?php echo $entry_attributes; ?></span></label>
                                    <div id="tree3" class="settings"></div>
                                </td>
                                <td> <label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_children; ?>"><?php echo $entry_attribute_category; ?></span></label>
                                    <div id="tree4" class="settings"></div>
                                </td>
                            </tr>
                            <tr>
                                <td><label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_children; ?>"><?php echo $entry_products; ?></span></label>
                                    <div id="tree5" class="settings"></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="tab-ct" class="vtabs-content">
                        <h2><?php echo $legend_category ?></h2>
                        <table class="form">
                            <tr>
                                <td><label for="input-attributico_autoadd"><span data-toggle="tooltip" title="<?php echo $help_autoattribute; ?>"><?php echo $entry_autoattribute; ?></span></label>
                                    <br>
                                    <span class="help"> <?php echo $help_autoattribute; ?></span>
                                </td>
                                <td>
                                    <label>
                                        <?php if ($attributico_autoadd) { ?>
                                            <input type="checkbox" name="attributico_autoadd" value="1" checked="checked" id="input-attributico_autoadd">
                                        <?php } else { ?>
                                            <input type="checkbox" name="attributico_autoadd" value="1" id="input-attributico_autoadd">
                                        <?php } ?>
                                        &nbsp; </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label for="input-attributico_autodel"><span data-toggle="tooltip" title="<?php echo $help_autodel; ?>"><?php echo $entry_autodel; ?></span></label>
                                    <br>
                                    <span class="help"> <?php echo $help_autodel; ?></span>
                                </td>
                                <td>
                                    <label>
                                        <?php if ($attributico_autodel) { ?>
                                            <input type="checkbox" name="attributico_autodel" value="1" checked="checked" id="input-attributico_autodel">
                                        <?php } else { ?>
                                            <input type="checkbox" name="attributico_autodel" value="1" id="input-attributico_autodel">
                                        <?php } ?>
                                        &nbsp; </label>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="tab-inherit" class="vtabs-content">
                        <h2><?php echo $legend_inherit ?></h2>
                        <table class="form">
                            <tr>
                                <td><label for="input-attributico_autoadd_subcategory"><span data-toggle="tooltip" title="<?php echo $help_autoadd_inherit; ?>"><?php echo $entry_autoadd_inherit; ?></span></label>
                                    <br>
                                    <span class="help"> <?php echo $help_autoadd_inherit; ?></span>
                                </td>
                                <td>
                                    <label>
                                        <?php if ($attributico_autoadd_subcategory) { ?>
                                            <input type="checkbox" name="attributico_autoadd_subcategory" value="1" checked="checked" id="input-attributico_autoadd_subcategory">
                                        <?php } else { ?>
                                            <input type="checkbox" name="attributico_autoadd_subcategory" value="1" id="input-attributico_autoadd_subcategory">
                                        <?php } ?>
                                        &nbsp; </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label for="input-attributico_autodel_subcategory"><span data-toggle="tooltip" title="<?php echo $help_autodel_inherit; ?>"><?php echo $entry_autodel_inherit; ?></span></label>
                                    <br>
                                    <span class="help"> <?php echo $help_autodel_inherit; ?></span>
                                </td>
                                <td>
                                    <label>
                                        <?php if ($attributico_autodel_subcategory) { ?>
                                            <input type="checkbox" name="attributico_autodel_subcategory" value="1" checked="checked" id="input-attributico_autodel_subcategory">
                                        <?php } else { ?>
                                            <input type="checkbox" name="attributico_autodel_subcategory" value="1" id="input-attributico_autodel_subcategory">
                                        <?php } ?>
                                        &nbsp; </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label for="input-attributico_multiselect"><span data-toggle="tooltip" title="<?php echo $help_multiselect; ?>"><?php echo $entry_multiselect; ?></span></label>
                                    <br>
                                    <span class="help"> <?php echo $help_multiselect; ?></span>
                                </td>
                                <td>
                                    <label>
                                        <?php if ($attributico_multiselect) { ?>
                                            <input type="checkbox" name="attributico_multiselect" value="1" checked="checked" id="input-attributico_multiselect">
                                        <?php } else { ?>
                                            <input type="checkbox" name="attributico_multiselect" value="1" id="input-attributico_multiselect">
                                        <?php } ?>
                                        &nbsp; </label>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="tab-algorithm" class="vtabs-content">
                        <h2><?php echo $legend_algorithm ?></h2>
                        <table class="form">
                            <tr>
                                <td><label class="col-sm-2 control-label"><span data-toggle="tooltip" title="<?php echo $help_product_text; ?>"><?php echo $entry_product_text; ?></span></label>
                                    <br>
                                    <span class="help"> <?php echo $help_product_text; ?></span>
                                </td>
                                <td>
                                <div class="radio">
                                                        <label>
                                                            <?php if ($attributico_product_text == '1') { ?>
                                                                <input type="radio" name="attributico_product_text" value="1" checked="checked" />
                                                                <?php echo $text_clear; ?>
                                                            <?php } else { ?>
                                                                <input type="radio" name="attributico_product_text" value="1" />
                                                                <?php echo $text_clear; ?>
                                                            <?php } ?>
                                                        </label>
                                                    </div>
                                                    <div class="radio">
                                                        <label>
                                                            <?php if ($attributico_product_text == '2') { ?>
                                                                <input type="radio" name="attributico_product_text" value="2" checked="checked" />
                                                                <?php echo $text_keep; ?>
                                                            <?php } else { ?>
                                                                <input type="radio" name="attributico_product_text" value="2" />
                                                                <?php echo $text_keep; ?>
                                                            <?php } ?>
                                                        </label>
                                                    </div>
                                                    <div class="radio">
                                                        <label>
                                                            <?php if ($attributico_product_text == '3') { ?>
                                                                <input type="radio" name="attributico_product_text" value="3" checked="checked" />
                                                                <?php echo $text_duty; ?>
                                                            <?php } else { ?>
                                                                <input type="radio" name="attributico_product_text" value="3" />
                                                                <?php echo $text_duty; ?>
                                                            <?php } ?>
                                                        </label>
                                                    </div>
                                                    <div class="radio">
                                                        <label>
                                                            <?php if ($attributico_product_text == '4') { ?>
                                                                <input type="radio" name="attributico_product_text" value="4" checked="checked" />
                                                                <?php echo $text_duty_only; ?>
                                                            <?php } else { ?>
                                                                <input type="radio" name="attributico_product_text" value="4" />
                                                                <?php echo $text_duty_only; ?>
                                                            <?php } ?>
                                                        </label>
                                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="tab-attribute">
                    <div class="htabs" id="tab-attribute_language">
                        <?php foreach ($languages as $language) { ?>
                            <a href="#tab-attribute_language<?php echo $language['language_id']; ?>"><img src="<?php echo $language['src']; ?>" title="<?php echo $language['name']; ?>" /> <?php echo $language['name']; ?></a>
                        <?php } ?>
                    </div>
                    <?php foreach ($languages as $language) { ?>
                        <div id="tab-attribute_language<?php echo $language['language_id']; ?>">
                            <div class="fancyfilter" id="tab-attribute_filter<?php echo $language['language_id']; ?>"></div>
                            <div class="form-group">
                                <ul id="attribute_group_tree<?php echo $language['language_id']; ?>" name="attribute_group_tree<?php echo $language['language_id']; ?>" class="filetree"></ul>
                            </div>
                            <div class="dialog-options" id="options_attribute_group_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>

                        </div>
                    <?php } ?>
                </div>
                <div id="tab-duty">
                    <?php if ($duty_check) { ?>
                        <div class="htabs" id="tab-duty_language">
                            <?php foreach ($languages as $language) { ?>
                                <a href="#tab-duty_language<?php echo $language['language_id']; ?>"><img src="<?php echo $language['src']; ?>" title="<?php echo $language['name']; ?>" /> <?php echo $language['name']; ?></a>
                            <?php } ?>
                        </div>
                        <?php foreach ($languages as $language) { ?>
                            <div id="tab-duty_language<?php echo $language['language_id']; ?>">
                                <div class="fancyfilter" id="tab-duty_filter<?php echo $language['language_id']; ?>"></div>
                                <div class="form-group">
                                    <ul id="duty_attribute_tree<?php echo $language['language_id']; ?>" name="duty_attribute_tree<?php echo $language['language_id']; ?>" class="filetree"></ul>
                                </div>
                                <div class="dialog-options" id="options_duty_attribute_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>

                            </div>
                        <?php } ?>
                    <?php } else { ?>
                        <div class="jumbotron">
                            <h1><?php echo $text_attention; ?></h1>
                            <h2><?php echo $help_upgrade; ?></h2>
                            <p><a class="button" OnClick="dutyUpgrade();"><?php echo $entry_upgrade; ?></a></p>
                        </div>
                    <?php } ?>
                </div>
                <div id="tab-category">
                    <div class="htabs" id="tab-category_language">
                        <?php foreach ($languages as $language) { ?>
                            <a href="#tab-category_language<?php echo $language['language_id']; ?>"><img src="<?php echo $language['src']; ?>" title="<?php echo $language['name']; ?>" /> <?php echo $language['name']; ?></a>
                        <?php } ?>
                    </div>
                    <?php foreach ($languages as $language) { ?>
                        <div id="tab-category_language<?php echo $language['language_id']; ?>">
                            <div class="fancyfilter" id="tab-category_filter<?php echo $language['language_id']; ?>"></div>
                            <table class="form table">
                                <thead>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="left" style="width: 50%;">
                                            <div id="category_tree<?php echo $language['language_id']; ?>" name="category_tree<?php echo $language['language_id']; ?>" class="filetree"></div>
                                            <div class="dialog-options" id="options_category_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>

                                        </td>
                                        <td class="left">
                                            <div id="category_attribute_tree<?php echo $language['language_id']; ?>" name="category_attribute_tree<?php echo $language['language_id']; ?>" class="filetree"></div>
                                            <div class="dialog-options" id="options_category_attribute_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="form table">
                                <thead>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="left" style="width: 50%;">
                                            <div id="attribute_tree<?php echo $language['language_id']; ?>" name="attribute_tree<?php echo $language['language_id']; ?>" class="filetree"></div>
                                            <div class="dialog-options" id="options_attribute_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    <?php } ?>
                </div>
                <div id="tab-products">
                    <div class="htabs" id="tab-products_language">
                        <?php foreach ($languages as $language) { ?>
                            <a href="#tab-products_language<?php echo $language['language_id']; ?>"><img src="<?php echo $language['src']; ?>" title="<?php echo $language['name']; ?>" /> <?php echo $language['name']; ?></a>
                        <?php } ?>
                    </div>
                    <?php foreach ($languages as $language) { ?>
                        <div id="tab-products_language<?php echo $language['language_id']; ?>">
                            <div class="fancyfilter" id="tab-products_filter<?php echo $language['language_id']; ?>"></div>
                            <table class="form table">
                                <thead>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="left" style="width: 50%;">
                                            <div id="attribute_product_tree<?php echo $language['language_id']; ?>" name="attribute_product_tree<?php echo $language['language_id']; ?>" class="filetree"></div>
                                            <div class="dialog-options" id="options_attribute_product_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>

                                        </td>
                                        <td class="left">
                                            <div id="product_tree<?php echo $language['language_id']; ?>" name="product_tree<?php echo $language['language_id']; ?>" class="filetree"></div>
                                            <div class="dialog-options" id="options_product_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    <?php } ?>
                </div>
                <div id="column-2">
                    <div id="tab-tools">
                        <div id="vtabs2" class="vtabs">
                            <a href="#tab-empty" data-toggle="pill" rel="1"> <?php echo $tab_empty; ?> </a>
                            <a href="#tab-scavengery" data-toggle="pill" rel="1"> <?php echo $tab_scavengery; ?> </a>
                            <a href="#tab-defrag" data-toggle="pill"> <?php echo $tab_defrag; ?> </a>
                            <a href="#tab-detached" data-toggle="pill"> <?php echo $tab_detached; ?> </a>
                            <a href="#tab-deduplicate" data-toggle="pill"> <?php echo $tab_deduplicate; ?> </a>
                            <a href="#tab-category-attributes" data-toggle="pill"> <?php echo $tab_category_attributes; ?> </a>
                            <a href="#tab-cache" data-toggle="pill"> <?php echo $tab_cache; ?> </a>
                            <a href="#tab-standart" data-toggle="pill"> <?php echo $tab_standart; ?> </a>
                        </div>
                        <div id="tab-empty" class="vtabs-content">
                            <div class="alert alert-danger warning" role="alert"> <?php echo $alert_backup; ?> </div>
                            <table class="list">
                                <thead>
                                    <tr>
                                        <td class="center"><?php echo $head_settings; ?></td>
                                        <td class="right"><?php echo $head_command; ?></td>
                                        <td class="right"><?php echo $head_status; ?></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="center"> <?php echo $help_nosettings; ?> </td>
                                        <td class="right"><a onclick="return tools('empty')" class="button"><?php echo $button_play; ?></a></td>
                                        <td class="right">
                                            <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                            <div class="task-complete"><img class="complete-img right" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="tab-scavengery" class="vtabs-content">
                            <div class="alert alert-danger warning" role="alert"> <?php echo $alert_backup; ?> </div>
                            <table class="list table">
                                <thead>
                                    <tr>
                                        <td class="center"><?php echo $head_settings; ?></td>
                                        <td class="right"><?php echo $head_command; ?></td>
                                        <td class="right"><?php echo $head_status; ?></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="center"> <?php echo $help_nosettings; ?> </td>
                                        <td class="right"><a onclick="return tools('scavengery')" class="button"><?php echo $button_play; ?></a></td>
                                        <td class="right">
                                            <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                            <div class="task-complete"><img class="complete-img right" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="vtabs-content" id="tab-defrag">
                            <div class="alert alert-danger warning" role="alert"> <?php echo $alert_backup; ?> </div>
                            <table class="list table">
                                <thead>
                                    <tr>
                                        <td class="center"><label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_defrag_options; ?>"><?php echo $head_settings; ?></span></label></td>
                                        <td class="right"><?php echo $head_command; ?></td>
                                        <td class="right"><?php echo $head_status; ?></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="options">
                                                <label class="checkbox-inline" for="tab-defrag-group">
                                                    <input type="checkbox" name="tab-defrag-group" id="tab-defrag-group" checked="checked"> <?php echo $entry_attribute_groups; ?>
                                                </label>
                                                <label class="checkbox-inline" for="tab-defrag-attribute">
                                                    <input type="checkbox" name="tab-defrag-attribute" id="tab-defrag-attribute" checked="checked"> <?php echo $entry_attributes; ?>
                                                </label>
                                            </div>
                                        </td>
                                        <td class="right"><a onclick="return tools('defrag')" class="button"><?php echo $button_play; ?></a></td>
                                        <td class="right">
                                            <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                            <div class="task-complete"><img class="complete-img right" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="vtabs-content" id="tab-detached">
                            <div class="alert alert-danger warning" role="alert"> <?php echo $alert_backup; ?> </div>
                            <table class="list table">
                                <thead>
                                    <tr>
                                        <td class="center"><label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_group_options; ?>"><?php echo $head_settings; ?></span></label></td>
                                        <td class="right"><?php echo $head_command; ?></td>
                                        <td class="right"><?php echo $head_status; ?></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div id="group_check_tree1" name="group_check_tree1" class="options"></div>
                                        </td>
                                        <td class="right"><a onclick="return tools('detached')" class="button"><?php echo $button_play; ?></a></td>
                                        <td class="right">
                                            <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                            <div class="task-complete"><img class="complete-img right" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="vtabs-content" id="tab-deduplicate">
                            <div class="alert alert-danger warning" role="alert"> <?php echo $alert_backup; ?> </div>
                            <table class="list table">
                                <thead>
                                    <tr>
                                        <td class="center"><label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_group_options; ?>"><?php echo $head_settings; ?></span></label></td>
                                        <td class="right"><?php echo $head_command; ?></td>
                                        <td class="right"><?php echo $head_status; ?></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div id="group_check_tree2" name="group_check_tree2" class="options"></div>
                                        </td>
                                        <td class="right"><a onclick="return tools('deduplicate')" class="button"><?php echo $button_play; ?></a></td>
                                        <td class="right">
                                            <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                            <div class="task-complete"><img class="complete-img right" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="vtabs-content" id="tab-category-attributes">
                            <div class="alert alert-danger warning" role="alert"> <?php echo $alert_backup; ?> </div>
                            <table class="list table">
                                <thead>
                                    <tr>
                                        <td class="center"><label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_categories_options; ?>"><?php echo $head_settings; ?></span></label></td>
                                        <td class="right"><?php echo $head_command; ?></td>
                                        <td class="right"><?php echo $head_status; ?></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="options">
                                                <label class="checkbox-inline" for="tab-create-categories">
                                                    <input type="checkbox" name="tab-create-categories" id="tab-create-categories" checked="checked"> <?php echo $entry_create_categories; ?>
                                                </label>
                                                <label class="checkbox-inline" for="tab-inject-to-products">
                                                    <input type="checkbox" name="tab-inject-to-products" id="tab-inject-to-products" checked="checked"> <?php echo $entry_inject_to_products; ?>
                                                </label>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="category_check_tree1" name="category_check_tree1" class="options"></div>
                                        </td>
                                        <td class="right"><a onclick="return tools('createcategory')" class="button"><?php echo $button_play; ?></a></td>
                                        <td class="right">
                                            <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                            <div class="task-complete"><img class="complete-img right" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="tab-cache" class="vtabs-content">
                            <div class="alert alert-danger warning" role="alert"> <?php echo $alert_backup; ?> </div>
                            <table class="list table">
                                <thead>
                                    <tr>
                                        <td class="center"><?php echo $head_settings; ?></td>
                                        <td class="right"><?php echo $head_command; ?></td>
                                        <td class="right"><?php echo $head_status; ?></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="center"> <?php echo $help_nosettings; ?> </td>
                                        <td class="right"><a onclick="return tools('cache')" class="button"><?php echo $button_play; ?></a></td>
                                        <td class="right">
                                            <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                            <div class="task-complete"><img class="complete-img right" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="vtabs-content" id="tab-standart">
                            <div class="alert alert-danger warning" role="alert"> <?php echo $alert_backup; ?> </div>
                            <table class="list table">
                                <thead>
                                    <tr>
                                        <td class="center"><label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_categories_options; ?>"><?php echo $head_settings; ?></span></label></td>
                                        <td class="right"><?php echo $head_command; ?></td>
                                        <td class="right"><?php echo $head_status; ?></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="options">
                                                <div>
                                                    <label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_clone_options; ?>"><?php echo $head_clone; ?></span></label>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-sm-6">
                                                        <label class="checkbox-inline" for="clone-language-group">
                                                            <input type="checkbox" name="clone-language-group" id="clone-language-group" value="group" checked="checked">
                                                            <?php echo $entry_attribute_groups; ?>
                                                        </label>
                                                        <label class="checkbox-inline" for="clone-language-attribute">
                                                            <input type="checkbox" name="clone-language-attribute" id="clone-language-attribute" value="attribute" checked="checked">
                                                            <?php echo $entry_attributes; ?>
                                                        </label>
                                                        <label class="checkbox-inline" for="clone-language-value">
                                                            <input type="checkbox" name="clone-language-value" id="clone-language-value" value="value" checked="checked">
                                                            <?php echo $entry_product_text; ?>
                                                        </label>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <label class="radio-inline">
                                                            <input type="radio" name="clone-language-method" value="0" checked="checked" />
                                                            <?php echo $text_insert; ?>
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="clone-language-method" value="1" />
                                                            <?php echo $text_rewrite; ?>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-sm-6">
                                                        <label class="control-label" for="clone-language-source"><?php echo $entry_from; ?></label>
                                                        <select name="clone-language-source" id="clone-language-source" class="form-control">
                                                            <?php foreach ($languages as $language) { ?>
                                                                <?php if ($language['language_id'] == $config_language) { ?>
                                                                    <option value="<?php echo $language['language_id']; ?>" selected="selected"><?php echo $language['name']; ?></option>
                                                                <?php } else { ?>
                                                                    <option value="<?php echo $language['language_id']; ?>"><?php echo $language['name']; ?></option>
                                                                <?php } ?>
                                                            <?php } ?>
                                                        </select>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <label class="control-label" for="clone-language-target"><?php echo $entry_to; ?></label>
                                                        <select name="clone-language-target" id="clone-language-target" class="form-control">
                                                            <?php foreach ($languages as $language) { ?>
                                                                <?php if ($language['language_id'] == $config_language) { ?>
                                                                    <option value="<?php echo $language['language_id']; ?>" selected="selected"><?php echo $language['name']; ?></option>
                                                                <?php } else { ?>
                                                                    <option value="<?php echo $language['language_id']; ?>"><?php echo $language['name']; ?></option>
                                                                <?php } ?>
                                                            <?php } ?>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><button type="button" onclick=" return tools('clone')" data-toggle="tooltip" title="<?php echo $button_play; ?>" class="btn btn-warning"><i class="fa fa-play"></i></button></td>
                                        <td>
                                            <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                            <div class="task-complete"><img class="complete-img" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="alert alert-info attention" role="alert"> <?php echo $alert_info; ?> </div>
                        </div>
                        <div class="bottom-alert">
                            <div class="alert alert-warning warning" role="alert" style="display: none"> <?php echo $alert_warning; ?> </div>
                            <div class="alert alert-success success" role="alert" style="display: none"> <?php echo $alert_success; ?> </div>
                        </div>
                    </div>
                </div>
                <div id="tab-support">
                    <div class="list">
                        <?php echo $text_help1; ?>
                    </div>
                    <div class="list">
                        <?php echo $text_help2; ?>
                    </div>
                    <div class="form-group">
                        <?php echo $text_support; ?>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</div>
<script type="text/javascript">
let selNodes = null;
    let selCategories = null;
    let currentCategory = 0;
    const ATTRIBUTE_SYNCRO_TREES = $('[name ^= "attribute_group_tree"], [name ^= "attribute_tree"], [name ^= "duty_attribute_tree"], [name ^= "attribute_product_tree"], [name ^= "group_check_tree"]');
    const ATTRIBUTE_GROUP_TREE = $('[name ^= "attribute_group_tree"]');
    const CATEGORY_TREE = $('[name ^= "category_tree"]');
    const CATEGORY_ATTRIBUTE_TREE = $('[name ^= "category_attribute_tree"]');
    const DUTY_ATTRIBUTE_TREE = $('[name ^= "duty_attribute_tree"]');
    const ATTRIBUTE_TREE = $('[name ^= "attribute_tree"]');
    const ATTRIBUTE_PRODUCT_TREE = $('[name ^= "attribute_product_tree"]');
    const PRODUCT_TREE = $('[name ^= "product_tree"]');
    const GROUP_CHECK_TREE = $('[name ^= "group_check_tree"]');
    const CATEGORY_CHECK_TREE = $('[name ^= "category_check_tree"]');
    const CATEGORY_SYNCRO_TREES = $('[name ^= "category_check_tree"], [name ^= "category_tree"]');
    const token = '<?php echo $token; ?>';
    const user_token = '<?php echo $user_token; ?>';
    const extension = '<?php echo $extension; ?>'; // для v2.3 другая структура каталогов
    const edit = '<?php echo $edit; ?>'; // для v1.5 другая функция входа в товар
    const textNewAttribute = <?php echo json_encode($text_New_attribute) ?>;
    const textNewGroup = <?php echo json_encode($text_New_group) ?>;
    const textConfirm = <?php echo json_encode($text_confirm) ?>;
    const FILTERSETTINGS = <?php echo json_encode($filter_settings) ?>;
    let filterItems = [];
    let contextmenuConfig = [];
    let dialogItems = [];
    const smartScroll = $('input[name = "attributico_smart_scroll"]:checkbox');
    let clipboardNodes = [];
    let clipboardTitles = [];
    let pasteMode = null;

    ATTRIBUTE_GROUP_TREE.each(function(indx, element) {
        let lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        contextmenuConfig[lng_id] = [{
                title: <?php echo json_encode($text_Edit) ?>[lng_id] + "<kbd>[Shift+Click]</kbd>",
                cmd: "rename",
                uiIcon: "ui-icon-pencil"
            },
            {
                title: <?php echo json_encode($text_Delete) ?>[lng_id] + "<kbd>[Del]</kbd>",
                cmd: "remove",
                uiIcon: "ui-icon-trash"
            },
            {
                title: <?php echo json_encode($text_Copy) ?>[lng_id] + "<kbd>Ctrl+C</kbd>",
                cmd: "copy",
                uiIcon: "ui-icon-copy",
                disabled: true
            },
            {
                title: <?php echo json_encode($text_Paste) ?>[lng_id] + "<kbd>Ctrl+V</kbd>",
                cmd: "paste",
                uiIcon: "ui-icon-clipboard",
                disabled: true
            },
            {
                title: "----"
            },
            {
                title: <?php echo json_encode($text_Expande) ?>[lng_id] + "<kbd>Ctrl+B</kbd>",
                cmd: "expande",
                uiIcon: "ui-icon-folder-open"
            },
            {
                title: <?php echo json_encode($text_Collapse) ?>[lng_id] + "<kbd>Ctrl+B</kbd>",
                cmd: "collapse",
                uiIcon: "ui-icon-folder-collapsed"
            },
            {
                title: <?php echo json_encode($text_Options) ?>[lng_id],
                cmd: "options",
                uiIcon: "ui-icon-gear"
            },
            {
                title: "----"
            },
            {
                title: <?php echo json_encode($text_New_group) ?>[lng_id] + "<kbd>[Ctrl+M]</kbd>",
                cmd: "addSibling",
                uiIcon: "ui-icon-plus"
            },
            {
                title: <?php echo json_encode($text_New_attribute) ?>[lng_id] + "<kbd>[Ctrl+Q]</kbd>",
                cmd: "addChild",
                uiIcon: "ui-icon-arrowreturn-1-e"
            }
        ];

        filterItems[lng_id] = {
            title: <?php echo json_encode($text_filter) ?>[lng_id],
            button: <?php echo json_encode($button_filter_action) ?>[lng_id],
            checkbox: {
                autoComplete: <?php echo json_encode($text_autoComplete) ?>[lng_id],
                attributesOnly: <?php echo json_encode($text_Attributes_only) ?>[lng_id],
                leavesOnly: <?php echo json_encode($text_Leaves_only) ?>[lng_id],
            },
            spancheckbox: {
                hideMode: <?php echo json_encode($text_Hide_unmatched_nodes) ?>[lng_id],
                autoExpand: <?php echo json_encode($text_Auto_expand) ?>[lng_id],
                counter: <?php echo json_encode($text_Counter_badges) ?>[lng_id],
                hideExpandedCounter: <?php echo json_encode($text_hideExpandedCounter) ?>[lng_id],
                highlight: <?php echo json_encode($text_Highlight) ?>[lng_id],
                fuzzy: <?php echo json_encode($text_Fuzzy) ?>[lng_id],
                regex: <?php echo json_encode($text_Regular_expression) ?>[lng_id],
            },
            dropdown: {
                empty: <?php echo json_encode($f_empty) ?>[lng_id],
                digital: <?php echo json_encode($f_digital) ?>[lng_id],
                html: <?php echo json_encode($f_html) ?>[lng_id],
                default: <?php echo json_encode($f_default) ?>[lng_id],
            }
        };

        dialogItems[lng_id] = {
            sortorder: {
                label: <?php echo json_encode($text_sortOrder) ?>[lng_id],
                selector: 'sortOrder',
                state: '<?php echo $attributico_sortorder; ?>'
            },
            lazyload: {
                label: <?php echo json_encode($text_lazyLoad) ?>[lng_id],
                selector: 'lazyLoad',
                state: '<?php echo $attributico_lazyload; ?>'
            },
            autocollapse: {
                label: <?php echo json_encode($text_autoCollapse) ?>[lng_id],
                selector: 'autoCollapse',
                state: '1'
            },
            hierarchy: {
                label: <?php echo json_encode($text_multiSelect) ?>[lng_id],
                selector: 'multiSelect',
                state: '<?php echo $attributico_multiselect; ?>'
            },
            divergency: {
                label: <?php echo json_encode($text_Diver) ?>[lng_id],
                selector: 'diver',
                state: '0'
            }
        };
    });

        $('a[data-toggle="pill"]').on('click', function(e) {
            $("#column-2 .alert-success").hide();
            $("#column-2 .alert-info").show();
        });
</script>
<script type="text/javascript">
    $('#tabs a').tabs();
    $('#tab-attribute_language a').tabs();
    $('#tab-category_language a').tabs();
    $('#tab-duty_language a').tabs();
    $('#tab-products_language a').tabs();
    $('.vtabs a').tabs();
</script>
<script type="text/javascript">
    $('#tabs a:eq(1)').click();
    $('#tab-attribute_language a:first').click();
    $('#tab-category_language a:first').click();
    $('#tab-duty_language a:first').click();
    $('#tab-products_language a:first').click();
</script>
<?php echo $footer; ?>