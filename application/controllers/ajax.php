<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ajax extends CI_Controller {
    function __construct () {
        parent::__construct();
        $this->load->model('Item');
    }

    function index () {
        $this->load->view('index');
    }

    function page($page_id) {
        $data = $this->Item->get_page($page_id);
        $pass['data'] = array(
            'code' => 0,
            'data' => $data
        );
        $this->load->view(
            'json',
            $pass
        );
    }

    function item($id) {
        $data = $this->Item->get_detail($id);
        $pass['data'] = array(
            'code' => 0,
            'data' => $data
        );
        $this->load->view(
            'json',
            $pass
        );
    }

    function upload() {
        // TODO auth
        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['override'] = TRUE;
        $config['encrypt_name'] = TRUE;

        $this->load->library('upload', $config);

        if ($this->upload->do_upload()) {
            $file_desc = $this->upload->data()['file'];
            $item['title'] = $this->input->post('title');
            $item['detail'] = $this->input->post('detail');
            $item['author'] = $this->input->post('author');
            $item['time'] = time();
            $item['original'] = $file_desc['full_path'];

            $this->Item->add_item($item);
        }
        else {
            $pass['data'] = array(
                'code' => 1,
                'error' => $this->upload->display_errors()
            );
            $this->load->view(
                'json',
                $pass
            );
        }
    }
}
