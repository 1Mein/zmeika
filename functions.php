<?php
session_start();
function saveLogin($username, $password) {

    if(trim($username)=="" || trim($password)==""){
        $_SESSION['error'] = "Wrong input";
        return;
    }

    $conn = mysqli_connect("127.0.0.1", "jasom", "2156513", "recordlist");
    if (!$conn) {
        die("Ошибка подключения: " . mysqli_connect_error());
    }

    // // Хеширование пароля
    // $password = password_hash($password, PASSWORD_DEFAULT);
    
    $sql = "SELECT * FROM accounts";
    $names = mysqli_query($conn, $sql);

    foreach($names as $row){
        if($row["name"]==$username){
            $_SESSION['error'] = "Username is already taken";
            mysqli_close($conn);
            return;
        }
    }


    $sql = "INSERT INTO accounts (name, pass) VALUES ('$username', '$password')";

    mysqli_query($conn, "INSERT INTO records (name, score) VALUES ('$username', 0)");

    if (mysqli_query($conn, $sql)) {
        mysqli_close($conn);
        $_SESSION['error'] = "Account is created";
        $_SESSION['islogged'] = true;
        return true;
    } else {
        echo "Ошибка: " . $sql . "<br>" . mysqli_error($conn);
        mysqli_close($conn);
        return false;
    }
}

function checkUser($username, $password){
    $conn = mysqli_connect("127.0.0.1", "jasom", "2156513", "recordlist");
    if (!$conn) {
        die("Ошибка подключения: " . mysqli_connect_error());
    }

    $sql = "SELECT * FROM accounts WHERE name = '$username' AND pass = '$password'";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        // Login success
        mysqli_close($conn);
        $_SESSION['username'] = $username;
        return true;
    } else {
        // Login failed
        mysqli_close($conn);
        return false;
    }
}

function exitacc(){
    session_destroy();
}

function getLeaders($i){
    $conn = mysqli_connect("127.0.0.1", "jasom", "2156513", "recordlist");
    if (!$conn) {
        die("Ошибка подключения: " . mysqli_connect_error());
    }

    $sql = "SELECT * FROM recordlist.records
    order by score DESC
    limit 5;";
    $result = mysqli_query($conn, $sql);
    
    $temp=1;
    $out = "";
    foreach($result as $row){
        if($temp==$i){
            $out = $row["name"]."-".$row["score"];
            break;
        }
        $temp++;
    }
        
        return $out;
}

function setscore($score){
    $conn = mysqli_connect("127.0.0.1", "jasom", "2156513", "recordlist");
    if (!$conn) {
        die("Ошибка подключения: " . mysqli_connect_error());
    }

    $currentname = $_SESSION["username"];
    $sql = "SELECT * FROM records WHERE name = '$currentname'";
    $result = mysqli_query($conn, $sql);
    $currentscore = 0;

    foreach($result as $row){
        $currentscore = $row["score"];
    }


    //$currentname>$score
    if($currentscore>$score){
        mysqli_close($conn);
        return;
    }
    else{
        $sqlq = "UPDATE records SET score=$score WHERE name = '$currentname'";
        mysqli_query($conn, $sqlq);
        mysqli_close($conn);
        return;
    }
}


?>