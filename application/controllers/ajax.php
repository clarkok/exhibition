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

    function get_mime_type($filename) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $ret = finfo_file($finfo, $filename);
        finfo_close($finfo);

        return $ret;
    }

    function full($id) {
        $data = $this->Item->get_detail($id);

        if (!$data)
            die();

        $file_name = './uploads/' . $data->filename;
        $file_size = filesize($file_name);
        header("Content-Length: " . $file_size);
        header("Content-type: " . $this->get_mime_type($file_name));
        readfile($file_name);
    }

    function thumb($id) {
        $data = $this->Item->get_detail($id);

        if (!$data)
            die();

        $file_name = './uploads/' . $this->get_thumbnail($data->filename);
        $file_size = filesize($file_name);
        header("Content-Length: " . $file_size);
        header("Content-type: " . $this->get_mime_type($file_name));
        readfile($file_name);
    }

    function get_thumbnail($original) {
        $ex_pos = strrpos($original, '.');

        $ret = substr($original, 0, $ex_pos) 
            . '_thumb' 
            . substr($original, $ex_pos);

        return $ret;
    }

    function upload() {
        // TODO auth
        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['override'] = TRUE;
        $config['encrypt_name'] = TRUE;

        $this->load->library('upload', $config);

        if ($this->upload->do_upload('file')) {
            $file_desc = $this->upload->data('file');
            $item['title'] = $this->input->post('title');
            $item['detail'] = $this->input->post('detail');
            $item['author'] = $this->input->post('author');
            $item['time'] = date('Y-m-d H:i:s');
            $item['upload_path'] = $file_desc['full_path'];
            $item['filename'] = $file_desc['file_name'];
            $item['width'] = $file_desc['image_width'];
            $item['height'] = $file_desc['image_height'];

            $error = $this->Item->add_item((object)$item);
            if (strlen($error)) {
                $data['code'] = 1;
                $data['error'] = $error;
            }
            else
                $data['code'] = 0;

            $pass['data'] = $data;
            $this->load->view(
                'json',
                $pass
            );
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

    function test_upload() {
        $this->load->view('upload');
    }
}
