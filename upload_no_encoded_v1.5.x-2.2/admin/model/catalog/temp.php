public function addCategoryAttributesToProducts($products, $data, $languages) {
        // in foreach
        set_time_limit(600);
        $method = $this->config->get('attributico_product_text');
        $count_affected = 0;
        foreach ($products as $product) {
            $text = $method == '2' ? "'" : "', text = '' ";
            if (isset($data['category_attribute'])) {
                foreach ($data['category_attribute'] as $attribute_id) {
                    foreach ($languages as $language) {
                        if ($method == '3' || $method == '4') {
                            $duty = $this->whoisOnDuty($attribute_id, $language);
                            $text = $duty ? "', text = '" . $duty . "' " : "'";
                        }
                        if ($method == '4') {
                            $query = $this->db->query("SELECT text FROM " . DB_PREFIX . "product_attribute WHERE product_id = '" . (int) $product['product_id'] . "' AND attribute_id = '" . (int) $attribute_id . "'  AND language_id = '" . (int) $language['language_id'] . "'");
                            if (!empty($query->row['text'])) {
                                $text = "'";
                            }
                        }
                        $this->db->query("INSERT INTO " . DB_PREFIX . "product_attribute SET product_id = '" . (int) $product['product_id'] . "', attribute_id = '" . (int) $attribute_id . "', language_id = '" . (int) $language['language_id'] . $text
                                . "ON DUPLICATE KEY UPDATE  product_id = '" . (int) $product['product_id'] . "', attribute_id = '" . (int) $attribute_id . "', language_id = '" . (int) $language['language_id'] . $text);

                        $count_affected += $this->db->countAffected();
                    }
                }
            }
        }
        return $count_affected;
    }