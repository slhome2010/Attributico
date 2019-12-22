<?php

@include_once(DIR_SYSTEM . 'license/sllic.lic');
require_once(DIR_SYSTEM . 'library/attributico/attributico.php');
define('MODULE_VERSION', 'v3.0.6');

class ControllerModuleAttributico extends Controller
{

    protected $data = array();
    private $error = array();
    private $debug_mode = false;
    private $avcahe = array();
    private $token;

    public function index()
    {
        if (version_compare(VERSION, '2.0.1', '>=')) {          
            $this->document->addStyle('view/stylesheet/jquery-ui.css');
        }
        
        $this->document->addStyle('view/javascript/fancytree/skin-win7/ui.fancytree.css');
        $this->document->addStyle('view/javascript/fancytree/skin-custom/custom.css');       
        $this->document->addStyle('view/stylesheet/attributico.css');

        if ($_SERVER['REMOTE_ADDR'] === '127.0.0.1' && file_exists ( DIR_APPLICATION . 'view/javascript/attributico.js' )) {
            $this->document->addScript('view/javascript/attributico.js'); 
        } else {
            $this->document->addScript('view/javascript/attributico.min.js'); 
        }        

        $extension = version_compare(VERSION, '2.3.0', '>=') ? "extension/" : "";
        $edit = version_compare(VERSION, '2.0.0', '>=') ? "edit" : "update";
        $link = version_compare(VERSION, '2.3.0', '>=') ? "extension/extension" : "extension/module";

        if (version_compare(VERSION, '3.0.0', '>=')) {
            $link = "marketplace/extension";
        }

        if (version_compare(VERSION, '2.2.0', '>=')) {
            $this->load->language($extension . 'module/attributico');
            $ssl = true;
        } else {
            $this->language->load('module/attributico');
            $ssl = 'SSL';
        }

        if (isset($this->session->data['user_token'])) {
            $this->token = $this->session->data['user_token'];
            $token_name = 'user_token';
        }
        if (isset($this->session->data['token'])) {
            $this->token = $this->session->data['token'];
            $token_name = 'token';
        }

        $this->data['user_token'] = $this->data['token'] = $this->token;
        $this->data['extension'] = $extension;
        $this->data['edit'] = $edit;

        $this->data['heading_title'] = $this->language->get('heading_title') . ' ' . MODULE_VERSION;

        $this->load->model('setting/setting');

        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            $children = array();
            $i = 1;
            while (isset($this->request->post['ft_' . $i])) {
                $children[$i] = $this->request->post['ft_' . $i];
                $i++;
            }
            $this->request->post['attributico_children'] = serialize($children);

            $filter_settings = array();
            foreach ($this->request->post as $key => $val) {
                if ($val == "on") {
                    $filter_settings[] = $key;
                }
            }
            $this->request->post['attributico_filter'] = serialize($filter_settings);

            $this->model_setting_setting->editSetting('attributico', $this->request->post);
            $this->session->data['success'] = $this->language->get('text_success');

            if (version_compare(VERSION, '2.0.1', '>=')) { // иначе вылетает из админки
                $this->response->redirect($this->url->link($link, $token_name . '=' . $this->token . '&type=module', $ssl));
            } else {
                $this->redirect($this->url->link($link, $token_name . '=' . $this->token, $ssl));
            }
        }

        if (class_exists('Vendor')) {
            $vendor = new Vendor();
        }
        $this->session->data['free'] = $vendor->franchise();
        if ($this->session->data['free']) {
            $this->data['heading_title'] = $this->language->get('heading_title') . ' View ' . MODULE_VERSION . '(free)';
        }

        $duty_check = $this->duty_check();
        $this->data['duty_check'] = empty($duty_check) ? false : true;

        if (isset($this->session->data['a_debug_mode'])) {
            $this->debug_mode = $this->session->data['a_debug_mode'];
        }

        $this->data['text_edit'] = $this->language->get('text_edit');
        $this->data['text_enabled'] = $this->language->get('text_enabled');
        $this->data['text_disabled'] = $this->language->get('text_disabled');
        $this->data['text_support'] = $this->language->get('text_support');
        $this->data['text_help1'] = $this->language->get('text_help1');
        $this->data['text_help2'] = $this->language->get('text_help2');
        $this->data['text_renew'] = $this->language->get('text_renew');
        $this->data['text_keep'] = $this->language->get('text_keep');
        $this->data['text_confirm'] = $this->language->get('text_confirm');
        $this->data['error_not_info'] = $this->language->get('error_not_info');

        $this->data['text_duty'] = $this->language->get('text_duty');
        $this->data['text_duty_only'] = $this->language->get('text_duty_only');
        $this->data['text_attention'] = $this->language->get('text_attention');
        $this->data['help_upgrade'] = $this->language->get('help_upgrade');
        $this->data['entry_upgrade'] = $this->language->get('entry_upgrade');

        $this->data['tab_general'] = $this->language->get('tab_general');
        $this->data['tab_attribute'] = $this->language->get('tab_attribute');
        $this->data['tab_category'] = $this->language->get('tab_category');
        $this->data['tab_duty'] = $this->language->get('tab_duty');
        $this->data['tab_support'] = $this->language->get('tab_support');
        $this->data['tab_tools'] = $this->language->get('tab_tools');
        $this->data['tab_products'] = $this->language->get('tab_products');
        $this->data['tab_empty'] = $this->language->get('tab_empty');
        $this->data['tab_defrag'] = $this->language->get('tab_defrag');
        $this->data['tab_scavengery'] = $this->language->get('tab_scavengery');
        $this->data['tab_standart'] = $this->language->get('tab_standart');
        $this->data['tab_detached'] = $this->language->get('tab_detached');
        $this->data['tab_deduplicate'] = $this->language->get('tab_deduplicate');
        $this->data['tab_cache'] = $this->language->get('tab_cache');
        $this->data['tab_category_attributes'] = $this->language->get('tab_category_attributes');

        $this->data['legend_general'] = $this->language->get('legend_general');
        $this->data['legend_category'] = $this->language->get('legend_category');
        $this->data['legend_algorithm'] = $this->language->get('legend_algorithm');
        $this->data['legend_inherit'] = $this->language->get('legend_inherit');
        $this->data['legend_children'] = $this->language->get('legend_children');

        $this->data['entry_splitter'] = $this->language->get('entry_splitter');
        $this->data['entry_sortorder'] = $this->language->get('entry_sortorder');
        $this->data['entry_smart_scroll'] = $this->language->get('entry_smart_scroll');
        $this->data['entry_empty'] = $this->language->get('entry_empty');
        $this->data['entry_multiselect'] = $this->language->get('entry_multiselect');
        $this->data['entry_autoattribute'] = $this->language->get('entry_autoattribute');
        $this->data['entry_autodel'] = $this->language->get('entry_autodel');
        $this->data['entry_autoadd_inherit'] = $this->language->get('entry_autoadd_inherit');
        $this->data['entry_autodel_inherit'] = $this->language->get('entry_autodel_inherit');
        $this->data['entry_product_text'] = $this->language->get('entry_product_text');
        $this->data['entry_attribute_category'] = $this->language->get('entry_attribute_category');
        $this->data['entry_duty'] = $this->language->get('entry_duty');
        $this->data['entry_attribute_groups'] = $this->language->get('entry_attribute_groups');
        $this->data['entry_attributes'] = $this->language->get('entry_attributes');
        $this->data['entry_products'] = $this->language->get('entry_products');
        $this->data['entry_about_blank'] = $this->language->get('entry_about_blank');
        $this->data['entry_lazyload'] = $this->language->get('entry_lazyload');
        $this->data['entry_cache'] = $this->language->get('entry_cache');
        $this->data['entry_info_title'] = $this->language->get('entry_info_title');
        $this->data['entry_create_categories'] = $this->language->get('entry_create_categories');
        $this->data['entry_inject_to_products'] = $this->language->get('entry_inject_to_products');
        $this->data['entry_multistore'] = $this->language->get('entry_multistore');

        $this->data['help_sortorder'] = $this->language->get('help_sortorder');
        $this->data['help_smart_scroll'] = $this->language->get('help_smart_scroll');
        $this->data['help_multiselect'] = $this->language->get('help_multiselect');
        $this->data['help_empty'] = $this->language->get('help_empty');
        $this->data['help_autoattribute'] = $this->language->get('help_autoattribute');
        $this->data['help_autodel'] = $this->language->get('help_autodel');
        $this->data['help_autodel_inherit'] = $this->language->get('help_autodel_inherit');
        $this->data['help_autoadd_inherit'] = $this->language->get('help_autoadd_inherit');
        $this->data['help_product_text'] = $this->language->get('help_product_text');
        $this->data['help_children'] = $this->language->get('help_children');
        $this->data['help_nosettings'] = $this->language->get('help_nosettings');
        $this->data['help_about_blank'] = $this->language->get('help_about_blank');
        $this->data['help_lazyload'] = $this->language->get('help_lazyload');
        $this->data['help_group_options'] = $this->language->get('help_group_options');
        $this->data['help_defrag_options'] = $this->language->get('help_defrag_options');
        $this->data['help_cache'] = $this->language->get('help_cache');
        $this->data['help_categories_options'] = $this->language->get('help_categories_options');
        $this->data['help_multistore'] = $this->language->get('help_multistore');

        $this->data['button_apply'] = $this->language->get('button_apply');
        $this->data['button_save'] = $this->language->get('button_save');
        $this->data['button_cancel'] = $this->language->get('button_cancel');
        $this->data['button_play'] = $this->language->get('button_play');
        $this->data['button_close'] = $this->language->get('button_close');
        $this->data['button_check_for_updates'] = $this->language->get('button_check_for_updates');

        $this->data['head_settings'] = $this->language->get('head_settings');
        $this->data['head_command'] = $this->language->get('head_command');
        $this->data['head_status'] = $this->language->get('head_status');
        $this->data['alert_warning'] = $this->language->get('alert_warning');
        $this->data['alert_success'] = $this->language->get('alert_success');
        $this->data['alert_info'] = $this->language->get('alert_info');
        $this->data['alert_reload'] = $this->language->get('alert_reload');
        $this->data['alert_backup'] = $this->language->get('alert_backup');

        if (isset($this->error['warning'])) {
            $this->data['error_warning'] = $this->error['warning'];
        } else {
            $this->data['error_warning'] = '';
        }

        $this->data['breadcrumbs'] = array();

        $this->data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_home'),
            'href' => $this->url->link('common/dashboard', $token_name . '=' . $this->token, $ssl),
            'separator' => false
        );

        $this->data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_module'),
            'href' => $this->url->link($link, $token_name . '=' . $this->token . '&type=module', $ssl),
            'separator' => ' :: '
        );

        $this->data['breadcrumbs'][] = array(
            'text' => $this->language->get('heading_title'),
            'href' => $this->url->link($extension . 'module/attributico', $token_name . '=' . $this->token, $ssl),
            'separator' => ' :: '
        );

        $this->load->model('localisation/language');
        $this->data['languages'] = $this->model_localisation_language->getLanguages();
        $this->session->data['languages'] = $this->data['languages'];

        $default_settings = array();

        foreach ($this->data['languages'] as $language) {
            $lng = $this->getLanguage($language['language_id']);

            if (version_compare(VERSION, '2.2.0', '>=')) {
                $this->data['languages'][$language['code']]['src'] = 'language/' . $language['code'] . '/' . $language['code'] . '.png';
            } else {
                $this->data['languages'][$language['code']]['src'] = 'view/image/flags/' . $language['image'];
            }
            // global tree entry-text
            $this->session->data['entry_attribute_groups'][$language['language_id']] = $lng->get('entry_attribute_groups');
            $this->session->data['entry_attribute_template'][$language['language_id']] = $lng->get('entry_attribute_template');
            $this->session->data['entry_attribute_values'][$language['language_id']] = $lng->get('entry_attribute_values');
            $this->session->data['entry_duty'][$language['language_id']] = $lng->get('entry_duty');
            $this->session->data['entry_attribute_category'][$language['language_id']] = $lng->get('entry_attribute_category');
            $this->session->data['error_not_category'][$language['language_id']] = $lng->get('error_not_category');
            $this->session->data['entry_categories'][$language['language_id']] = $lng->get('entry_categories');
            $this->session->data['error_not_attribute'][$language['language_id']] = $lng->get('error_not_attribute');
            $this->session->data['entry_products'][$language['language_id']] = $lng->get('entry_products');
            $this->session->data['entry_attribute'][$language['language_id']] = $lng->get('entry_attribute');
            $this->session->data['entry_attributes'][$language['language_id']] = $lng->get('entry_attributes');
            // menu
            $this->data['text_New_attribute'][$language['language_id']] = $lng->get('text_New_attribute');
            $this->data['text_New_group'][$language['language_id']] = $lng->get('text_New_group');
            $this->data['text_Expande'][$language['language_id']] = $lng->get('text_Expande');
            $this->data['text_Collapse'][$language['language_id']] = $lng->get('text_Collapse');
            $this->data['text_sortOrder'][$language['language_id']] = $lng->get('text_sortOrder');
            $this->data['text_Diver'][$language['language_id']] = $lng->get('text_Diver');
            $this->data['text_Edit'][$language['language_id']] = $lng->get('text_Edit');
            $this->data['text_Delete'][$language['language_id']] = $lng->get('text_Delete');
            $this->data['text_Copy'][$language['language_id']] = $lng->get('text_Copy');
            $this->data['text_Paste'][$language['language_id']] = $lng->get('text_Paste');
            $this->data['text_lazyLoad'][$language['language_id']] = $lng->get('text_lazyLoad');
            // options
            $this->data['text_Options'][$language['language_id']] = $lng->get('text_Options');
            $this->data['text_Sort'][$language['language_id']] = $lng->get('text_Sort');
            $this->data['button_submit'][$language['language_id']] = $lng->get('button_submit');
            $this->data['text_multiSelect'][$language['language_id']] = $lng->get('text_multiSelect');
            // filter
            $this->data['text_matches'][$language['language_id']] = $lng->get('text_matches');
            $this->data['text_filter'][$language['language_id']] = $lng->get('text_filter');
            $this->data['text_Hide_unmatched_nodes'][$language['language_id']] = $lng->get('text_Hide_unmatched_nodes');
            $this->data['text_autoCollapse'][$language['language_id']] = $lng->get('text_autoCollapse');
            $this->data['text_autoComplete'][$language['language_id']] = $lng->get('text_autoComplete');
            $this->data['text_Regular_expression'][$language['language_id']] = $lng->get('text_Regular_expression');
            $this->data['text_Highlight'][$language['language_id']] = $lng->get('text_Highlight');
            $this->data['text_Fuzzy'][$language['language_id']] = $lng->get('text_Fuzzy');
            $this->data['text_Highlight'][$language['language_id']] = $lng->get('text_Highlight');
            $this->data['text_hideExpandedCounter'][$language['language_id']] = $lng->get('text_hideExpandedCounter');
            $this->data['text_Counter_badges'][$language['language_id']] = $lng->get('text_Counter_badges');
            $this->data['text_Auto_expand'][$language['language_id']] = $lng->get('text_Auto_expand');
            $this->data['text_Leaves_only'][$language['language_id']] = $lng->get('text_Leaves_only');
            $this->data['text_Attributes_only'][$language['language_id']] = $lng->get('text_Attributes_only');
            $this->data['button_filter_action'][$language['language_id']] = $lng->get('button_filter_action');
            $this->data['f_empty'][$language['language_id']] = $lng->get('f_empty');
            $this->data['f_digital'][$language['language_id']] = $lng->get('f_digital');
            $this->data['f_html'][$language['language_id']] = $lng->get('f_html');
            $this->data['f_default'][$language['language_id']] = $lng->get('f_default');
            $alltabs = ['tab-attribute', 'tab-duty', 'tab-category', 'tab-products'];
            foreach ($alltabs as $tab) {
                array_push($default_settings, 'fs_' . $tab . '_autoComplete' . $language['language_id'], 'fs_' . $tab . '_autoExpand' . $language['language_id'], 'fs_' . $tab . '_counter' . $language['language_id'], 'fs_' . $tab . '_hideExpandedCounter' . $language['language_id'], 'fs_' . $tab . '_highlight' . $language['language_id']);
            }
        }

        $this->data['action'] = $this->url->link($extension . 'module/attributico', $token_name . '=' . $this->token, $ssl);
        $this->data['cancel'] = $this->url->link($link, $token_name . '=' . $this->token . '&type=module', $ssl);

        if (isset($this->request->post['attributico_splitter'])) {
            $this->data['attributico_splitter'] = $this->request->post['attributico_splitter'];
        } else {
            $this->data['attributico_splitter'] = $this->config->get('attributico_splitter');
        }
        if (isset($this->request->post['attributico_sortorder'])) {
            $this->data['attributico_sortorder'] = $this->request->post['attributico_sortorder'];
        } elseif (($this->config->get('attributico_sortorder'))) {
            $this->data['attributico_sortorder'] = $this->config->get('attributico_sortorder');
        } else {
            $this->data['attributico_sortorder'] = 0;
        }
        if (isset($this->request->post['attributico_smart_scroll'])) {
            $this->data['attributico_smart_scroll'] = $this->request->post['attributico_smart_scroll'];
        } elseif (($this->config->get('attributico_smart_scroll'))) {
            $this->data['attributico_smart_scroll'] = $this->config->get('attributico_smart_scroll');
        } else {
            $this->data['attributico_smart_scroll'] = 0;
        }
        if (isset($this->request->post['attributico_multiselect'])) {
            $this->data['attributico_multiselect'] = $this->request->post['attributico_multiselect'];
        } elseif (($this->config->get('attributico_multiselect'))) {
            $this->data['attributico_multiselect'] = $this->config->get('attributico_multiselect');
        } else {
            $this->data['attributico_multiselect'] = 0;
        }
        if (isset($this->request->post['attributico_empty'])) {
            $this->data['attributico_empty'] = $this->request->post['attributico_empty'];
        } elseif (($this->config->get('attributico_empty'))) {
            $this->data['attributico_empty'] = $this->config->get('attributico_empty');
        } else {
            $this->data['attributico_empty'] = 0;
        }
        if (isset($this->request->post['attributico_autoadd'])) {
            $this->data['attributico_autoadd'] = $this->request->post['attributico_autoadd'];
        } elseif (($this->config->get('attributico_autoadd'))) {
            $this->data['attributico_autoadd'] = $this->config->get('attributico_autoadd');
        } else {
            $this->data['attributico_autoadd'] = 0;
        }
        if (isset($this->request->post['attributico_autodel'])) {
            $this->data['attributico_autodel'] = $this->request->post['attributico_autodel'];
        } elseif (($this->config->get('attributico_autodel'))) {
            $this->data['attributico_autodel'] = $this->config->get('attributico_autodel');
        } else {
            $this->data['attributico_autodel'] = 0;
        }
        if (isset($this->request->post['attributico_autoadd_subcategory'])) {
            $this->data['attributico_autoadd_subcategory'] = $this->request->post['attributico_autoadd_subcategory'];
        } elseif (($this->config->get('attributico_autoadd_subcategory'))) {
            $this->data['attributico_autoadd_subcategory'] = $this->config->get('attributico_autoadd_subcategory');
        } else {
            $this->data['attributico_autoadd_subcategory'] = 0;
        }
        if (isset($this->request->post['attributico_autodel_subcategory'])) {
            $this->data['attributico_autodel_subcategory'] = $this->request->post['attributico_autodel_subcategory'];
        } elseif (($this->config->get('attributico_autodel_subcategory'))) {
            $this->data['attributico_autodel_subcategory'] = $this->config->get('attributico_autodel_subcategory');
        } else {
            $this->data['attributico_autodel_subcategory'] = 0;
        }
        if (isset($this->request->post['attributico_product_text'])) {
            $this->data['attributico_product_text'] = $this->request->post['attributico_product_text'];
        } elseif (($this->config->get('attributico_product_text'))) {
            $this->data['attributico_product_text'] = $this->config->get('attributico_product_text');
        } else {
            $this->data['attributico_product_text'] = 2;
        }
        if ($this->config->get('attributico_filter')) {
            $this->data['filter_settings'] = unserialize($this->config->get('attributico_filter'));
        } else {
            $this->data['filter_settings'] = $default_settings;
        }
        if (isset($this->request->post['attributico_about_blank'])) {
            $this->data['attributico_about_blank'] = $this->request->post['attributico_about_blank'];
        } elseif (($this->config->get('attributico_about_blank'))) {
            $this->data['attributico_about_blank'] = $this->config->get('attributico_about_blank');
        } else {
            $this->data['attributico_about_blank'] = 0;
        }
        if (isset($this->request->post['attributico_lazyload'])) {
            $this->data['attributico_lazyload'] = $this->request->post['attributico_lazyload'];
        } elseif (($this->config->get('attributico_lazyload'))) {
            $this->data['attributico_lazyload'] = $this->config->get('attributico_lazyload');
        } else {
            $this->data['attributico_lazyload'] = 0;
        }
        if (isset($this->request->post['attributico_cache'])) {
            $this->data['attributico_cache'] = $this->request->post['attributico_cache'];
        } elseif (($this->config->get('attributico_cache'))) {
            $this->data['attributico_cache'] = $this->config->get('attributico_cache');
        } else {
            $this->data['attributico_cache'] = 0;
        }
        if (isset($this->request->post['attributico_multistore'])) {
            $this->data['attributico_multistore'] = $this->request->post['attributico_multistore'];
        } elseif (($this->config->get('attributico_multistore'))) {
            $this->data['attributico_multistore'] = $this->config->get('attributico_multistore');
        } else {
            $this->data['attributico_multistore'] = 0;
        }
        /* if (isset($this->request->post['attributico_diver'])) {
            $this->data['attributico_diver'] = $this->request->post['attributico_diver'];
        } elseif (($this->config->get('attributico_diver'))) {
            $this->data['attributico_diver'] = $this->config->get('attributico_diver');
        } else {
            $this->data['attributico_diver'] = 0;
        } */

        if (version_compare(VERSION, '2.0.1', '>=')) {
            $this->data['header'] = $this->load->controller('common/header');
            $this->data['column_left'] = $this->load->controller('common/column_left');
            $this->data['footer'] = $this->load->controller('common/footer');

            $tpl = version_compare(VERSION, '2.2.0', '>=') ? "" : ".tpl";
            $this->response->setOutput($this->load->view($extension . 'module/attributico' . $tpl, $this->data));
        } else {
            $this->template = 'module/attributico_1_5_x.tpl';
            $this->children = array(
                'common/header',
                'common/footer'
            );
            $this->response->setOutput($this->render());
        }
    }

    protected function validate()
    {
        $extension = version_compare(VERSION, '2.3.0', '>=') ? "extension/" : "";
        if (!$this->user->hasPermission('modify', $extension . 'module/attributico')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }
        return !$this->error;
    }

    public function getCategoryAttributes()
    {
        $json = array();
        $sortOrder = $this->config->get('attributico_sortorder') == '1' ? true : false;
        $category_id = isset($this->request->get['category_id']) ? (int)$this->request->get['category_id'] : 0;
        $categoryAttributes = [];

        $this->load->model('catalog/attributico');
        $filter_data = array(
            'category_id' => (int)$category_id,
            'sort' => $sortOrder ? 'sort_attribute_group, a.sort_order' : ''
        );

        $category_attribute_data = $this->model_catalog_attributico->getCategoryAttributes($filter_data);

        foreach ($category_attribute_data as $attribute) {
            $json[] = array(
                'attribute_id' => $attribute['attribute_id'],
                'name' => $attribute['attribute_description'],
            );
        }

        if (!$sortOrder) {
            $sort_order = array();
            foreach ($json as $key => $value) {
                $sort_order[$key] = $value['name'];
            }
            array_multisort($sort_order, SORT_ASC, $json);
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json));
    }

    public function getValuesList()
    {
        $json = array();
        $attribute_id = isset($this->request->get['attribute_id']) ? (int)$this->request->get['attribute_id'] : 0;
        $view_mode = isset($this->request->get['view_mode']) ? $this->request->get['view_mode'] : 'template';
        $categories = isset($this->request->get['categories']) ? $this->request->get['categories'] : array();
        $duty = isset($this->request->get['duty']) ? $this->request->get['duty'] : false;
        $splitter = !($this->config->get('attributico_splitter') == '') ? $this->config->get('attributico_splitter') : '/';

        if (isset($this->session->data['languages'])) {
            $languages = $this->session->data['languages'];
        } else {
            $this->load->model('localisation/language');
            $languages = $this->model_localisation_language->getLanguages();
        }

        $this->load->model('catalog/attributico');
        $results = $duty ? $this->model_catalog_attributico->getDutyValues($attribute_id) : $this->model_catalog_attributico->getAttributeValues($attribute_id, $categories);

        if ($results) {
            foreach ($languages as $language) {
                if (isset($results[$language['language_id']])) {
                    if ($view_mode == 'template') {
                        $select = "<select name='attribute_select_{$attribute_id}' class='form-control attribute_select' attribute_id='{$attribute_id}' language_id='{$language['language_id']}' style='display:block;'>";
                        $select .= "<option value=''>" . $this->language->get('text_select') . "</option>";

                        foreach ($results[$language['language_id']] as $row) {
                            if ($row['text'] != "") {
                                $select .= "<option value='{$row['text']}'>{$row['text']}</option>";
                            }
                        }
                        $select .= "</select>";
                    } else {
                        $select = "<select name='attribute_select_{$attribute_id}' class='form-control attribute_select' attribute_id='{$attribute_id}' language_id='{$language['language_id']}' style='display:block;'>";
                        $select .= "<option value=''>" . $this->language->get('text_select') . "</option>";
                        $all_elements = array();
                        foreach ($results[$language['language_id']] as $row) {
                            $elements = explode($splitter, $row['text']);
                            foreach ($elements as $element) {
                                if ($element != "") {
                                    $all_elements[] = trim($element);
                                }
                            }
                        }

                        $values = array_unique($all_elements);
                        array_multisort($values);
                        foreach ($values as $value) {
                            $select .= "<option value='{$value}'>{$value}</option>";
                        }
                        $select .= "</select>";
                    }

                    $json[$language['language_id']][] = $select;
                }
            }
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json));
    }

    public function getAttributeDuty()
    {
        $json = array();
        $attribute_id = isset($this->request->get['attribute_id']) ? (int)$this->request->get['attribute_id'] : 0;
        $method = $this->config->get('attributico_product_text');

        if ($this->config->get('attributico_autoadd')) {

            if (isset($this->session->data['languages'])) {
                $languages = $this->session->data['languages'];
            } else {
                $this->load->model('localisation/language');
                $languages = $this->model_localisation_language->getLanguages();
            }

            $this->load->model('catalog/attributico');

            if ($method == '3' || $method == '4')
                foreach ($languages as $language) {
                    $json[$language['language_id']][] = $this->model_catalog_attributico->whoisOnDuty($attribute_id, $language);
                }
            if ($method == '1')
                foreach ($languages as $language) {
                    $json[$language['language_id']][] = '';
                }
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json));
    }

    public function getMethod()
    {
        $method = $this->config->get('attributico_product_text');
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput($method);
    }

    public function getAttributeGroupTree()
    {
        $language_id = isset($this->request->get['language_id']) ? $this->request->get['language_id'] : $this->config->get('config_language_id');
        $sortOrder = isset($this->request->get['sortOrder']) ? filter_var($this->request->get['sortOrder'], FILTER_VALIDATE_BOOLEAN) : true;
        $lazyLoad = isset($this->request->get['lazyLoad']) ? filter_var($this->request->get['lazyLoad'], FILTER_VALIDATE_BOOLEAN) : false;
        $onlyGroup = isset($this->request->get['onlyGroup']) ? filter_var($this->request->get['onlyGroup'], FILTER_VALIDATE_BOOLEAN) : false;
        $cache = isset($this->request->get['cache']) ? filter_var($this->request->get['cache'], FILTER_VALIDATE_BOOLEAN) : $this->config->get('attributico_cache');
        $cachename = '';

        $tree = isset($this->request->get['tree']) ? $this->request->get['tree'] : '1';
        if ($this->config->get('attributico_children')) {
            $settings = unserialize($this->config->get('attributico_children'));
        } else {
            $settings = array(
                '1' => array("template", "value"),
                '2' => array("duty"),
                '3' => array("duty"),
                '4' => array("template", "value"),
                '5' => array("template", "value"),
            );
        }
        $children = array(
            "template" => isset($settings[$tree]) ? in_array("template", $settings[$tree]) : false,
            "value" => isset($settings[$tree]) ? in_array("value", $settings[$tree]) : false,
            "duty" => isset($settings[$tree]) ? in_array("duty", $settings[$tree]) : false
        );

        if ($cache) {
            $cachename = "attributico.tree." . (int)$language_id . (int)$sortOrder . (int)$lazyLoad . (int)$onlyGroup . (int)$children["template"] . (int)$children["value"] . (int)$children["duty"];
            $cache_tree_data = $this->cache->get($cachename);
        } else {
            $cache_tree_data = false;
        }

        if (!$cache_tree_data) {

            $this->load->model('catalog/attributico');

            $filter_data = array(
                'sort' => $sortOrder ? 'ag.sort_order' : '',
                'language_id' => $language_id
            );
            $attribute_groups = $this->model_catalog_attributico->getAttributeGroups($filter_data);

            if (isset($this->session->data['a_debug_mode'])) {
                $this->debug_mode = $this->session->data['a_debug_mode'];
            }

            $groupNode = new Node();
            foreach ($attribute_groups as $attribute_group) {
                $debug_group = $this->debug_mode ? " (id=" . $attribute_group['attribute_group_id'] . ")" : '';
                $groupNode->addSibling(new Node(array(
                    "title" => $attribute_group['name'] . $debug_group,
                    "key" => "group_" . (string)$attribute_group['attribute_group_id'],
                    "folder" => true,
                    "extraClasses" => $attribute_group['attribute_group_id'] == '1' ? "custom3" : '',
                    "children" => $onlyGroup ? '' : $this->getAttributeNodes($attribute_group['attribute_group_id'], $language_id, $sortOrder, $children, $lazyLoad)
                )));
            }

            $rootData = array(
                "title" => $this->session->data['entry_attribute_groups'][$language_id],
                "folder" => true,
                "expanded" => true,
                "children" => $groupNode->render(),
                "unselectable" => $onlyGroup ? false : true,
            );

            $AttributeGroupTree = new Tree(new Node($rootData));
            $cache_tree_data = $AttributeGroupTree->render();
            if ($cache) {
                $this->cache->set($cachename, $cache_tree_data);
            }
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($cache_tree_data));
    }

    private function getAttributeNodes($attribute_group_id, $language_id, $sortOrder, $children, $lazyLoad)
    {
        $filter_data = array(
            'filter_attribute_group_id' => (int)$attribute_group_id,
            'sort' => $sortOrder ? 'a.sort_order' : '',
            'language_id' => $language_id,
        );

        $attributeNode = new Node();
        $attributes = $this->model_catalog_attributico->getAttributes($filter_data);
        foreach ($attributes as $attribute) {
            $templateNode = new Node(array(
                "title" => $this->session->data['entry_attribute_template'][$language_id], "unselectable" => true, "key" => "template_" . (string)$attribute['attribute_id'],
                "children" => $lazyLoad ? '' : $this->getAttributeValuesNodes($attribute['attribute_id'], $language_id, 'template'), "lazy" => $lazyLoad ? true : false,
            ));
            $valueNode = new Node(array(
                "title" => $this->session->data['entry_attribute_values'][$language_id], "unselectable" => true, "key" => "value_" . (string)$attribute['attribute_id'],
                "children" => $lazyLoad ? '' : $this->getAttributeValuesNodes($attribute['attribute_id'], $language_id, 'values'), "lazy" => $lazyLoad ? true : false,
            ));
            $dutyNode = new Node(array("title" => $attribute['duty'], "key" => "duty_" . (string)$attribute['attribute_id'], "extraClasses" => "custom1", ));
            $childNode = new Node();

            if ($children['duty']) {
                $childNode->addSibling($dutyNode);
            }
            if ($children['template']) {
                $childNode->addSibling($templateNode);
            }
            if ($children['value']) {
                $childNode->addSibling($valueNode);
            }
            $debug_attribute = $this->debug_mode ? " (id=" . $attribute['attribute_id'] . ")" : '';
            $attributeNode->addSibling(new Node(array(
                "title" => $attribute['name'] . $debug_attribute,
                "key" => "attribute_" . (string)$attribute['attribute_id'], "children" => $childNode->render()
            )));
        }

        return $attributeNode->render();
    }

    private function getAttributeValuesNodes($attribute_id, $language_id, $mode = 'template', $duty = "")
    {
        $all_elements = array();

        if (!isset($this->avcahe[$attribute_id])) {
            $this->avcahe[$attribute_id] = $this->model_catalog_attributico->getAttributeValues($attribute_id);
        }
        $attribute_values = $this->avcahe[$attribute_id];

        $splitter = !($this->config->get('attributico_splitter') == '') ? $this->config->get('attributico_splitter') : '/';
        $empty = $this->config->get('attributico_empty');

        $nodeValues = new Node();
        if (array_key_exists($language_id, $attribute_values)) {
            foreach ($attribute_values[$language_id] as $index => $value) {
                if ($mode == 'template') {
                    if ($value['text'] != "" || $empty) { // сделать проверку на пустой текст
                        $nodeValues->addSibling(new Node(array(
                            "title" => $value['text'], "key" => "template_" . (string)$attribute_id . "_" . $index, "unselectable" => false,
                            //  "extraClasses" => $value['text'] == $duty ? "custom1" : ""
                        )));
                    }
                } else {
                    $elements = explode($splitter, $value['text']);
                    foreach ($elements as $element) {
                        if ($element != "" || $empty) {
                            $all_elements[] = trim($element);
                        }
                    }
                }
            }
            if ($mode == 'values') {
                $values = array_unique($all_elements);
                array_multisort($values);
                foreach ($values as $index => $value) {
                    $nodeValues->addSibling(new Node(array("title" => $value, "key" => "value_" . (string)$attribute_id . "_" . $index, "unselectable" => false)));
                }
            }
        }
        return $nodeValues->render();
    }

    public function getLazyAttributeValues()
    {
        $json = array();
        $language_id = isset($this->request->get['language_id']) ? $this->request->get['language_id'] : $this->config->get('config_language_id');
        $key = isset($this->request->get['key']) ? explode("_", $this->request->get['key']) : array('0', '0');

        if (isset($this->session->data['a_debug_mode'])) {
            $this->debug_mode = $this->session->data['a_debug_mode'];
        }

        $this->load->model('catalog/attributico');
        if ($key[0] == 'value') {
            $attribute_id = $key[1];
            $json = $this->getAttributeValuesNodes($attribute_id, $language_id, 'values');
        }
        if ($key[0] == 'template') {
            $attribute_id = $key[1];
            $json = $this->getAttributeValuesNodes($attribute_id, $language_id, 'template');
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json));
    }

    //----------------------------------------CategoryTree------------------------------------------------------------------
    public function getCategoryTree()
    {
        $language_id = isset($this->request->get['language_id']) ? $this->request->get['language_id'] : $this->config->get('config_language_id');
        $sortOrder = isset($this->request->get['sortOrder']) ? filter_var($this->request->get['sortOrder'], FILTER_VALIDATE_BOOLEAN) : true;
        $cache = isset($this->request->get['cache']) ? filter_var($this->request->get['cache'], FILTER_VALIDATE_BOOLEAN) : $this->config->get('attributico_cache');
        $multistore = isset($this->request->get['multistore']) ? filter_var($this->request->get['multistore'], FILTER_VALIDATE_BOOLEAN) : $this->config->get('attributico_multistore');

        $this->config->set('attributico_multistore', (string)$multistore);

        if (isset($this->session->data['a_debug_mode'])) {
            $this->debug_mode = $this->session->data['a_debug_mode'];
        }

        if ($cache) {
            $cachename = "attributico.tree.category" . (int)$language_id . (int)$sortOrder . (int)$this->debug_mode;
            $cache_tree_data = $this->cache->get($cachename);
        } else {
            $cache_tree_data = false;
        }

        if (!$cache_tree_data) {
            //  $language = $this->getLanguage($language_id);

            $this->load->model('catalog/attributico');
            $all_categories = $this->model_catalog_attributico->getAllCategories();

            $mainCategory = new Node();
            foreach ($all_categories[0] as $main_category) {
                $categories_recursive = $this->getCategoriesRecursive($all_categories, $language_id, $main_category['category_id'], $sortOrder);
                $debug_category = $this->debug_mode ? " (id=" . $main_category['category_id'] . ")" : '';
                $mainCategory->addSibling(new Node(array(
                    "title" => $main_category['name'] . $debug_category, "folder" => true,
                    "key" => "category_" . (string)$main_category['category_id'], "children" => $categories_recursive
                )));
            }

            if (!$sortOrder) {
                $mainCategory->sort();
            }

            $rootData = array(
                "title" => $this->session->data['entry_categories'][$language_id],
                "folder" => true,
                "expanded" => true,
                "children" => $mainCategory->render(),
            );

            $CategoryTree = new Tree(new Node($rootData));
            $cache_tree_data = $CategoryTree->render();
            if ($cache) {
                $this->cache->set($cachename, $cache_tree_data);
            }
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($cache_tree_data));
    }

    private function getCategoriesRecursive($categories, $language_id, $parent_id, $sortOrder)
    {
        $categoryNode = new Node();
        if (array_key_exists($parent_id, $categories)) {
            foreach ($categories[$parent_id] as $category) {
                $categories_recursive = $this->getCategoriesRecursive($categories, $language_id, $category['category_id'], $sortOrder);
                $debug_category = $this->debug_mode ? " (id=" . $category['category_id'] . ")" : '';
                $categoryNode->addSibling(new Node(array(
                    "title" => $category['name'] . $debug_category,
                    "key" => "category_" . (string)$category['category_id'], "folder" => true, "children" => $categories_recursive
                )));
            }
        }

        if (!$sortOrder) {
            $categoryNode->sort();
        }

        return $categoryNode->render();
    }

    public function getCategoryAttributeTree()
    { // Category_attribute_tree
        $language_id = isset($this->request->get['language_id']) ? $this->request->get['language_id'] : $this->config->get('config_language_id');
        $sortOrder = isset($this->request->get['sortOrder']) ? filter_var($this->request->get['sortOrder'], FILTER_VALIDATE_BOOLEAN) : true;
        $key = isset($this->request->get['category_id']) ? explode("_", $this->request->get['category_id']) : array('0', '0');

        if (isset($this->session->data['a_debug_mode'])) {
            $this->debug_mode = $this->session->data['a_debug_mode'];
        }

        $tree = isset($this->request->get['tree']) ? $this->request->get['tree'] : '1';
        if ($this->config->get('attributico_children')) {
            $settings = unserialize($this->config->get('attributico_children'));
        } else {
            $settings = array(
                '1' => array("template", "value"),
                '2' => array("duty"),
                '3' => array("duty"),
                '4' => array("template", "value"),
                '5' => array("template", "value"),
            );
        }
        $children = array(
            "template" => isset($settings[$tree]) ? in_array("template", $settings[$tree]) : false,
            "value" => isset($settings[$tree]) ? in_array("value", $settings[$tree]) : false,
            "duty" => isset($settings[$tree]) ? in_array("duty", $settings[$tree]) : false
        );


        if ($key[0] == 'category') {
            $category_id = $key[1];
        } else {
            $category_id = '0';
        }
        //   $language = $this->getLanguage($language_id);

        $this->load->model('catalog/attributico');

        $rootData = array("title" => $this->session->data['error_not_category'][$language_id]);

        $filter_data = array(
            'category_id' => (int)$category_id,
            'language_id' => (int)$language_id,
            'sort' => $sortOrder ? 'sort_attribute_group, a.sort_order' : ''
        );

        $attributeNode = new Node();
        if (is_numeric($category_id) && $category_id !== '0') {
            $categoryAttributes = $this->model_catalog_attributico->getCategoryAttributes($filter_data);
            $category_description = $this->model_catalog_attributico->getCategoryDescriptions($category_id);
            foreach ($categoryAttributes as $attribute) {
                $attribute_group = $this->model_catalog_attributico->getAttributeGroup($attribute['attribute_id'], $language_id);
                $dutyNode = new Node(array("title" => $attribute['duty'], "key" => "duty_" . (string)$attribute['attribute_id'], "extraClasses" => "custom1", ));
                $templateNode = new Node(array(
                    "title" => $this->session->data['entry_attribute_template'][$language_id], "unselectable" => true,
                    "key" => "template_" . (string)$attribute['attribute_id'], "lazy" => true,
                ));
                $valueNode = new Node(array(
                    "title" => $this->session->data['entry_attribute_values'][$language_id], "unselectable" => true,
                    "key" => "value_" . (string)$attribute['attribute_id'], "lazy" => true,
                ));
                $childNode = new Node();

                if ($children['duty']) {
                    $childNode->addSibling($dutyNode);
                }
                if ($children['template']) {
                    $childNode->addSibling($templateNode);
                }
                if ($children['value']) {
                    $childNode->addSibling($valueNode);
                }

                $debug_attribute = $this->debug_mode ? " (id=" . $attribute['attribute_id'] . ")" : '';
                $attributeNode->addSibling(new Node(array(
                    "title" => $attribute['attribute_description'] . ' (' . $attribute_group['name'] . ')' . $debug_attribute,
                    "key" => "attribute_" . (string)$attribute['attribute_id'], "children" => $childNode->render()
                )));
            }

            if (!$sortOrder) {
                $attributeNode->sort();
            }

            $rootData = array(
                "title" => $this->session->data['entry_attributes'][$language_id] . ' (' . $category_description[(int)$language_id]['name'] . ')',
                "folder" => true,
                "expanded" => true,
                "children" => $attributeNode->render(),
                "key" => "category_" . (string)$category_id,
            );
        }

        $CategoryAttributeTree = new Tree(new Node($rootData));

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($CategoryAttributeTree->render()));
    }

    //------------------------------------------------ProductTree-------------------------------------------------------
    public function getProductTree() {
        $language_id = isset($this->request->get['language_id']) ? $this->request->get['language_id'] : $this->config->get('config_language_id');
        $key = isset($this->request->get['attribute_id']) ? explode("_", $this->request->get['attribute_id']) : array('0', '0');
        $title = isset($this->request->get['title']) ? htmlspecialchars_decode($this->request->get['title']) : '';
        $invert = isset($this->request->get['invert']) ? filter_var($this->request->get['invert'], FILTER_VALIDATE_BOOLEAN) : false;

        if (($key[0] == 'template' || $key[0] == 'value' || $key[0] == 'duty') && $invert) {
            $invert = false;
            $diver = true;
        } else {
            $diver = false;
        }

        if (isset($this->session->data['a_debug_mode'])) {
            $this->debug_mode = $this->session->data['a_debug_mode'];
        }

        if ($key[0] == 'attribute' || $key[0] == 'template' || $key[0] == 'value' || $key[0] == 'duty') {
            $attribute_id = $key[1];
        } else {
            $attribute_id = '0';
        }

        $non_hierarchical = true;
        $rootData = array("title" => $this->session->data['error_not_attribute'][$language_id]);

        $this->load->model('catalog/attributico');
        $all_categories = $this->model_catalog_attributico->getAllCategories($non_hierarchical);
        $sort_order = array();

        foreach ($all_categories as $k => $value) {
            $sort_order[$k] = $value['name'];
        }

        array_multisort($sort_order, SORT_ASC, $all_categories);

        $attribute_descriptions = $this->model_catalog_attributico->getAttributeDescriptions($attribute_id);

        if (is_numeric($attribute_id) && $attribute_id !== '0') {
            $categoryNode = new Node();
            foreach ($all_categories as $category) {
                $productNode = new Node();
                $category_id = $category['category_id'];
                $products = $this->model_catalog_attributico->getProductsByAttribute($category_id, $attribute_id, $language_id, $invert);
                foreach ($products as $product) {
                    $debug_category = $this->debug_mode ? " (cat=" . $product['category_id'] . ")" : '';
                    //  $childNode = new Node();
                    $product_item = new Node(array(
                        "title" => $product['product_name'] . ' (id=' . $product['product_id'] . ', model=' . $product['model'] . ')' . $debug_category,
                        "key" => "product_" . (string) $product['product_id'],
                        "extraClasses" => "custom2"
                    ));
                    if (!$diver) {
                        switch ($key[0]) {
                            case 'template':
                            case 'duty':
                                if ($product['text'] == $title) {
                                    $productNode->addSibling($product_item);
                                }
                                break;
                            case 'value':
                                if (stripos($product['text'], $title) !== false) {
                                    $productNode->addSibling($product_item);
                                }
                                break;
                            default:
                                $productNode->addSibling($product_item);
                        }
                    } else {
                        switch ($key[0]) {
                            case 'template':
                            case 'duty':
                                if ($product['text'] != $title) {
                                    $productNode->addSibling($product_item);
                                }
                                break;
                            case 'value':
                                if (stripos($product['text'], $title) === false) {
                                    $productNode->addSibling($product_item);
                                }
                                break;
                            default:
                                $productNode->addSibling($product_item);
                        }
                    }
                }

                $debug_category = $this->debug_mode ? " (id=" . $category['category_id'] . ")" : '';
                if ($productNode->nodeData) {
                    $categoryNode->addSibling(new Node(array(
                        "title" => $category['name'] . $debug_category,
                        "key" => "category_" . (string) $category['category_id'],
                        "folder" => $diver || $invert ? false : true,
                        "extraClasses" => $diver || $invert ? "custom4" : "",
                        "children" => $productNode->render()
                    )));
                }
            }

            $debug_attribute = $this->debug_mode ? " (id=" . $attribute_id . ")" : '';
            $rootData = array(
                "title" => $this->session->data['entry_products'][$language_id] . ' (' . $attribute_descriptions[(int) $language_id]['name'] . ')' . $debug_attribute,
                "folder" => $diver || $invert ? false : true,
                "extraClasses" => $diver || $invert ? "custom4" : "",
                "expanded" => true,
                "children" => $categoryNode->render(),
                "key" => "attribute_" . (string) $attribute_id,
            );
        }

        $ProductTree = new Tree(new Node($rootData));
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($ProductTree->render()));
    }

    // ----------------------- The end of getTree functions ------------------------
    public function editAttribute()
    {
        $data = array();
        $language_id = isset($this->request->get['language_id']) ? $this->request->get['language_id'] : $this->config->get('config_language_id');
        $name = isset($this->request->get['name']) ? htmlspecialchars_decode($this->request->get['name']) : '';
        $key = isset($this->request->get['key']) ? explode("_", $this->request->get['key']) : array('0', '0');
        $splitter = !($this->config->get('attributico_splitter') == '') ? $this->config->get('attributico_splitter') : '/';

        $this->load->model('catalog/attributico');

        if ($this->session->data['free']) {
            $acceptedTitle["acceptedTitle"] = $name;
            $this->response->addHeader('Content-Type: application/json');
            $this->response->setOutput(json_encode($acceptedTitle));
            return;
        }

        if ($key[0] == 'group') {
            $attribute_group_id = $key[1];
            $data['attribute_group_description'][$language_id]['name'] = $name;
            $this->model_catalog_attributico->editAttributeGroup($attribute_group_id, $data);
        }

        if ($key[0] == 'attribute') {
            $attribute_id = $key[1];
            $data['attribute_description'][$language_id]['name'] = $name;
            $this->model_catalog_attributico->editAttribute($attribute_id, $data);
        }

        if ($key[0] == 'template') {
            $attribute_id = $key[1];
            $data['language_id'] = $language_id;
            $data['oldtext'] = isset($this->request->get['oldname']) ? htmlspecialchars_decode($this->request->get['oldname']) : '';
            $data['newtext'] = trim($name, $splitter);
            $this->model_catalog_attributico->editAttributeTemplates($attribute_id, $data);
        }

        if ($key[0] == 'value') {
            $attribute_id = $key[1];
            $data['language_id'] = $language_id;
            $data['oldtext'] = isset($this->request->get['oldname']) ? htmlspecialchars_decode($this->request->get['oldname']) : '';
            $data['newtext'] = trim($name, $splitter);
            $this->model_catalog_attributico->editAttributeValues($attribute_id, $data);
        }

        if ($key[0] == 'duty') {
            $attribute_id = $key[1];
            $data['attribute_description'][$language_id]['duty'] = $name;
            $this->model_catalog_attributico->editDuty($attribute_id, $data);
        }

        $acceptedTitle["acceptedTitle"] = $name;
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($acceptedTitle));
    }

    public function addAttribute()
    {
        $data = array();
        $name = isset($this->request->get['name']) ? $this->request->get['name'] : array('0', '0');
        $key = isset($this->request->get['key']) ? explode("_", $this->request->get['key']) : array('0', '0');
        $attribute_group_id = '';

        if ($key[0] == 'group') {
            $attribute_group_id = $key[1];
        }
        if ($this->session->data['free']) {
            return 0;
        }

        $languages = $this->session->data['languages'];
        $data['sort_order'] = '';
        $this->load->model('catalog/attributico');
        $this->cache->delete('attributico');

        if ($attribute_group_id) {
            $data['attribute_group_id'] = $attribute_group_id;
            foreach ($languages as $language) {
                $data['attribute_description'][$language['language_id']]['name'] = $name[$language['language_id']];
            }
            $id = $this->model_catalog_attributico->addAttribute($data);
        } else {
            foreach ($languages as $language) {
                $data['attribute_group_description'][$language['language_id']]['name'] = $name[$language['language_id']];
            }
            $id = $this->model_catalog_attributico->addAttributeGroup($data);
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($id));
    }

    public function addAttributes()
    {
        $data = array();
        $target = isset($this->request->get['target']) ? explode("_", $this->request->get['target']) : array('0', '0');
        $attributes = isset($this->request->get['attributes']) ? $this->request->get['attributes'] : array('0', '0');
        $attribute_group_id = '';

        if ($target[0] == 'group') {
            $attribute_group_id = $target[1];
        }
        if ($this->session->data['free']) {
            return 0;
        }

        $languages = $this->session->data['languages'];
        $data['sort_order'] = '';
        $this->load->model('catalog/attributico');
        $this->cache->delete('attributico');

        foreach ($attributes as $attribute) {
            if ($attribute_group_id) {
                $data['attribute_group_id'] = $attribute_group_id;
                foreach ($languages as $language) {
                    $data['attribute_description'][$language['language_id']]['name'] = $attribute[$language['language_id']];
                }
                $id = $this->model_catalog_attributico->addAttribute($data);
            }
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($id));
    }

    public function deleteAttributes()
    {
        $data = array();
        $keys = isset($this->request->get['keys']) ? $this->request->get['keys'] : array('0', '0');
        $titles = isset($this->request->get['titles']) ? $this->request->get['titles'] : array('', '');
        $language_id = isset($this->request->get['language_id']) ? $this->request->get['language_id'] : $this->config->get('config_language_id');

        $combine = array_combine ( $keys, $titles );

        foreach ($combine as $key => $value) {
            $d = explode("_", $key);
            if ($d[0] == 'group') {
                $data['group'][] = $d[1];
            }
            if ($d[0] == 'attribute') {
                $data['attribute'][] = $d[1];
            }
            if ($d[0] == 'template') {
                $data['template'][] = ['attribute_id'=>$d[1], 'value'=>$value];
            }
            if ($d[0] == 'value') {
                $data['value'][] = ['attribute_id'=>$d[1], 'value'=>$value];
            }
        }

        if ($this->session->data['free']) {
            return;
        }

        $this->load->model('catalog/attributico');
        $this->model_catalog_attributico->deleteAttributeGroups($data);
        $this->model_catalog_attributico->deleteAttributes($data);
        $this->model_catalog_attributico->deleteValues($data, $language_id);
    }

    public function replaceAttributeGroup()
    {
        $attribute_group_id = '';
        $target = isset($this->request->get['target']) ? explode("_", $this->request->get['target']) : array('0', '0');
        $subjects = isset($this->request->get['subjects']) ? $this->request->get['subjects'] : array();
        $group = isset($this->request->get['group']) ? explode("_", $this->request->get['group']) : array();

        $this->load->model('catalog/attributico');

        if ($target[0] == 'group') {
            $attribute_group_id = $target[1];
        } elseif ($target[0] == 'attribute' && $group[0] == 'group') {
            $attribute_group_id = $group[1];
        }

        if ($attribute_group_id) {
            $this->cache->delete('attributico');
            foreach ($subjects as $subject) {
                $attribute_id = explode("_", $subject);
                $this->model_catalog_attributico->replaceAttributeGroup($attribute_id[1], $attribute_group_id);
            }
        }
    }

    public function sortAttributeGroup()
    {
        $data = array();
        $target = isset($this->request->get['target']) ? explode("_", $this->request->get['target']) : array('0', '0');
        $direct = isset($this->request->get['direct']) ? $this->request->get['direct'] : "before";
        $subjects = isset($this->request->get['subjects']) ? $this->request->get['subjects'] : array('0', '0');

        $data['target_id'] = $target[1];
        $data['direct'] = $direct;
        foreach ($subjects as $subject) {
            $subject_id = explode("_", $subject);
            $data['subject_id'][] = $subject_id[1];
        }

        $this->load->model('catalog/attributico');

        if ($target[0] == 'group') {
            $this->model_catalog_attributico->sortAttributeGroup($data);
        }
        if ($target[0] == 'attribute') {
            $this->model_catalog_attributico->sortAttribute($data);
        }
    }

    public function mergeAttributeGroup()
    {
        $target = isset($this->request->get['target']) ? explode("_", $this->request->get['target']) : array('0', '0');
        $subjects = isset($this->request->get['subjects']) ? $this->request->get['subjects'] : array('0', '0');

        if ($this->session->data['free']) {
            return;
        }
        if ($target[0] == 'group') {
            $this->load->model('catalog/attributico');
            $attribute_group_id = $target[1];
            $this->cache->delete('attributico');
            foreach ($subjects as $subject) {
                $attribute_id = explode("_", $subject);
                if ($attribute_id[0] == 'attribute') {
                    $this->model_catalog_attributico->replaceAttributeGroup($attribute_id[1], $attribute_group_id);
                }
                if ($attribute_id[0] == 'group') {
                    $filter_data = array(
                        'filter_attribute_group_id' => (int)$attribute_id[1],
                    );
                    $attributes = $this->model_catalog_attributico->getAttributes($filter_data);
                    foreach ($attributes as $attribute) {
                        $this->model_catalog_attributico->replaceAttributeGroup($attribute['attribute_id'], $attribute_group_id);
                    }
                    $this->model_catalog_attributico->deleteAttributeGroup($attribute_id[1]);
                }
            }
        }
        if ($target[0] == 'attribute') {
            $this->load->model('catalog/attributico_tools');
            $this->cache->delete('attributico');
            foreach ($subjects as $subject) {
                $subject_id = explode("_", $subject);
                $this->model_catalog_attributico_tools->mergeAttribute($target[1], $subject_id[1]);
            }
        }
    }

    public function addCategoryAttributes()
    {
        $data = array();
        $sub_categories = array();

        $category_id = isset($this->request->post['category_id']) ? explode("_", $this->request->post['category_id'])[1] : '0';
        $attributes = isset($this->request->post['attributes']) ? $this->request->post['attributes'] : array();
        $categoryList = isset($this->request->post['categories']) ? $this->request->post['categories'] : array();
        $subCategory = $this->config->get('attributico_autoadd_subcategory');
        $multistore = isset($this->request->get['multistore']) ? filter_var($this->request->get['multistore'], FILTER_VALIDATE_BOOLEAN) : $this->config->get('attributico_multistore');

        $this->config->set('attributico_multistore', (string)$multistore);

        if ($this->session->data['free']) {
            return 0;
        }

        if (is_array($attributes)) {
            foreach ($attributes as $attribute) {
                $data['category_attribute'][] = explode("_", $attribute)[1];
            }
        } else {
            $data['category_attribute'][] = explode("_", $attributes)[1];
        }

        $this->load->model('catalog/attributico');
        $all_categories = $this->model_catalog_attributico->getAllCategories();

        if (is_numeric($category_id) && $category_id !== '0') {
            $categories = array((int)$category_id);

            if ($categoryList) {
                foreach ($categoryList as $category) {
                    $categories[] = (int)explode("_", $category)[1];
                }
            } elseif ($subCategory) {
                $sub_categories = $this->getsubCategories($all_categories, $category_id);
                $array_iterator = new RecursiveIteratorIterator(new RecursiveArrayIterator($sub_categories), RecursiveIteratorIterator::SELF_FIRST);
                foreach ($array_iterator as $key => $value) {
                    $categories[] = $key;
                }
            }

            $this->cache->delete('attributico');

            $languages = $this->session->data['languages'];
            foreach ($categories as $CategoryId) {
                if ($this->config->get('attributico_autoadd')) {
                    $category_products = $this->model_catalog_attributico->getProductsByCategoryId($CategoryId);
                    $this->model_catalog_attributico->addCategoryAttributesToProducts($category_products, $data, $languages);
                }
                $this->model_catalog_attributico->addCategoryAttributes($CategoryId, $data);
            }
        }
    }

    public function deleteAttributesFromCategory()
    {
        $data = array();
        $category_id = isset($this->request->post['category_id']) ? explode("_", $this->request->post['category_id'])[1] : '0';
        $attributes = isset($this->request->post['attributes']) ? $this->request->post['attributes'] : array();
        $categoryList = isset($this->request->post['categories']) ? $this->request->post['categories'] : array();
        $subCategory = $this->config->get('attributico_autodel_subcategory');
        $multistore = isset($this->request->get['multistore']) ? filter_var($this->request->get['multistore'], FILTER_VALIDATE_BOOLEAN) : $this->config->get('attributico_multistore');

        $this->config->set('attributico_multistore', (string)$multistore);

        if ($this->session->data['free']) {
            return 0;
        }

        foreach ($attributes as $attribute) {
            $data['category_attribute'][] = explode("_", $attribute)[1];
        }
        if ($this->session->data['free']) {
            return;
        }

        $this->load->model('catalog/attributico');
        $all_categories = $this->model_catalog_attributico->getAllCategories();

        if (is_numeric($category_id) && $category_id !== '0') {
            $categories = array((int)$category_id);

            if ($categoryList) {
                foreach ($categoryList as $category) {
                    $categories[] = (int)explode("_", $category)[1];
                }
            } elseif ($subCategory) {
                $sub_categories = $this->getsubCategories($all_categories, $category_id);
                $array_iterator = new RecursiveIteratorIterator(new RecursiveArrayIterator($sub_categories), RecursiveIteratorIterator::SELF_FIRST);
                foreach ($array_iterator as $key => $value) {
                    $categories[] = $key;
                }
            }

            $this->cache->delete('attributico');
            foreach ($categories as $CategoryId) {
                if ($this->config->get('attributico_autodel')) {
                    $category_products = $this->model_catalog_attributico->getProductsByCategoryId($CategoryId);
                    $this->model_catalog_attributico->deleteCategoryAttributesFromProducts($category_products, $data);
                }
                $this->model_catalog_attributico->deleteAttributesFromCategory($CategoryId, $data);
            }
        }
    }

    private function getsubCategories($categories, $parent_id)
    {
        $sub_categories = array();
        if (array_key_exists($parent_id, $categories)) {
            foreach ($categories[$parent_id] as $category) {
                $sub_categories[$category['category_id']] = $this->getsubCategories($categories, $category['category_id']);
            }
        }
        return $sub_categories;
    }

    private function getLanguage($language_id)
    {
        $extension = version_compare(VERSION, '2.3.0', '>=') ? "extension/" : "";
        $directory = $this->getLanguageDirectory($language_id);
        $language = new Language($directory);
        $language->load($extension . 'module/attributico');
        return $language;
    }

    private function getLanguageDirectory($language_id)
    {
        $this->load->model('localisation/language');
        $languages = $this->model_localisation_language->getLanguages();

        foreach ($languages as $lang) {
            if ($lang['language_id'] == $language_id) {
                if (version_compare(VERSION, '2.2', '>') == true) {
                    return $lang['code'];
                } else {
                    return $lang['directory'];
                }
            }
        }
        return "english";
    }

    public function autocomplete()
    {
        $json = array();

        if (isset($this->request->get['filter_name'])) {
            $this->load->model('catalog/attributico');

            $filter_data = array(
                'filter_name' => $this->request->get['filter_name'],
                'start' => 0,
                'limit' => 10000
            );
            if (isset($this->request->get['language_id'])) {
                $filter_data['language_id'] = $this->request->get['language_id'];
            }

            $results = $this->model_catalog_attributico->getAttributes($filter_data);

            foreach ($results as $result) {
                $json[] = array(
                    'attribute_id' => $result['attribute_id'],
                    'name' => strip_tags(html_entity_decode($result['name'], ENT_QUOTES, 'UTF-8')),
                    'attribute_group' => $result['attribute_group']
                );
            }
        }

        $sort_order = array();

        foreach ($json as $key => $value) {
            $sort_order[$key] = $value['name'];
        }

        array_multisort($sort_order, SORT_ASC, $json);

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json));
    }

    public function install()
    {
        $this->db->query("CREATE TABLE IF NOT EXISTS " . DB_PREFIX . "category_attribute
		(`category_id` INTEGER(11) NOT NULL,`attribute_id` INTEGER(11) NOT NULL, PRIMARY KEY (`category_id`,`attribute_id`) USING BTREE)
		ENGINE=MyISAM ROW_FORMAT=FIXED CHARACTER SET 'utf8' COLLATE 'utf8_general_ci'");

        // $this->db->query("ALTER TABLE " . DB_PREFIX . "attribute_description ADD COLUMN IF NOT EXISTS `duty` TEXT NOT NULL");
        if (!$this->duty_check()) {
            $this->dutyUpgrade();
        }

        $data['attributico_splitter'] = '/';
        $data['attributico_cache'] = '1';
        $data['attributico_lazyload'] = '1';
        $data['attributico_children'] = 'a:5:{i:1;a:2:{i:0;s:8:"template";i:1;s:5:"value";}i:2;a:1:{i:0;s:4:"duty";}i:3;a:1:{i:0;s:4:"duty";}i:4;a:2:{i:0;s:8:"template";i:1;s:5:"value";}i:5;a:2:{i:0;s:8:"template";i:1;s:5:"value";}}';

        $this->load->model('setting/setting');
        $this->model_setting_setting->editSetting('attributico', $data);
    }

    public function uninstall()
    {
        $this->db->query("DROP TABLE IF EXISTS " . DB_PREFIX . "category_attribute");
        if ($this->duty_check()) {
            $this->db->query("ALTER TABLE " . DB_PREFIX . "attribute_description DROP COLUMN `duty`");
        }
        $this->cache->delete('attributico');
    }

    public function duty_check()
    {
        $query = $this->db->query("SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='" . DB_DATABASE . "' AND TABLE_NAME='" . DB_PREFIX . "attribute_description' AND COLUMN_NAME='duty'");
        return $query->row;
    }

    public function dutyUpgrade()
    {
        $this->db->query("ALTER TABLE " . DB_PREFIX . "attribute_description ADD COLUMN `duty` TEXT NOT NULL");
        return true;
    }

    // settings
    public function getChildrenSettings()
    {
        //   $extension = version_compare(VERSION, '2.3.0', '>=') ? "extension/" : "";
        $language_id = isset($this->request->get['language_id']) ? $this->request->get['language_id'] : $this->config->get('config_language_id');
        $tree = isset($this->request->get['tree']) ? $this->request->get['tree'] : '';

        // $language = $this->getLanguage($language_id);

        if ($this->config->get('attributico_children')) {
            $settings = unserialize($this->config->get('attributico_children'));
        } else {
            $settings = array(
                '1' => array("template", "value"),
                '2' => array("duty"),
                '3' => array("duty"),
                '4' => array("template", "value"),
                '5' => array("template", "value"),
            );
        }

        $rootData = array(
            "title" => $this->session->data['entry_attribute'][$language_id], "expanded" => true, "unselectable" => true, "checkbox" => false,
            "children" => array(
                array("title" => $this->session->data['entry_duty'][$language_id], "key" => "duty", "extraClasses" => "custom1", "selected" => isset($settings[$tree]) ? in_array("duty", $settings[$tree]) : false, ),
                array("title" => $this->session->data['entry_attribute_template'][$language_id], "key" => "template", "selected" => isset($settings[$tree]) ? in_array("template", $settings[$tree]) : false, ),
                array("title" => $this->session->data['entry_attribute_values'][$language_id], "key" => "value", "selected" => isset($settings[$tree]) ? in_array("value", $settings[$tree]) : false, ),
            ),
        );

        $childrens = new Tree(new Node($rootData));

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($childrens->render()));
    }

    public function setFilterSettings()
    {
        $this->load->model('setting/setting');

        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $children = array();
            $i = 1;
            while (isset($this->request->post['ft_' . $i])) {
                $children[$i] = $this->request->post['ft_' . $i];
                $i++;
            }
            $filter_settings['attributico_filter'] = serialize($this->request->post);
            $this->model_setting_setting->editSetting('attributico', $filter_settings);
        }
    }

    public function debugSwitch()
    {
        $this->cache->delete('attributico');
        $this->debug_mode = !$this->session->data['a_debug_mode'];
        $this->session->data['a_debug_mode'] = $this->debug_mode;
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($this->debug_mode));
    }

    //------------------------------------------------------ Tools ------------------------------------------
    public function tools()
    {
        $language = $this->getLanguage($this->config->get('config_language_id'));
        $task = isset($this->request->get['task']) ? $this->request->get['task'] : "";
        $task_result = $language->get('alert_success') . "  ";

        $options = array();
        if (isset($this->request->get['options'])) {
            parse_str(htmlspecialchars_decode($this->request->get['options']), $options);
        }

        if ($this->session->data['free']) {
            $this->response->addHeader('Content-Type: application/json');
            $this->response->setOutput(json_encode($language->get('error_free')));
            return;
        }

        $this->load->model('catalog/attributico_tools');
        $this->load->model('catalog/attributico');

        switch ($task) {
            case 'empty':
                $count_of_empty = $this->model_catalog_attributico_tools->deleteEmptyValues();
                $task_result .= $language->get('message_empty') . "  " . (string)$count_of_empty;
                break;
            case 'defrag':
                if (isset($options['tab-defrag-group'])) {
                    $count_of_defragmentation_group = $this->model_catalog_attributico_tools->defragmentation('attribute_group', 'attribute_group_id');
                    $task_result .= $language->get('message_defragmentation_group') . "  " . (string)$count_of_defragmentation_group . " ";
                }
                if (isset($options['tab-defrag-attribute'])) {
                    $count_of_defragmentation = $this->model_catalog_attributico_tools->defragmentation('attribute', 'attribute_id');
                    $task_result .= $language->get('message_defragmentation') . "  " . (string)$count_of_defragmentation;
                }
                break;
            case 'scavengery':
                $count_of_scavengery = $this->model_catalog_attributico_tools->scavengery();
                $task_result .= $language->get('message_scavengery') . "  " . (string)$count_of_scavengery;
                break;
            case 'detached':
                $count_of_detached = 0;
                if (isset($options['ft_6'])) {
                    foreach ($options['ft_6'] as $group) {
                        $group_id = explode("_", $group);
                        if ($group_id[0] == 'group') {
                            $count_of_detached = $this->model_catalog_attributico_tools->detached($group_id[1]);
                        }
                    }
                }
                $task_result .= $language->get('message_detached') . "  " . (string)$count_of_detached;
                break;
            case 'deduplicate':
                $count_of_duplicates = 0;
                if (isset($options['ft_7'])) {
                    foreach ($options['ft_7'] as $group) {
                        $group_id = explode("_", $group);
                        if ($group_id[0] == 'group') {
                            $count_of_duplicates += $this->model_catalog_attributico_tools->deduplicate($group_id[1]);
                        }
                    }
                }
                $task_result .= $language->get('message_duplicate') . "  " . (string)$count_of_duplicates;
                break;
            case 'createcategory':
                $count_of_categories = 0;
                $count_of_products = 0;
                $categories = array();
                /* $start_time = microtime(true); */
                if (isset($options['ft_8'])) {
                    foreach ($options['ft_8'] as $category) {
                        $categories[] = explode("_", $category)[1];
                    }
                    if (isset($options['tab-create-categories'])) {
                        $count_of_categories = $this->model_catalog_attributico_tools->createCategoryAttributes($categories);
                        $task_result .= $language->get('message_create_categories') . "  " . (string)$count_of_categories . "  ";
                    }
                    if (isset($options['tab-inject-to-products'])) {
                        $this->cache->delete('attributico');

                        foreach ($categories as $CategoryId) {
                            $count_of_products += $this->model_catalog_attributico_tools->addCategoryAttributesToProducts($CategoryId);
                        }
                        $task_result .= $language->get('message_inject_to_products') . "  " . (string)$count_of_products;
                        /*  $diff_time = microtime(true) - $start_time;
                        file_put_contents('attributico.txt', $diff_time, FILE_APPEND);
                        file_put_contents('attributico.txt', PHP_EOL, FILE_APPEND); */
                    }
                }
                break;
            case 'cache':

                $this->cache->delete('attributico');

                break;
            case 'standart':

                break;
        }
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($task_result));
    }

    public function check_for_updates()
    {

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http://servenus.com/check_for_updates.php');
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_FAILONERROR, true);

        $content = json_decode(curl_exec($ch));
        $err = curl_errno($ch);
        $errmsg = curl_error($ch);
        // $header = curl_getinfo($ch);
        curl_close($ch);

        $header['errno'] = $err;
        $header['errmsg'] = $errmsg;
        $header['content'] = $content;

        if (version_compare(MODULE_VERSION, $content->lastversion, '>=')) {
            $header['compare'] = 'OK!';
        } else {
            $header['compare'] = '';
        }

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($header));
    }

    public function cacheDelete()
    {

        $this->cache->delete('attributico');
    }
}

class ControllerExtensionModuleAttributico extends ControllerModuleAttributico
{ }
