<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");

    $host = "https://databases-auth.000webhost.com/tbl_sql.php";
    $user="id18506745_admin";
    $senha="Tv)=U+aV7^9+Wdgm";
    $database="id18506745_votacao";

    $con = mysqli_connect($host, $user,$senha, $database) or die("Erro ao se conectar com o servidor do banco de dados!");
    
    if (isset($_POST)) {
        
        $json = file_get_contents('php://input');
        
        $data = json_decode($json);
        
        $etapa = $data->etapa;
        $numero = $data ->numero;

        
        $sql_insert = "insert into `Votacao` (etapa,numero_candidato) 
        values('$etapa', '$numero')";
        
        $result = mysqli_query($con, $sql_insert);
        if($result){
            echo "Voto registrado com sucesso!";
            var_dump(http_response_code(200));
        }else{
            var_dump(http_response_code(500));
            die(mysqli_error($con));
        }
        
    }else{
        var_dump(http_response_code(500));
    }
?>