<label class="checkbox-inline pull-right clearfix" for="tab-attribute_hideFilter<?php echo $language['language_id']; ?>">
    <input type="checkbox" class="hide" name="fs_tab-attribute_hideFilter<?php echo $language['language_id']; ?>" id="tab-attribute_hideFilter<?php echo $language['language_id']; ?>"
        <?php if (in_array("fs_tab-attribute_hideFilter" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?> data-toggle="collapse" data-target="#tab-attribute_filterwidget<?php echo $language['language_id']; ?>">
    <i class="fa fa-angle-double-down fa-lg" aria-hidden="true"></i>
</label>
<div class="form-group form-inline collapse <?php if (in_array("fs_tab-attribute_hideFilter" . $language['language_id'], $filter_settings)) { echo 'in'; } ?>" 
    id="tab-attribute_filterwidget<?php echo $language['language_id']; ?>">
    <label for="tab-attribute_search">
        <?php echo $text_filter[$language['language_id']]; ?> </label>
    <input type="text" name="tab-attribute_search<?php echo $language['language_id']; ?>" placeholder="Filter..." class="form-control" id="tab-attribute_search">
    <button id="tab-attribute_btnResetSearch<?php echo $language['language_id']; ?>" type="button" class="btn btn-default">&times;</button>
    <button id="tab-attribute_btnSearch<?php echo $language['language_id']; ?>" type="button" class="btn btn-default"><i class="fa fa-search"></i></button>
    <div class="btn-group dropdown-events">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <?php echo $button_filter_action[$language['language_id']]; ?> <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
            <li><a id="f_tab-attribute_empty" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-attribute');"><?php echo $f_empty[$language['language_id']]; ?></a>
            </li>
            <li><a id="f_tab-attribute_digital" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-attribute');"><?php echo $f_digital[$language['language_id']]; ?></a>
            </li>
            <li><a id="f_tab-attribute_html" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-attribute');"><?php echo $f_html[$language['language_id']]; ?></a>
            </li>
            <li role="separator" class="divider"></li>
            <li><a id="f_tab-attribute_default" href="#" onclick="return FilterAction(this,<?php echo $language['language_id']; ?>,'tab-attribute');"><?php echo $f_default[$language['language_id']]; ?></a>
            </li>
        </ul>
        </button>
    </div>
    <span id="tab-attribute_matches<?php echo $language['language_id']; ?>" class="badge"></span>
    <label class="checkbox-inline" style="padding-top:0px;" for="tab-attribute_autoComplete<?php echo $language['language_id']; ?>">
        &nbsp;&nbsp;&nbsp;<input type="checkbox" name="fs_tab-attribute_autoComplete<?php echo $language['language_id']; ?>" id="tab-attribute_autoComplete<?php echo $language['language_id']; ?>"
            <?php if (in_array("fs_tab-attribute_autoComplete" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>>
        <?php echo $text_autoComplete[$language['language_id']]; ?>
    </label>
    <label class="checkbox-inline" style="padding-top:0px;" for="tab-attribute_attributesOnly<?php echo $language['language_id']; ?>">
        <input type="checkbox" name="fs_tab-attribute_attributesOnly<?php echo $language['language_id']; ?>" id="tab-attribute_attributesOnly<?php echo $language['language_id']; ?>"
            <?php if (in_array("fs_tab-attribute_attributesOnly" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>>
        <?php echo $text_Attributes_only[$language['language_id']]; ?>
    </label>
    <label class="checkbox-inline" style="padding-top:0px;" for="tab-attribute_leavesOnly<?php echo $language['language_id']; ?>">
        <input type="checkbox" name="fs_tab-attribute_leavesOnly<?php echo $language['language_id']; ?>" id="tab-attribute_leavesOnly<?php echo $language['language_id']; ?>"
            <?php if (in_array("fs_tab-attribute_leavesOnly" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>>
        <?php echo $text_Leaves_only[$language['language_id']]; ?>
    </label>
    <div class="ajax-loader"><img id="loadImg<?php echo $language['language_id']; ?>" src="view/javascript/fancytree/skin-win7/loading.gif" style="z-index:1000; display:none;" /></div>
    <span id="tab-attribute_searchmode<?php echo $language['language_id']; ?>">
        <label class="checkbox-inline" for="tab-attribute_hideMode<?php echo $language['language_id']; ?>">
            <input type="checkbox" name="fs_tab-attribute_hideMode<?php echo $language['language_id']; ?>" id="tab-attribute_hideMode<?php echo $language['language_id']; ?>"
                <?php if (in_array("fs_tab-attribute_hideMode" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>>
            <?php echo $text_Hide_unmatched_nodes[$language['language_id']]; ?>
        </label>
        <label class="checkbox-inline" for="tab-attribute_autoExpand<?php echo $language['language_id']; ?>">
            <input type="checkbox" name="fs_tab-attribute_autoExpand<?php echo $language['language_id']; ?>" id="tab-attribute_autoExpand<?php echo $language['language_id']; ?>"
                <?php if (in_array("fs_tab-attribute_autoExpand" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>>
            <?php echo $text_Auto_expand[$language['language_id']]; ?>
        </label>
        <label class="checkbox-inline" for="tab-attribute_counter<?php echo $language['language_id']; ?>">
            <input type="checkbox" name="fs_tab-attribute_counter<?php echo $language['language_id']; ?>" id="tab-attribute_counter<?php echo $language['language_id']; ?>"
                <?php if (in_array("fs_tab-attribute_counter" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>>
            <?php echo $text_Counter_badges[$language['language_id']]; ?>
        </label>
        <label class="checkbox-inline" for="tab-attribute_hideExpandedCounter<?php echo $language['language_id']; ?>">
            <input type="checkbox" name="fs_tab-attribute_hideExpandedCounter<?php echo $language['language_id']; ?>" id="tab-attribute_hideExpandedCounter<?php echo $language['language_id']; ?>"
                <?php if (in_array("fs_tab-attribute_hideExpandedCounter" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>>
            <?php echo $text_hideExpandedCounter[$language['language_id']]; ?>
        </label>
        <label class="checkbox-inline" for="tab-attribute_highlight<?php echo $language['language_id']; ?>">
            <input type="checkbox" name="fs_tab-attribute_highlight<?php echo $language['language_id']; ?>" id="tab-attribute_highlight<?php echo $language['language_id']; ?>"
                <?php if (in_array("fs_tab-attribute_highlight" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>>
            <?php echo $text_Highlight[$language['language_id']]; ?>
        </label>
        <label class="checkbox-inline" for="tab-attribute_fuzzy<?php echo $language['language_id']; ?>">
            <input type="checkbox" name="fs_tab-attribute_fuzzy<?php echo $language['language_id']; ?>" id="tab-attribute_fuzzy<?php echo $language['language_id']; ?>"
                <?php if (in_array("fs_tab-attribute_fuzzy" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>>
            <?php echo $text_Fuzzy[$language['language_id']]; ?>
        </label>
        <label class="checkbox-inline" for="tab-attribute_regex<?php echo $language['language_id']; ?>">
            <input type="checkbox" name="fs_tab-attribute_regex<?php echo $language['language_id']; ?>" id="tab-attribute_regex<?php echo $language['language_id']; ?>"
                <?php if (in_array("fs_tab-attribute_regex" . $language['language_id'], $filter_settings)) { echo 'checked'; } ?>>
            <?php echo $text_Regular_expression[$language['language_id']]; ?>
        </label>
    </span>
</div>