<?php

require_once(DIR_SYSTEM . 'library/attributico/array_column.php');

class ModelCatalogAttributicoTools extends Model {

    public function deleteEmptyValues() {
        $this->cache->delete('attributico');
        $this->db->query("DELETE FROM " . DB_PREFIX . "product_attribute WHERE TRIM(text) LIKE ''");
        return $this->db->countAffected();
    }

    public function defragmentation($basetable, $field) {
        $this->cache->delete('attributico');
        $schema = array();
        $this->db->query("DROP TABLE IF EXISTS " . DB_PREFIX . $basetable . "_relation");

        $query = $this->db->query("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='" . DB_DATABASE . "' AND COLUMN_NAME ='" . $field . "'");
        foreach ($query->rows as $row) {
            if (!in_array(DB_PREFIX . $basetable, $row)) {
                $schema[] = $row;
            }
        }

        $this->db->query("CREATE TABLE " . DB_PREFIX . $basetable . "_relation (`new_id` INTEGER(11) NOT NULL AUTO_INCREMENT, " . $field .
                " INTEGER NOT NULL, PRIMARY KEY (`new_id`))");
        $this->db->query("INSERT INTO " . DB_PREFIX . $basetable . "_relation (" . $field . ") SELECT " . $field . " FROM " . DB_PREFIX . $basetable);
        $count_of_defrag = $this->db->countAffected();

        foreach ($schema as $table) {
            $this->db->query("UPDATE IGNORE " . $table['TABLE_NAME'] . " t, " . DB_PREFIX . $basetable . "_relation tr SET t." . $field . " = tr.new_id
                            WHERE t." . $field . " = tr." . $field);
        }

        $this->db->query("ALTER TABLE " . DB_PREFIX . $basetable . " MODIFY " . $field . " INT(11)");
        $this->db->query("ALTER TABLE " . DB_PREFIX . $basetable . " DROP PRIMARY KEY");
        $this->db->query("UPDATE " . DB_PREFIX . $basetable . " SET " . $field . "='0'");
        $this->db->query("ALTER TABLE " . DB_PREFIX . $basetable . " AUTO_INCREMENT=0");
        $this->db->query("ALTER TABLE " . DB_PREFIX . $basetable . " MODIFY " . $field . " INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY");

        return $count_of_defrag;
    }

    public function scavengery() {

        $categoryAttributes = $this->db->query("SELECT * FROM " . DB_PREFIX . "category_attribute");
        $count_of_scavengery = 0;
        foreach ($categoryAttributes->rows as $attribute) {
            $attr = $this->db->query("SELECT * FROM " . DB_PREFIX . "attribute WHERE `attribute_id` = '" . (int) $attribute['attribute_id'] . "'");
            if (!$attr->row) {
                $this->db->query("DELETE FROM " . DB_PREFIX . "category_attribute WHERE attribute_id = '" . (int) $attribute['attribute_id'] . "'");
                $count_of_scavengery++;
            }
        }
        return $count_of_scavengery;
    }

    public function detached($attribute_group_id = 0, $attributes = array()) {
        set_time_limit(600);
        $this->cache->delete('attributico');
        $sql_group = $attribute_group_id !== 0 ? " WHERE attribute_group_id =" . (int) $attribute_group_id : "";
        $sql_attributes = $attributes ? " AND attribute_id IN (" . implode(",", $attributes) . ")" : "";
        $all_attributes = $this->db->query("SELECT * FROM " . DB_PREFIX . "attribute" . $sql_group . $sql_attributes);
        $count_of_detached = 0;

        foreach ($all_attributes->rows as $attribute) {
            $attr = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_attribute WHERE `attribute_id` = '" . (int) $attribute['attribute_id'] . "'");
            if (!$attr->row) {
                $this->db->query("DELETE FROM " . DB_PREFIX . "category_attribute WHERE attribute_id = '" . (int) $attribute['attribute_id'] . "'");
                $this->db->query("DELETE FROM " . DB_PREFIX . "attribute WHERE attribute_id = '" . (int) $attribute['attribute_id'] . "'");
                $this->db->query("DELETE FROM " . DB_PREFIX . "attribute_description WHERE attribute_id = '" . (int) $attribute['attribute_id'] . "'");
                $count_of_detached++;
            }
        }
        return $count_of_detached;
    }

    private function createHoldkeys($attribute_group_id) {
        // Create holdkeys of duplicates of attributes names (создается таблица образцов дубликатов имен в данной группе, id-шники берутся от первого по ходу атрибута)
        $this->db->query("DROP TABLE IF EXISTS " . DB_PREFIX . "holdkeys");
        $this->db->query("CREATE TABLE IF NOT EXISTS " . DB_PREFIX . "holdkeys
                          SELECT a.attribute_id, `ad`.`language_id`, `ad`.`name`, count(*)
                          FROM " . DB_PREFIX . "attribute a LEFT JOIN " . DB_PREFIX . "attribute_description ad ON (a.attribute_id = ad.attribute_id)
                          WHERE a.`attribute_group_id` = '" . (int) $attribute_group_id . "' GROUP BY `ad`.`name`, `ad`.`language_id` HAVING count(*)>1  ORDER BY a.attribute_id");
        return;
    }

    private function getLostkeys($attribute_group_id) {
        // Create lostkeys of duplicates
        $lostkeys = $this->db->query("SELECT  `ad1`.`attribute_id` FROM  " . DB_PREFIX . "attribute_description ad1
                                        LEFT JOIN  " . DB_PREFIX . "attribute a1 ON (a1.attribute_id = ad1.attribute_id)
                                        WHERE `ad1`.`name` IN
                                       (SELECT `hk`.`name` FROM " . DB_PREFIX . "holdkeys hk ORDER BY hk.attribute_id) AND a1.`attribute_group_id` = '" . (int) $attribute_group_id . "'
                                        AND `ad1`.`attribute_id`  NOT IN (SELECT hk1.attribute_id FROM  " . DB_PREFIX . "holdkeys hk1)
                                        ORDER BY `ad1`.`attribute_id`");
        return $lostkeys->rows;
    }

    private function getLostdups($attribute_group_id, $lostkeys = array()) {
        $sql_lost = $lostkeys ? " (" . implode(",", $lostkeys) . ")" : "(SELECT `ad1`.`attribute_id` FROM  " . DB_PREFIX . "attribute_description ad1
									LEFT JOIN " . DB_PREFIX . "attribute a1 ON (a1.attribute_id = ad1.attribute_id) WHERE `ad1`.`name` IN
									(SELECT `hk`.`name` FROM " . DB_PREFIX . "holdkeys hk) AND a1.`attribute_group_id` = '" . (int) $attribute_group_id . "')
									AND `pa`.`attribute_id` NOT IN (SELECT hk1.attribute_id FROM  " . DB_PREFIX . "holdkeys hk1)";
        // Get lost of duplicates
        $lostdups = $this->db->query("SELECT product_id, pa.attribute_id, pa.language_id, pa.text, ad2.name FROM  " . DB_PREFIX . "product_attribute pa LEFT JOIN " . DB_PREFIX . "attribute_description ad2
                                            ON (pa.attribute_id = ad2.attribute_id AND `pa`.`language_id`= `ad2`.`language_id`) WHERE `pa`.`attribute_id` IN " . $sql_lost .
                " ORDER BY `pa`.product_id, `pa`.`attribute_id`, `pa`.`language_id`, `ad2`.`name`");
        return $lostdups->rows;
    }

    public function deduplicate($attribute_group_id) {
        set_time_limit(600);
        $this->cache->delete('attributico');
        //  $start_time = microtime(true);
        $splitter = !($this->config->get('attributico_splitter') == '') ? $this->config->get('attributico_splitter') : '/';
        // First step - concatination duplicates of not equal product_id. (if is not products for this attribute) Simple replace attribute_id.
        $this->createHoldkeys($attribute_group_id);
        $holdkeys = $this->db->query("SELECT * FROM " . DB_PREFIX . "holdkeys");
        $count_of_duplicates = $holdkeys->num_rows;
        $lostkeys = $this->getLostkeys($attribute_group_id);
        $lostdups = $this->getLostdups($attribute_group_id, array_unique(array_column($lostkeys, 'attribute_id')));
        foreach ($holdkeys->rows as $holdkey) {
            foreach ($lostdups as $lostdup) {
                if ($lostdup['attribute_id'] !== $holdkey['attribute_id'] && $lostdup['language_id'] == $holdkey['language_id'] && $lostdup['name'] == $holdkey['name']) {
                    $this->db->query("UPDATE IGNORE " . DB_PREFIX . "product_attribute SET attribute_id = '" . (int) $holdkey['attribute_id'] . "' WHERE product_id = '" . (int) $lostdup['product_id'] .
                            "' AND attribute_id = '" . (int) $lostdup['attribute_id'] . "' AND language_id = '" . (int) $lostdup['language_id'] . "'");
                    $this->db->query("UPDATE IGNORE " . DB_PREFIX . "category_attribute SET attribute_id = '" . (int) $holdkey['attribute_id'] . "' WHERE attribute_id = '" . (int) $lostdup['attribute_id'] . "'");
                }
            }
        }
        if ($lostkeys) {
            $this->detached($attribute_group_id, array_unique(array_column($lostkeys, 'attribute_id')));
        }
        // Second step - concat duplicates for equal product_id, Where product_id set as duplicate key.
        $this->createHoldkeys($attribute_group_id);
        $holdkeys = $this->db->query("SELECT * FROM " . DB_PREFIX . "holdkeys");
        $lostkeys = $this->getLostkeys($attribute_group_id);
        $lostdups = $this->getLostdups($attribute_group_id, array_unique(array_column($lostkeys, 'attribute_id')));
        foreach ($holdkeys->rows as $holdkey) {
            foreach ($lostdups as $lostdup) {
                $holddups = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_attribute WHERE product_id = '" . (int) $lostdup['product_id'] . "' AND attribute_id = '" . (int) $holdkey['attribute_id'] . "'
				                              AND language_id = '" . (int) $holdkey['language_id'] . "'");
                $holddup = $holddups->row;
                if ($holddup) {
                    $text = trim($holddup['text']);
                    $splitter_add = $text !== '' && $lostdup['text'] !== '' ? $splitter : '';
                    $text .= $splitter_add . trim($lostdup['text']);
                    $elements = explode($splitter, $text);
                    $values = array_unique($elements);
                    array_multisort($values);
                    $text = implode($splitter, $values);
                    //update remining
                    $this->db->query("UPDATE " . DB_PREFIX . "product_attribute SET text = '" . $this->db->escape($text) . "' WHERE product_id = '" . (int) $holddup['product_id'] .
                            "' AND attribute_id = '" . (int) $holddup['attribute_id'] . "' AND language_id = '" . (int) $holddup['language_id'] . "'");
                    // delete lost
                    $this->db->query("DELETE FROM " . DB_PREFIX . "product_attribute  WHERE product_id = '" . (int) $lostdup['product_id'] .
                            "' AND attribute_id = '" . (int) $lostdup['attribute_id'] . "' AND language_id = '" . (int) $lostdup['language_id'] . "'");
                    $this->db->query("UPDATE IGNORE " . DB_PREFIX . "category_attribute SET attribute_id = '" . (int) $holddup['attribute_id'] . "' WHERE attribute_id = '" . (int) $lostdup['attribute_id'] . "'");
                }
            }
        }
        if ($lostkeys) {
            $this->detached($attribute_group_id, array_unique(array_column($lostkeys, 'attribute_id')));
        }
        // $diff_time = microtime(true) - $start_time;
        //file_put_contents('attributico.txt', $diff_time, FILE_APPEND);
        // file_put_contents('attributico.txt', PHP_EOL, FILE_APPEND);
        return $count_of_duplicates;
    }

    public function mergeAttribute($target_id, $subject_id) {
        // in foreach
        $splitter = !($this->config->get('attributico_splitter') == '') ? $this->config->get('attributico_splitter') : '/';

        $subjects = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_attribute WHERE attribute_id = '" . (int) $subject_id . "'");
        foreach ($subjects->rows as $subject) {
            $dups = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_attribute WHERE product_id = '" . (int) $subject['product_id'] . "' AND attribute_id = '" . (int) $target_id .
                    "' AND language_id = '" . (int) $subject['language_id'] . "'");
            $dup = $dups->row; // perfect potentional dublicate - to-be error of keys sql, change attribute_id impossible
            if ($dup) {
                $text = trim($dup['text']); // it is the target text
                $splitter_add = $text !== '' && $subject['text'] !== '' ? $splitter : '';
                $text .= $splitter_add . trim($subject['text']); // add subject text
                $elements = explode($splitter, $text);
                $values = array_unique($elements);
                array_multisort($values);
                $text = implode($splitter, $values);
                //update remining
                $this->db->query("UPDATE " . DB_PREFIX . "product_attribute SET text = '" . $this->db->escape($text) . "' WHERE product_id = '" . (int) $dup['product_id'] .
                        "' AND attribute_id = '" . (int) $target_id . "' AND language_id = '" . (int) $dup['language_id'] . "'");
            } else { // this product not have in this attribute, then only change attribute_id
                $this->db->query("UPDATE IGNORE " . DB_PREFIX . "product_attribute SET attribute_id = '" . (int) $target_id . "' WHERE product_id = '" . (int) $subject['product_id'] .
                        "' AND attribute_id = '" . (int) $subject_id . "' AND language_id = '" . (int) $subject['language_id'] . "'");
            }

            // delete old product references to subject_id
            $this->db->query("DELETE FROM " . DB_PREFIX . "product_attribute  WHERE product_id = '" . (int) $subject['product_id'] .
                    "' AND attribute_id = '" . (int) $subject_id . "' AND language_id = '" . (int) $subject['language_id'] . "'");
        }
        // kill subject references in category
        $this->db->query("UPDATE IGNORE " . DB_PREFIX . "category_attribute SET attribute_id = '" . (int) $target_id . "' WHERE attribute_id = '" . (int) $subject_id . "'");
        // delete subject attribute
        $this->db->query("DELETE FROM " . DB_PREFIX . "category_attribute WHERE attribute_id = '" . (int) $subject_id . "'");
        $this->db->query("DELETE FROM " . DB_PREFIX . "attribute WHERE attribute_id = '" . (int) $subject_id . "'");
        $this->db->query("DELETE FROM " . DB_PREFIX . "attribute_description WHERE attribute_id = '" . (int) $subject_id . "'");
        return;
    }

    public function createCategoryAttributes($categories = array()) {
        // $this->cache->delete('attributico');
        if ($categories) {
            // pull out category attribute from products
            $this->db->query("INSERT IGNORE INTO " . DB_PREFIX . "category_attribute(category_id, attribute_id) (SELECT DISTINCT hptc.category_id, hpa.attribute_id FROM "
                    . DB_PREFIX . "product_attribute hpa LEFT JOIN "
                    . DB_PREFIX . "product_to_category hptc ON (hpa.product_id = hptc.product_id) WHERE hptc.category_id IN (" . implode(",", $categories) . ") AND hpa.attribute_id !='0' ORDER BY hptc.category_id) ");
        }
        return $this->db->countAffected();
    }

    public function addCategoryAttributesToProducts($category_id) {
        // in foreach
        set_time_limit(600);
        $method = $this->config->get('attributico_product_text');
        $count_affected = 0;
        $sql = '';
        /* Будут добавлены только записи с несовпадающими ключами. Поле Text не будет затронуто */
        $sql_not_change = "INSERT IGNORE INTO " . DB_PREFIX . "product_attribute(product_id, attribute_id, language_id)
                      SELECT p.product_id, hca.attribute_id, hl.language_id FROM  " . DB_PREFIX . "product p
                      LEFT JOIN " . DB_PREFIX . "product_to_category p2c ON (p.product_id = p2c.product_id)
                      LEFT JOIN " . DB_PREFIX . "category_attribute hca ON (hca.category_id = '" . (int) $category_id . "')
                      , " . DB_PREFIX . "language hl
                      WHERE p2c.category_id = '" . (int) $category_id . "'
                      ORDER BY p.product_id, hca.attribute_id";
        
        switch ($method) {
            case '1':    // text = ''
                $sql = "INSERT INTO " . DB_PREFIX . "product_attribute(product_id, attribute_id, language_id, text)
                    SELECT p.product_id, hca.attribute_id, hl.language_id, '' FROM  " . DB_PREFIX . "product p
                    LEFT JOIN " . DB_PREFIX . "product_to_category p2c ON (p.product_id = p2c.product_id)
                    LEFT JOIN " . DB_PREFIX . "category_attribute hca ON (hca.category_id = '" . (int) $category_id . "')
                    , " . DB_PREFIX . "language hl
                    WHERE p2c.category_id = '" . (int) $category_id . "'
                    ORDER BY p.product_id, hca.attribute_id
                    ON DUPLICATE KEY UPDATE text = ''";
                break;
            case '2': // text not write
                $sql = $sql_not_change;
                break;
            case '3':
                /* Во всех записях поле Text будет заменено на непустой Duty */
                $sql = "INSERT INTO " . DB_PREFIX . "product_attribute(product_id, attribute_id, language_id, text)
                        SELECT p.product_id, hca.attribute_id, hl.language_id, had.duty FROM " . DB_PREFIX . "product p
                        LEFT JOIN " . DB_PREFIX . "product_to_category p2c ON (p.product_id = p2c.product_id)
                        LEFT JOIN " . DB_PREFIX . "category_attribute hca ON (hca.category_id = '" . (int) $category_id . "')
                        LEFT JOIN " . DB_PREFIX . "attribute_description had ON (had.attribute_id = hca.attribute_id AND had.duty != '')
                        , " . DB_PREFIX . "language hl
                        WHERE p2c.category_id = '" . (int) $category_id . "' AND had.language_id = hl.language_id
                        ORDER BY p.product_id, hca.attribute_id
                        ON DUPLICATE KEY UPDATE text = had.duty";
                break;
            case '4':
                /* Сначала вставляем записи с несовпадающими ключами */
                $this->db->query($sql_not_change);
                $count_affected = $this->db->countAffected();
                /* Затем заменяем во всех записях Text если он пустой на Duty если оно не пустое */
                $sql = "INSERT INTO " . DB_PREFIX . "product_attribute(product_id, attribute_id, language_id, text)
                        SELECT p.product_id, hca.attribute_id, hl.language_id, had.duty FROM " . DB_PREFIX . "product p
                        LEFT JOIN " . DB_PREFIX . "product_to_category p2c ON (p.product_id = p2c.product_id)
                        LEFT JOIN " . DB_PREFIX . "category_attribute hca ON (hca.category_id = '" . (int) $category_id . "')
                        LEFT JOIN " . DB_PREFIX . "attribute_description had ON (had.attribute_id = hca.attribute_id AND had.duty != '')
                        , " . DB_PREFIX . "language hl, " . DB_PREFIX . "product_attribute hpa
                        WHERE p2c.category_id = '" . (int) $category_id . "' AND had.language_id = hl.language_id
                        AND hpa.product_id = p.product_id AND hpa.attribute_id = hca.attribute_id AND hpa.language_id = hl.language_id AND hpa.text = ''
                        ORDER BY p.product_id, hca.attribute_id
                        ON DUPLICATE KEY UPDATE text = had.duty";
                break;
        }

        if ($sql) {
            $this->db->query($sql);
        }

        return $count_affected ? $count_affected : $this->db->countAffected();
    }

    public function cloneLanguage($source_lng, $target_lng, $method, $node = []) {
        
        set_time_limit(600);
        $count_affected = new stdClass();
        $count_affected->attribute = 0;
        $count_affected->group = 0;
        $count_affected->value = 0;

        $this->cache->delete('attributico');

        // Attribute
        if (in_array('attribute', $node)) {
            $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "attribute_description WHERE language_id = '" . (int) $source_lng . "'");

            foreach ($query->rows as $attribute) {
                if (!$method) {
                    $this->db->query("INSERT IGNORE INTO " . DB_PREFIX . "attribute_description SET attribute_id = '" . (int) $attribute['attribute_id'] . "',
                             language_id = '" . (int) $target_lng . "', name = '" . $this->db->escape($attribute['name']) . "', duty = '" . $this->db->escape($attribute['duty']) . "'");
                } else {
                    $this->db->query("INSERT INTO " . DB_PREFIX . "attribute_description SET attribute_id = '" . (int) $attribute['attribute_id'] . "',
                             language_id = '" . (int) $target_lng . "', name = '" . $this->db->escape($attribute['name']) . "', duty = '" . $this->db->escape($attribute['duty']) . "'
                             ON DUPLICATE KEY UPDATE attribute_id = '" . (int) $attribute['attribute_id'] . "',
                             language_id = '" . (int) $target_lng . "', name = '" . $this->db->escape($attribute['name']) . "', duty = '" . $this->db->escape($attribute['duty']) . "'");
                }
                $count_affected->attribute += round($this->db->countAffected()/2);
            }
        }

        // Attribute Group
        if (in_array('group', $node)) {
            $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "attribute_group_description WHERE language_id = '" . (int) $source_lng . "'");

            foreach ($query->rows as $attribute_group) {
                if (!$method) {
                    $this->db->query("INSERT IGNORE INTO " . DB_PREFIX . "attribute_group_description SET attribute_group_id = '" . (int) $attribute_group['attribute_group_id'] . "',
                                       language_id = '" . (int) $target_lng . "', name = '" . $this->db->escape($attribute_group['name']) . "'");
                } else {
                    $this->db->query("INSERT INTO " . DB_PREFIX . "attribute_group_description SET attribute_group_id = '" . (int) $attribute_group['attribute_group_id'] . "',
                                       language_id = '" . (int) $target_lng . "', name = '" . $this->db->escape($attribute_group['name']) . "'
                                       ON DUPLICATE KEY UPDATE attribute_group_id = '" . (int) $attribute_group['attribute_group_id'] . "',
                                       language_id = '" . (int) $target_lng . "', name = '" . $this->db->escape($attribute_group['name']) . "'");
                }
                $count_affected->group += round($this->db->countAffected()/2);
            }
        }

        // Product Attribute
        if (in_array('value', $node)) {
            $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_attribute WHERE language_id = '" . (int) $source_lng . "'");

            foreach ($query->rows as $product_attribute) {
                if (!$method) {
                    $this->db->query("INSERT IGNORE INTO " . DB_PREFIX . "product_attribute SET product_id = '" . (int) $product_attribute['product_id'] . "', attribute_id = '" . (int) $product_attribute['attribute_id'] . "',
                                       language_id = '" . (int) $target_lng . "', text = '" . $this->db->escape($product_attribute['text']) . "'");
                } else {
                    $this->db->query("INSERT INTO " . DB_PREFIX . "product_attribute SET product_id = '" . (int) $product_attribute['product_id'] . "', attribute_id = '" . (int) $product_attribute['attribute_id'] . "',
                                       language_id = '" . (int) $target_lng . "', text = '" . $this->db->escape($product_attribute['text']) . "'
                                       ON DUPLICATE KEY UPDATE product_id = '" . (int) $product_attribute['product_id'] . "', attribute_id = '" . (int) $product_attribute['attribute_id'] . "',
                                       language_id = '" . (int) $target_lng . "', text = '" . $this->db->escape($product_attribute['text']) . "'");
                }
                $count_affected->value += round($this->db->countAffected()/2);
            }
        }

        return $count_affected;
    }

}
