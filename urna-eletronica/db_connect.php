<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");

    $host = "https://databases-auth.000webhost.com/tbl_sql.php";
    $user="id18506745_admin";
    $senha="Tv)=U+aV7^9+Wdgm";
    $database="id18506745_votacao";

    $con = mysqli_connect($host, $user,$senha, $database) or die("Erro ao se conectar com o servidor do banco de dados!");
    
    if (isset($_POST['submit'])) {
        $etapa = $_POST['etapa'];
        $numero = $_POST['numero'];
        echo "<script>console.log('Debug Objects: " . $etapa . "' );</script>";
    }
?>