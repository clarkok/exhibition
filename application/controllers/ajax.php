<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ajax extends CI_Controller {
    function __construct () {
        parent::__construct();
        $this->load->model('Item');
    }

    function index () {
        $this->load->model('User');
        $username = $this->User->validate();
        $data = array();
        if ($username)
            $data['username'] = $username;
        $this->load->view('index', $data);
    }

    function login () {
        if ($this->input->post('token')) {
            $cookie = array(
                'name'   => 'token',
                'value'  => $this->input->post('token'),
                'expire' => 7 * 86500
            );

            set_cookie($cookie);
        }

        redirect(site_url(), 'refresh');
    }

    function page($page_id) {
        $data = $this->Item->get_page($page_id);

        foreach ($data as &$item) {
            $item->thumb = site_url('/ajax/thumb/' . $item->id);
            $item->full = site_url('/ajax/full/' . $item->id);
        }

        $pass['data'] = array(
            'code' => 0,
            'data' => $data
        );
        $this->load->view(
            'json',
            $pass
        );
    }

    function item($item_id) {
        $data = $this->Item->get_detail($item_id);

        if ($data) {
            $data->thumb = site_url('/ajax/thumb/' . $data->id);
            $data->full = site_url('/ajax/full/' . $data->id);
            unset($data->filename);

            $pass['data'] = array(
                'code' => 0,
                'data' => $data
            );
        }
        else {
            $pass['data'] = array(
                'code' => 1,
                'error' => 'No Such Item'
            );
        }
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

    function load_file_origin($path) {
        header('Content-type: ' . $this->get_mime_type($path));
        header('Content-Length: ' . filesize($path));
        readfile($path);
    }

    function load_file_base64($path) {
        $file = fopen($path, 'r');
        $data = base64_encode(fread($file, filesize($path)));

        header("Content-Length: " . strlen($data));
        header("Content-type: " . $this->get_mime_type($path));

        echo $data;
    }

    function full($id) {
        $data = $this->Item->get_detail($id);

        if (!$data)
            die();

        $file_name = './uploads/' . $data->filename;
        if (isset($_GET['base64']))
            $this->load_file_base64($file_name);
        else
            $this->load_file_origin($file_name);
    }

    function thumb($id) {
        $data = $this->Item->get_detail($id);

        if (!$data)
            die();

        $file_name = './uploads/' . $this->get_thumbnail($data->filename);
        if (isset($_GET['base64']))
            $this->load_file_base64($file_name);
        else
            $this->load_file_origin($file_name);
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
