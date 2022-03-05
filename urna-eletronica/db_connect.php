<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");

    $host = "localhost";
    $user="id18506745_admin";
    $senha="Tv)=U+aV7^9+Wdgm";
    $database="id18506745_votacao";

    $con = mysqli_connect($host, $user,$senha, $database) or die("Erro ao se conectar com o servidor do banco de dados!");
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
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
        
    }
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $sql_select = "SELECT *, COUNT(*) as `votos` FROM `Votacao` GROUP BY `numero_candidato`";
        $result = mysqli_query($con, $sql_select);
        
        if($result){
            $rows = array();
            while($r = mysqli_fetch_assoc($result)) {
              $rows[] = $r;
              
            }
            
            echo json_encode($rows);
        }else{
            var_dump(http_response_code(500));
            die(mysqli_error($con));
        }
        
    }
    
    else{
        var_dump(http_response_code(500));
    }
    
    mysqli_close($con);
?>