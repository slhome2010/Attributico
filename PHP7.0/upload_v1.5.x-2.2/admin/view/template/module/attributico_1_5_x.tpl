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
                    <a href="#tab-general"><?php echo $tab_general;?></a>
                    <a href="#tab-attribute"><?php echo $tab_attribute;?></a>
                    <a href="#tab-duty"><?php echo $tab_duty;?></a>
                    <a href="#tab-category"><?php echo $tab_category;?></a>
                    <a href="#tab-products"><?php echo $tab_products;?></a>
                    <a href="#tab-tools"><?php echo $tab_tools;?></a>
                    <a href="#tab-support"><?php echo $tab_support;?></a>
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
                                    <label class="radio-inline">
                                        <?php if ($attributico_product_text == '1') { ?>
                                        <input type="radio" name="attributico_product_text" value="1" checked="checked">
                                        <?php echo $text_renew; ?>
                                        <?php } else { ?>
                                        <input type="radio" name="attributico_product_text" value="1">
                                        <?php echo $text_renew; ?>
                                        <?php } ?>
                                    </label>
                                    <label class="radio-inline">
                                        <?php if ($attributico_product_text == '2') { ?>
                                        <input type="radio" name="attributico_product_text" value="2" checked="checked">
                                        <?php echo $text_keep; ?>
                                        <?php } else { ?>
                                        <input type="radio" name="attributico_product_text" value="2">
                                        <?php echo $text_keep; ?>
                                        <?php } ?>
                                    </label>
                                    <label class="radio-inline">
                                        <?php if ($attributico_product_text == '3') { ?>
                                        <input type="radio" name="attributico_product_text" value="3" checked="checked">
                                        <?php echo $text_duty; ?>
                                        <?php } else { ?>
                                        <input type="radio" name="attributico_product_text" value="3">
                                        <?php echo $text_duty; ?>
                                        <?php } ?>
                                    </label>
                                    <label class="radio-inline">
                                        <?php if ($attributico_product_text == '4') { ?>
                                        <input type="radio" name="attributico_product_text" value="4" checked="checked">
                                        <?php echo $text_duty_only; ?>
                                        <?php } else { ?>
                                        <input type="radio" name="attributico_product_text" value="4">
                                        <?php echo $text_duty_only; ?>
                                        <?php } ?>
                                    </label>
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
                    <div id="tab-attribute_language<?php echo $language['language_id'];?>">
                        <div class="form-group form-inline collapse <?php if (in_array("fs_tab-duty_hideFilter" . $language['language_id'], $filter_settings)) { echo 'in'; } ?>"
                            id="tab-attribute_filter<?php echo $language['language_id']; ?>">
                            <label for="tab-attribute_search"> <?php echo $text_filter[$language['language_id']]; ?> </label>
                            <input type="text" name="tab-attribute_search<?php echo $language['language_id']; ?>" placeholder="Filter..." class="form-control" id="tab-attribute_search">
                            <button id="tab-attribute_btnResetSearch<?php echo $language['language_id']; ?>" type="button" class="button">&times;</button>
                            <button id="tab-attribute_btnSearch<?php echo $language['language_id']; ?>" type="button" class="button">&#9762;</button>
                            <button class="button" onclick="$(this).next().slideToggle(); return false;"><?php echo $button_filter_action[$language['language_id']]; ?></button>
                            <ul class="drop-menu" style="max-width: 250px; position: absolute; margin-left: 260px;">
                                <li><a id="f_tab-attribute_empty" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-attribute');"><?php echo $f_empty[$language['language_id']]; ?></a></li>
                                <li><a id="f_tab-attribute_digital" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-attribute');"><?php echo $f_digital[$language['language_id']]; ?></a></li>
                                <li><a id="f_tab-attribute_html" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-attribute');"><?php echo $f_html[$language['language_id']]; ?></a></li>
                                <li role="separator" class="divider"></li>
                                <li><a id="f_tab-attribute_default" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-attribute');"><?php echo $f_default[$language['language_id']]; ?></a></li>
                            </ul>
                            <span id="tab-attribute_matches<?php echo $language['language_id']; ?>" class="badge" style="margin-left: 5px;"></span>
                            <label class="checkbox-inline" style="padding-top:0px;" for="tab-attribute_autoComplete<?php echo $language['language_id']; ?>">
                                &nbsp;&nbsp;&nbsp;<input type="checkbox" name="fs_tab-attribute_autoComplete<?php echo $language['language_id']; ?>" id="tab-attribute_autoComplete<?php echo $language['language_id']; ?>"
                                    <?php if (in_array("fs_tab-attribute_autoComplete" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_autoComplete[$language['language_id']]; ?>
                            </label>
                            <label class="checkbox-inline" style="padding-top:0px;" for="tab-attribute_attributesOnly<?php echo $language['language_id']; ?>">
                                <input type="checkbox" name="fs_tab-attribute_attributesOnly<?php echo $language['language_id']; ?>" id="tab-attribute_attributesOnly<?php echo $language['language_id']; ?>"
                                    <?php if (in_array("fs_tab-attribute_attributesOnly" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Attributes_only[$language['language_id']]; ?>
                            </label>
                            <label class="checkbox-inline" style="padding-top:0px;" for="tab-attribute_leavesOnly<?php echo $language['language_id']; ?>">
                                <input type="checkbox" name="fs_tab-attribute_leavesOnly<?php echo $language['language_id']; ?>" id="tab-attribute_leavesOnly<?php echo $language['language_id']; ?>"
                                    <?php if (in_array("fs_tab-attribute_leavesOnly" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Leaves_only[$language['language_id']]; ?>
                            </label>
                            <div class="ajax-loader"><img id="loadImg<?php echo $language['language_id']; ?>" src="view/javascript/fancytree/skin-win7/loading.gif" style="z-index:1000; display:none;" /></div>
                            <span id="tab-attribute_searchmode<?php echo $language['language_id']; ?>">
                                <label class="checkbox-inline" for="tab-attribute_hideMode<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-attribute_hideMode<?php echo $language['language_id']; ?>" id="tab-attribute_hideMode<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-attribute_hideMode" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Hide_unmatched_nodes[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-attribute_autoExpand<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-attribute_autoExpand<?php echo $language['language_id']; ?>" id="tab-attribute_autoExpand<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-attribute_autoExpand" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Auto_expand[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-attribute_counter<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-attribute_counter<?php echo $language['language_id']; ?>" id="tab-attribute_counter<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-attribute_counter" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Counter_badges[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-attribute_hideExpandedCounter<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-attribute_hideExpandedCounter<?php echo $language['language_id']; ?>" id="tab-attribute_hideExpandedCounter<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-attribute_hideExpandedCounter" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_hideExpandedCounter[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-attribute_highlight<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-attribute_highlight<?php echo $language['language_id']; ?>" id="tab-attribute_highlight<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-attribute_highlight" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Highlight[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-attribute_fuzzy<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-attribute_fuzzy<?php echo $language['language_id']; ?>" id="tab-attribute_fuzzy<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-attribute_fuzzy" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Fuzzy[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-attribute_regex<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-attribute_regex<?php echo $language['language_id']; ?>" id="tab-attribute_regex<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-attribute_regex" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Regular_expression[$language['language_id']]; ?>
                                </label>
                            </span>
                        </div>
                        <div class="form-group">
                            <ul id="attribute_group_tree<?php echo $language['language_id']; ?>" name="attribute_group_tree<?php echo $language['language_id']; ?>" class="filetree"></ul>
                        </div>
                        <div id="options_attribute_group_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>">
                            <label class="checkbox-inline" for="autoCollapse<?php echo $language['language_id']; ?>">
                                <input type="checkbox" id="autoCollapse_attribute_group_tree<?php echo $language['language_id']; ?>" checked> <b><?php echo $text_autoCollapse[$language['language_id']]; ?></b>
                            </label>
                            <br>
                            <label class="checkbox-inline" for="sortOrder<?php echo $language['language_id']; ?>">
                                <input type="checkbox" id="sortOrder_attribute_group_tree<?php echo $language['language_id']; ?>" <?php echo "checked"; ?>> <b><?php echo $text_sortOrder[$language['language_id']]; ?></b>
                            </label>
                            <br>
                            <label class="checkbox-inline" for="lazyLoad<?php echo $language['language_id']; ?>">
                                <input type="checkbox" id="lazyLoad_attribute_group_tree<?php echo $language['language_id']; ?>" <?php echo ($attributico_lazyload == '1' ? 'checked="checked"' : ''); ?>>
                                <b><?php echo $text_lazyLoad[$language['language_id']]; ?></b>
                            </label>
                        </div>
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
                    <div id="tab-duty_language<?php echo $language['language_id'];?>">
                        <div class="form-group form-inline collapse <?php if (in_array("fs_tab-duty_hideFilter" . $language['language_id'], $filter_settings)) { echo 'in'; } ?>" id="tab-duty_filter<?php echo $language['language_id']; ?>">
                            <label for="tab-duty_search"> <?php echo $text_filter[$language['language_id']]; ?> </label>
                            <input type="text" name="tab-duty_search<?php echo $language['language_id']; ?>" placeholder="Filter..." class="form-control" id="tab-duty_search">
                            <button id="tab-duty_btnResetSearch<?php echo $language['language_id']; ?>" type="button" class="button">&times;</button>
                            <button id="tab-duty_btnSearch<?php echo $language['language_id']; ?>" type="button" class="button">&#9762;</button>
                            <button class="button" onclick="$(this).next().slideToggle(); return false;"><?php echo $button_filter_action[$language['language_id']]; ?></button>
                            <ul class="drop-menu" style="max-width: 250px; position: absolute; margin-left: 260px;">
                                <li><a id="f_tab-duty_empty" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-duty');"><?php echo $f_empty[$language['language_id']]; ?></a></li>
                                <li><a id="f_tab-duty_digital" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-duty');"><?php echo $f_digital[$language['language_id']]; ?></a></li>
                                <li><a id="f_tab-duty_html" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-duty');"><?php echo $f_html[$language['language_id']]; ?></a></li>
                                <li role="separator" class="divider"></li>
                                <li><a id="f_tab-duty_default" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-duty');"><?php echo $f_default[$language['language_id']]; ?></a></li>
                            </ul>
                            <span id="tab-duty_matches<?php echo $language['language_id']; ?>" class="badge" style="margin-left: 5px;"></span>
                            <label class="checkbox-inline" style="padding-top:0px;" for="tab-duty_autoComplete<?php echo $language['language_id']; ?>">
                                &nbsp;&nbsp;&nbsp;<input type="checkbox" name="fs_tab-duty_autoComplete<?php echo $language['language_id']; ?>" id="tab-duty_autoComplete<?php echo $language['language_id']; ?>"
                                    <?php if (in_array("fs_tab-duty_autoComplete" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_autoComplete[$language['language_id']]; ?>
                            </label>
                            <label class="checkbox-inline" style="padding-top:0px;" for="tab-duty_attributesOnly<?php echo $language['language_id']; ?>">
                                <input type="checkbox" name="fs_tab-duty_attributesOnly<?php echo $language['language_id']; ?>" id="tab-duty_attributesOnly<?php echo $language['language_id']; ?>"
                                    <?php if (in_array("fs_tab-duty_attributesOnly" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Attributes_only[$language['language_id']]; ?>
                            </label>
                            <label class="checkbox-inline" style="padding-top:0px;" for="tab-duty_leavesOnly<?php echo $language['language_id']; ?>">
                                <input type="checkbox" name="fs_tab-duty_leavesOnly<?php echo $language['language_id']; ?>" id="tab-duty_leavesOnly<?php echo $language['language_id']; ?>"
                                    <?php if (in_array("fs_tab-duty_leavesOnly" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Leaves_only[$language['language_id']]; ?>
                            </label>
                            <div class="ajax-loader"><img id="loadImg<?php echo $language['language_id']; ?>" src="view/javascript/fancytree/skin-win7/loading.gif" style="z-index:1000; display:none;" /></div>
                            <span id="tab-duty_searchmode<?php echo $language['language_id']; ?>">
                                <label class="checkbox-inline" for="tab-duty_hideMode<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-duty_hideMode<?php echo $language['language_id']; ?>" id="tab-duty_hideMode<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-duty_hideMode" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Hide_unmatched_nodes[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-duty_autoExpand<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-duty_autoExpand<?php echo $language['language_id']; ?>" id="tab-duty_autoExpand<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-duty_autoExpand" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Auto_expand[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-duty_counter<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-duty_counter<?php echo $language['language_id']; ?>" id="tab-duty_counter<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-duty_counter" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Counter_badges[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-duty_hideExpandedCounter<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-duty_hideExpandedCounter<?php echo $language['language_id']; ?>" id="tab-duty_hideExpandedCounter<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-duty_hideExpandedCounter" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_hideExpandedCounter[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-duty_highlight<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-duty_highlight<?php echo $language['language_id']; ?>" id="tab-duty_highlight<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-duty_highlight" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Highlight[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-duty_fuzzy<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-duty_fuzzy<?php echo $language['language_id']; ?>" id="tab-duty_fuzzy<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-duty_fuzzy" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Fuzzy[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-duty_regex<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-duty_regex<?php echo $language['language_id']; ?>" id="tab-duty_regex<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-duty_regex" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Regular_expression[$language['language_id']]; ?>
                                </label>
                            </span>
                        </div>
                        <div class="form-group">
                            <ul id="duty_attribute_tree<?php echo $language['language_id']; ?>" name="duty_attribute_tree<?php echo $language['language_id']; ?>" class="filetree"></ul>
                        </div>
                        <div id="options_duty_attribute_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>">
                            <label class="checkbox-inline" for="autoCollapse<?php echo $language['language_id']; ?>">
                                <input type="checkbox" id="autoCollapse_duty_attribute_tree<?php echo $language['language_id']; ?>" checked> <b><?php echo $text_autoCollapse[$language['language_id']]; ?></b>
                            </label>
                            <br>
                            <label class="checkbox-inline" for="sortOrder<?php echo $language['language_id']; ?>">
                                <input type="checkbox" id="sortOrder_duty_attribute_tree<?php echo $language['language_id']; ?>" <?php echo ($attributico_sortorder == '1' ? 'checked="checked"' : ''); ?>>
                                <b><?php echo $text_sortOrder[$language['language_id']]; ?></b>
                            </label>
                            <br>
                            <label class="checkbox-inline" for="lazyLoad<?php echo $language['language_id']; ?>">
                                <input type="checkbox" id="lazyLoad_duty_attribute_tree<?php echo $language['language_id']; ?>" <?php echo ($attributico_lazyload == '1' ? 'checked="checked"' : ''); ?>>
                                <b><?php echo $text_lazyLoad[$language['language_id']]; ?></b>
                            </label>
                        </div>
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
                    <div id="tab-category_language<?php echo $language['language_id'];?>">
                        <div class="form-group form-inline collapse <?php if (in_array("fs_tab-duty_hideFilter" . $language['language_id'], $filter_settings)) { echo 'in'; } ?>"
                            id="tab-category_filter<?php echo $language['language_id']; ?>">
                            <label for="tab-category_search"> <?php echo $text_filter[$language['language_id']]; ?> </label>
                            <input type="text" name="tab-category_search<?php echo $language['language_id']; ?>" placeholder="Filter..." class="form-control" id="tab-category_search">
                            <button id="tab-category_btnResetSearch<?php echo $language['language_id']; ?>" type="button" class="button">&times;</button>
                            <button id="tab-category_btnSearch<?php echo $language['language_id']; ?>" type="button" class="button">&#9762;</button>
                            <button class="button" onclick="$(this).next().slideToggle(); return false;"><?php echo $button_filter_action[$language['language_id']]; ?></button>
                            <ul class="drop-menu" style="max-width: 250px; position: absolute; margin-left: 260px;">
                                <li><a id="f_tab-category_empty" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-category');"><?php echo $f_empty[$language['language_id']]; ?></a></li>
                                <li><a id="f_tab-category_digital" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-category');"><?php echo $f_digital[$language['language_id']]; ?></a></li>
                                <li><a id="f_tab-category_html" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-category');"><?php echo $f_html[$language['language_id']]; ?></a></li>
                                <li role="separator" class="divider"></li>
                                <li><a id="f_tab-category_default" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-category');"><?php echo $f_default[$language['language_id']]; ?></a></li>
                            </ul>
                            <span id="tab-category_matches<?php echo $language['language_id']; ?>" class="badge" style="margin-left: 5px;"></span>
                            <label class="checkbox-inline" style="padding-top:0px;" for="tab-category_autoComplete<?php echo $language['language_id']; ?>">
                                &nbsp;&nbsp;&nbsp;<input type="checkbox" name="fs_tab-category_autoComplete<?php echo $language['language_id']; ?>" id="tab-category_autoComplete<?php echo $language['language_id']; ?>"
                                    <?php if (in_array("fs_tab-category_autoComplete" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_autoComplete[$language['language_id']]; ?>
                            </label>
                            <label class="checkbox-inline" style="padding-top:0px;" for="tab-category_attributesOnly<?php echo $language['language_id']; ?>">
                                <input type="checkbox" name="fs_tab-category_attributesOnly<?php echo $language['language_id']; ?>" id="tab-category_attributesOnly<?php echo $language['language_id']; ?>"
                                    <?php if (in_array("fs_tab-category_attributesOnly" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Attributes_only[$language['language_id']]; ?>
                            </label>
                            <label class="checkbox-inline" style="padding-top:0px;" for="tab-category_leavesOnly<?php echo $language['language_id']; ?>">
                                <input type="checkbox" name="fs_tab-category_leavesOnly<?php echo $language['language_id']; ?>" id="tab-category_leavesOnly<?php echo $language['language_id']; ?>"
                                    <?php if (in_array("fs_tab-category_leavesOnly" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Leaves_only[$language['language_id']]; ?>
                            </label>
                            <div class="ajax-loader"><img id="loadImg<?php echo $language['language_id']; ?>" src="view/javascript/fancytree/skin-win7/loading.gif" style="z-index:1000; display:none;" /></div>
                            <span id="tab-category_searchmode<?php echo $language['language_id']; ?>">
                                <label class="checkbox-inline" for="tab-category_hideMode<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-category_hideMode<?php echo $language['language_id']; ?>" id="tab-category_hideMode<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-category_hideMode" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Hide_unmatched_nodes[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-category_autoExpand<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-category_autoExpand<?php echo $language['language_id']; ?>" id="tab-category_autoExpand<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-category_autoExpand" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Auto_expand[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-category_counter<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-category_counter<?php echo $language['language_id']; ?>" id="tab-category_counter<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-category_counter" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Counter_badges[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-category_hideExpandedCounter<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-category_hideExpandedCounter<?php echo $language['language_id']; ?>" id="tab-category_hideExpandedCounter<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-category_hideExpandedCounter" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_hideExpandedCounter[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-category_highlight<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-category_highlight<?php echo $language['language_id']; ?>" id="tab-category_highlight<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-category_highlight" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Highlight[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-category_fuzzy<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-category_fuzzy<?php echo $language['language_id']; ?>" id="tab-category_fuzzy<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-category_fuzzy" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Fuzzy[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-category_regex<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-category_regex<?php echo $language['language_id']; ?>" id="tab-category_regex<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-category_regex" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Regular_expression[$language['language_id']]; ?>
                                </label>
                            </span>
                        </div>
                        <table class="form table">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="left" style="width: 50%;">
                                        <div id="category_tree<?php echo $language['language_id']; ?>" name="category_tree<?php echo $language['language_id']; ?>" class="filetree"></div>
                                        <div id="options_category_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>">
                                            <label class="checkbox-inline" for="autoCollapse<?php echo $language['language_id']; ?>">
                                                <input type="checkbox" id="autoCollapse_category_tree<?php echo $language['language_id']; ?>" checked> <b><?php echo $text_autoCollapse[$language['language_id']]; ?></b>
                                            </label>
                                            <br>
                                            <label class="checkbox-inline" for="sortOrder<?php echo $language['language_id']; ?>">
                                                <input type="checkbox" id="sortOrder_category_tree<?php echo $language['language_id']; ?>" <?php echo ($attributico_sortorder == '1' ? 'checked="checked"' : ''); ?>>
                                                <b><?php echo $text_sortOrder[$language['language_id']]; ?></b>
                                            </label>
                                            <br>
                                            <label class="checkbox-inline" for="multiSelect<?php echo $language['language_id']; ?>">
                                                <input type="checkbox" id="multiSelect_category_tree<?php echo $language['language_id']; ?>" <?php echo ($attributico_multiselect == '1' ? 'checked="checked"' : ''); ?>>
                                                <b><?php echo $text_multiSelect[$language['language_id']]; ?></b>
                                            </label>
                                        </div>
                                    </td>
                                    <td class="left">
                                        <div id="category_attribute_tree<?php echo $language['language_id']; ?>" name="category_attribute_tree<?php echo $language['language_id']; ?>" class="filetree"></div>
                                        <div id="options_category_attribute_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>">
                                            <label class="checkbox-inline" for="autoCollapse<?php echo $language['language_id']; ?>">
                                                <input type="checkbox" id="autoCollapse_category_attribute_tree<?php echo $language['language_id']; ?>" checked> <b><?php echo $text_autoCollapse[$language['language_id']]; ?></b>
                                            </label>
                                            <br>
                                            <label class="checkbox-inline" for="sortOrder<?php echo $language['language_id']; ?>">
                                                <input type="checkbox" id="sortOrder_category_attribute_tree<?php echo $language['language_id']; ?>" checked> <b><?php echo $text_sortOrder[$language['language_id']]; ?></b>
                                            </label>
                                        </div>
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
                                        <div id="options_attribute_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>">
                                            <label class="checkbox-inline" for="autoCollapse<?php echo $language['language_id']; ?>">
                                                <input type="checkbox" id="autoCollapse_attribute_tree<?php echo $language['language_id']; ?>" checked> <b><?php echo $text_autoCollapse[$language['language_id']]; ?></b>
                                            </label>
                                            <br>
                                            <label class="checkbox-inline" for="sortOrder<?php echo $language['language_id']; ?>">
                                                <input type="checkbox" id="sortOrder_attribute_tree<?php echo $language['language_id']; ?>" checked> <b><?php echo $text_sortOrder[$language['language_id']]; ?></b>
                                            </label>
                                            <br>
                                            <label class="checkbox-inline" for="lazyLoad<?php echo $language['language_id']; ?>">
                                                <input type="checkbox" id="lazyLoad_attribute_tree<?php echo $language['language_id']; ?>" <?php echo ($attributico_lazyload == '1' ? 'checked="checked"' : ''); ?>>
                                                <b><?php echo $text_lazyLoad[$language['language_id']]; ?></b>
                                            </label>
                                        </div>
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
                    <div id="tab-products_language<?php echo $language['language_id'];?>">
                        <div class="form-group form-inline collapse <?php if (in_array("fs_tab-duty_hideFilter" . $language['language_id'], $filter_settings)) { echo 'in'; } ?>"
                            id="tab-products_filter<?php echo $language['language_id']; ?>">
                            <label for="tab-products_search"> <?php echo $text_filter[$language['language_id']]; ?> </label>
                            <input type="text" name="tab-products_search<?php echo $language['language_id']; ?>" placeholder="Filter..." class="form-control" id="tab-products_search">
                            <button id="tab-products_btnResetSearch<?php echo $language['language_id']; ?>" type="button" class="button">&times;</button>
                            <button id="tab-products_btnSearch<?php echo $language['language_id']; ?>" type="button" class="button">&#9762;</button>
                            <button class="button" onclick="$(this).next().slideToggle(); return false;"><?php echo $button_filter_action[$language['language_id']]; ?></button>
                            <ul class="drop-menu" style="max-width: 250px; position: absolute; margin-left: 260px;">
                                <li><a id="f_tab-products_empty" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-products');"><?php echo $f_empty[$language['language_id']]; ?></a></li>
                                <li><a id="f_tab-products_digital" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-products');"><?php echo $f_digital[$language['language_id']]; ?></a></li>
                                <li><a id="f_tab-products_html" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-products');"><?php echo $f_html[$language['language_id']]; ?></a></li>
                                <li role="separator" class="divider"></li>
                                <li><a id="f_tab-products_default" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-products');"><?php echo $f_default[$language['language_id']]; ?></a></li>
                            </ul>
                            <span id="tab-products_matches<?php echo $language['language_id']; ?>" class="badge" style="margin-left: 5px;"></span>
                            <label class="checkbox-inline" style="padding-top:0px;" for="tab-products_autoComplete<?php echo $language['language_id']; ?>">
                                &nbsp;&nbsp;&nbsp;<input type="checkbox" name="fs_tab-products_autoComplete<?php echo $language['language_id']; ?>" id="tab-products_autoComplete<?php echo $language['language_id']; ?>"
                                    <?php if (in_array("fs_tab-products_autoComplete" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_autoComplete[$language['language_id']]; ?>
                            </label>
                            <label class="checkbox-inline" style="padding-top:0px;" for="tab-products_attributesOnly<?php echo $language['language_id']; ?>">
                                <input type="checkbox" name="fs_tab-products_attributesOnly<?php echo $language['language_id']; ?>" id="tab-products_attributesOnly<?php echo $language['language_id']; ?>"
                                    <?php if (in_array("fs_tab-products_attributesOnly" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Attributes_only[$language['language_id']]; ?>
                            </label>
                            <label class="checkbox-inline" style="padding-top:0px;" for="tab-products_leavesOnly<?php echo $language['language_id']; ?>">
                                <input type="checkbox" name="fs_tab-products_leavesOnly<?php echo $language['language_id']; ?>" id="tab-products_leavesOnly<?php echo $language['language_id']; ?>"
                                    <?php if (in_array("fs_tab-products_leavesOnly" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Leaves_only[$language['language_id']]; ?>
                            </label>
                            <div class="ajax-loader"><img id="loadImg<?php echo $language['language_id']; ?>" src="view/javascript/fancytree/skin-win7/loading.gif" style="z-index:1000; display:none;" /></div>
                            <span id="tab-products_searchmode<?php echo $language['language_id']; ?>">
                                <label class="checkbox-inline" for="tab-products_hideMode<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-products_hideMode<?php echo $language['language_id']; ?>" id="tab-products_hideMode<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-products_hideMode" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Hide_unmatched_nodes[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-products_autoExpand<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-products_autoExpand<?php echo $language['language_id']; ?>" id="tab-products_autoExpand<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-products_autoExpand" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Auto_expand[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-products_counter<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-products_counter<?php echo $language['language_id']; ?>" id="tab-products_counter<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-products_counter" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Counter_badges[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-products_hideExpandedCounter<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-products_hideExpandedCounter<?php echo $language['language_id']; ?>" id="tab-products_hideExpandedCounter<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-products_hideExpandedCounter" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_hideExpandedCounter[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-products_highlight<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-products_highlight<?php echo $language['language_id']; ?>" id="tab-products_highlight<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-products_highlight" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Highlight[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-products_fuzzy<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-products_fuzzy<?php echo $language['language_id']; ?>" id="tab-products_fuzzy<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-products_fuzzy" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Fuzzy[$language['language_id']]; ?>
                                </label>
                                <label class="checkbox-inline" for="tab-products_regex<?php echo $language['language_id']; ?>">
                                    <input type="checkbox" name="fs_tab-products_regex<?php echo $language['language_id']; ?>" id="tab-products_regex<?php echo $language['language_id']; ?>"
                                        <?php if (in_array("fs_tab-products_regex" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>> <?php echo $text_Regular_expression[$language['language_id']]; ?>
                                </label>
                            </span>
                        </div>
                        <table class="form table">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="left" style="width: 50%;">
                                        <div id="attribute_product_tree<?php echo $language['language_id']; ?>" name="attribute_product_tree<?php echo $language['language_id']; ?>" class="filetree"></div>
                                        <div id="options_attribute_product_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>">
                                            <label class="checkbox-inline" for="autoCollapse<?php echo $language['language_id']; ?>">
                                                <input type="checkbox" id="autoCollapse_attribute_product_tree<?php echo $language['language_id']; ?>" checked> <b><?php echo $text_autoCollapse[$language['language_id']]; ?></b>
                                            </label>
                                            <br>
                                            <label class="checkbox-inline" for="sortOrder<?php echo $language['language_id']; ?>">
                                                <input type="checkbox" id="sortOrder_attribute_product_tree<?php echo $language['language_id']; ?>" <?php echo ($attributico_sortorder == '1' ? 'checked="checked"' : ''); ?>>
                                                <b><?php echo $text_sortOrder[$language['language_id']]; ?></b>
                                            </label>
                                            <br>
                                            <label class="checkbox-inline" for="lazyLoad<?php echo $language['language_id']; ?>">
                                                <input type="checkbox" id="lazyLoad_attribute_product_tree<?php echo $language['language_id']; ?>" <?php echo ($attributico_lazyload == '1' ? 'checked="checked"' : ''); ?>>
                                                <b><?php echo $text_lazyLoad[$language['language_id']]; ?></b>
                                            </label>
                                        </div>
                                    </td>
                                    <td class="left">
                                        <div id="product_tree<?php echo $language['language_id']; ?>" name="product_tree<?php echo $language['language_id']; ?>" class="filetree"></div>
                                        <div id="options_product_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>">
                                            <label class="checkbox-inline" for="autoCollapse<?php echo $language['language_id']; ?>">
                                                <input type="checkbox" id="autoCollapse_product_tree<?php echo $language['language_id']; ?>" checked> <b><?php echo $text_autoCollapse[$language['language_id']]; ?></b>
                                            </label>
                                            <br>
                                            <label class="checkbox-inline" for="diver<?php echo $language['language_id']; ?>">
                                                <input type="checkbox" id="diver_product_tree<?php echo $language['language_id']; ?>" <?php echo ($attributico_diver == '1' ? 'checked="checked"' : ''); ?>>
                                                <b><?php echo $text_Diver[$language['language_id']]; ?></b>
                                            </label>
                                        </div>
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
var selNodes = null,
    selCategories = null;
var $attribute_synchro_trees = $('[name ^= "attribute_group_tree"], [name ^= "attribute_tree"], [name ^= "duty_attribute_tree"], [name ^= "attribute_product_tree"], [name ^= "group_check_tree"]');
var $attribute_group_tree = $('[name ^= "attribute_group_tree"]');
var $category_tree = $('[name ^= "category_tree"]');
var $category_attribute_tree = $('[name ^= "category_attribute_tree"]');
var $duty_attribute_tree = $('[name ^= "duty_attribute_tree"]');
var $attribute_tree = $('[name ^= "attribute_tree"]');
var $attribute_product_tree = $('[name ^= "attribute_product_tree"]');
var $product_tree = $('[name ^= "product_tree"]');
var $group_check_tree = $('[name ^= "group_check_tree"]');
var $category_synchro_trees = $('[name ^= "category_check_tree"], [name ^= "category_tree"]');
var $category_check_tree = $('[name ^= "category_check_tree"]');
var token = '<?php echo $token; ?>';
var user_token = '<?php echo $user_token; ?>';
var extension = '<?php echo $extension; ?>'; // для v2.3 другая структура каталогов
var edit = '<?php echo $edit; ?>'; // для v1.5 другая функция входа в товар
var contextmenu = [];
var textNewAttribute = <?php echo json_encode($text_New_attribute) ?>;
var textNewGroup = <?php echo json_encode($text_New_group) ?>;
var textConfirm = <?php echo json_encode($text_confirm) ?>;
var currentCategory = 0;

$attribute_group_tree.each(function(indx, element) {
    var lng_id = parseInt(element.id.replace(/\D+/ig, ''));
    contextmenu[lng_id] = [{
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
});

$(document).ready(function() {
    initTrees();

    $("[data-toggle='tooltip']").tooltip();

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
            click: function() {
                $(this).dialog("close");
            }
        }]
    });

    if ($('input[name = "attributico_smart_scroll"]:checkbox').is(":checked")) { // on/off smartscroll
        $('[id *= "tree"]:not(.settings) > ul.fancytree-container').addClass("smart-scroll"); // add class when all trees will be loaded
    }

    $('a[data-toggle="pill"]').on('click', function(e) {
        $("#column-2 .alert-success").hide();
        $("#column-2 .alert-info").show();
    });

    // $("button.menu").click(function(){
    //     $(this).next().slideToggle();
    // });

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
$('#tab-attribute_language a:first').tabs('show');
$('#tab-category_language a:first').tabs('show');
$('#tab-duty_language a:first').tabs('show');
$('#tab-products_language a:first').tabs('show');
</script>
<?php echo $footer; ?>