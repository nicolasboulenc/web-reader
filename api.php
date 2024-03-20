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

    $entry_point = $_REQUEST["ep"];
    $res = "";

    if($entry_point === "book-shelf") {
        $res = '{ "result": "succes", "message": "This request", "books": [{"title": "Moby Dick; Or, The Whale", "author": "Herman Melville", "url": "pg2701.txt"}] }';
    }
    else if($entry_point === "book") {
        $res = '{ "result": "succes", "message": "", "url": "pg2701.txt", "bookmark": 0 }';
    }
    else if($entry_point === "bookmark") {
        $res = '{ "result": "succes", "message": "" }';
    }
    else if($entry_point === "search") {
        $result = guttenberg_search("moby+dick");
        foreach ($result as &$book) {
            // var_dump($book);
            // echo "<br>";
        }
    }

    if($res !== "") {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json");
        echo "\n\n";
        echo '' . $res . '';
    }
}


function guttenberg_search($search) {

    $url = "https://www.gutenberg.org/ebooks/search/?query=moby+dick&submit_search=Go%21";

    $defaults = array(
        CURLOPT_POST => 1,
        CURLOPT_HEADER => 0,
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_TIMEOUT => 4
        // CURLOPT_FRESH_CONNECT => 1,
        // CURLOPT_FORBID_REUSE => 1,
        // CURLOPT_POSTFIELDS => http_build_query($post)
    );

    $books = array();

    $ch = curl_init();
    curl_setopt_array($ch, $defaults);
    $result = curl_exec($ch);
    curl_close($ch);

    if($result !== false) {

        $html = explode("<ul class=\"results\">", $result);
        $html = explode("</ul>", $html[1]);
        $html = $html[0];
        $html = explode("<li class=\"booklink\">", $html);

        for($i=1; $i<count($html); $i++) {
            $book = $html[$i];
            
            $url = explode("<a class=\"link\" href=\"", $book);
            $url = explode("\"", $url[1]);
            $url = $url[0];

            $title = explode("<span class=\"title\">", $book);
            $title = explode("</span>", $title[1]);
            $title = $title[0];

            $author = explode("<span class=\"subtitle\">", $book);
            $author = explode("</span>", $author[1]);
            $author = $author[0];

            $downloads = explode("<span class=\"extra\">", $book);
            $downloads = explode(" downloads", $downloads[1]);
            $downloads = $downloads[0];

            $books[] = array($url, $title, $author, $downloads);
        }
    }

    return $books;
}



function bookmark($user, $book, $bookmark) {

}

?>