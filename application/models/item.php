<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Item extends CI_Model {
    const ITEM_PER_PAGE = 10;
    const WIDTH = 500;

    function __construct () {
        parent::__construct();
    }

    function get_page($page_id) {
        if (!is_numeric($page_id))
            $page_id = 0;

        $this->db->order_by('id', 'desc');
        $this->db->select('id, title, author, time, width, height');
        $query = $this->db->get(
            'exhibition',
            self::ITEM_PER_PAGE,
            self::ITEM_PER_PAGE * $page_id
        );

        return $query->result();
    }

    function get_detail($item_id) {
        if (!is_numeric($item_id))
            $item_id = 0;

        $query = $this->db->get_where(
            'exhibition',
            array('id' => $item_id)
        );

        if ($query->num_rows() > 0) {
            return $query->result()[0];
        }
        else{
            return null;
        }
    }

    function add_item($item) {
        $error = $this->resize_item(
            $item->upload_path,
            $item->width,
            $item->height
        );
        if (strlen($error))
            return $error;

        unset($item->upload_path);
        $this->db->insert('exhibition', $item);

        return null;
    }

    function resize_item($origin, $width, $height) {
        $config['image_library'] = 'gd2';
        $config['source_image'] = $origin;
        $config['create_thumb'] = TRUE;
        $config['maintain_ratio'] = TRUE;
        $config['width'] = self::WIDTH;
        $config['height'] = $height * self::WIDTH / $width;

        $this->load->library('image_lib', $config);

        if (!$this->image_lib->resize()) {
            return $this->image_lib->display_errors();
        }

        return '';
    }
}
