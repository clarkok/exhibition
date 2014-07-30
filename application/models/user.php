<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends CI_Model {
    const API = 'http://passport.myqsc.com/api/get_member_by_token?token=';

    function __construct () {
        parent::__construct();
    }

    function validate () {
        $token = get_cookie('token');

        if ($token) {
            $res = $this->send_get_request(self::API . $token);
            if (strlen($res['error'])) {
                return false;
            }
            else {
                $data = json_decode($res['data']);
                return $data->username;
            }
        }
        else {
            return false;
        }
    }

    function send_get_request ($url) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $result = array(
            'data' => '',
            'error' => ''
        );

        $response = curl_exec($ch);

        $result['error'] = curl_error($ch);
        $result['data'] = $response;

        return $result;
    }
}

