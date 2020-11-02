public function getServPanel(){

$extension = version_compare(VERSION, '2.3.0', '>=') ? "extension/" : "";

if (version_compare(VERSION, '2.2.0', '>=')) {
    $this->load->language($extension . 'module/attributico');           
} else {
    $this->language->load('module/attributico');            
}

$labels  = "<label class='radio-inline'>
<input type='radio' name='filter-values' id='filter-nofilter' value='all' checked>" . $this->language->get('entry_flter_all') . "</label>";
$labels .= "<label class='radio-inline'>
<input type='radio' name='filter-values' id='filter-category' value='categories'>" . $this->language->get('entry_flter_category') . "</label>";
$labels .= "<label class='radio-inline style='margin-right:5px;''>
<input type='radio' name='filter-values' id='filter-duty' value='duty'>" . $this->language->get('entry_flter_duty') . "</label>";
/* $labels .= "<label class='radio-inline'></label>"; */
                
$buttons  = "<div class='btn-group' style='margin-left:5px;'>";
$buttons .= "<button type='button' id='template-view' class='btn btn-default'><i class='fa fa-th-list'></i>" . $this->language->get('entry_attribute_template') . "</button>";   
$buttons .= "<button type='button' id='values-view' class='btn btn-default'><i class='fa fa-th'></i>" . $this->language->get('entry_attribute_values') . "</button>"; 
$buttons .= "</div>";

$select = "<select class='form-control' id='method-view' style='margin-left:2px; font-weight:normal; width:25%'>";
$option_style =  "overflow:hidden; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;";
$method = $this->config->get('attributico_product_text');
$options  = "<option ". ($method =='1' ? "selected ":"") . "value='1' style=". $option_style . ">" . $this->language->get('text_clear') . "</option>";
$options .= "<option ". ($method =='2' ? "selected ":"") . "value='2' style=". $option_style . ">" . $this->language->get('text_keep') . "</option>";
$options .= "<option ". ($method =='3' ? "selected ":"") . "value='3' style=". $option_style . ">" . $this->language->get('text_duty') . "</option>";
$options .= "<option ". ($method =='4' ? "selected ":"") . "value='4' style=". $option_style . ">" . $this->language->get('text_duty_only') . "</option>";

$select .= $options;
$select .= "</select>";

$splitter = !($this->config->get('attributico_splitter') == '') ? $this->config->get('attributico_splitter') : '/';
$attributico_autoadd = $this->config->get('attributico_autoadd') ? $this->config->get('attributico_autoadd') : 0;

$json = ['serv_panel' => $labels . $buttons . $select, 'splitter'=>quotemeta($splitter), 'attributico_autoadd'=>$attributico_autoadd, 'extension'=>$extension];

$this->response->addHeader('Content-Type: application/json');
$this->response->setOutput(json_encode($json));
}