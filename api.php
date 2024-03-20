<?php

if($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    // header("Access-Control-Allow-Origin: http://boulenc.nicolas.free.fr");
    // header("Access-Control-Allow-Credentials: true");
    // header("Access-Control-Allow-Headers: Content-Type, origin, authorization, accept, cookie");
}
else {

    $res = "";

    if($_REQUEST["ep"] === "list-books") {
        $res = '{ "result": "succes", "message": "This request", "books": [{"title": "Moby Dick; Or, The Whale"}] }';
    }
    else if($_REQUEST["ep"] === "get-book") {
        $res = '{ "result": "succes", "message": "", "url": "", "bookmark": 0 }';
    }
    else if($_REQUEST["ep"] === "bookmark") {
        $res = '{ "result": "succes", "message": "" }';
    }

    if($res !== "") {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json");
        echo "\n\n";
        echo '{"result": "succes", "message": "this is a ' . $_SERVER["REQUEST_METHOD"] . ' request"}';
    }
}


function bookmark($user, $book, $bookmark) {

}

?>