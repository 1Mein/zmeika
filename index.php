<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zmeika</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <style type="text/css">
        <?php
            session_start();
            include('functions.php');

            if (isset($_POST['function']) && $_POST['function'] == 'myFunction') {
                setscore($_POST['data']);
                header("Location: http://localhost:3000/4/index.php");
            }
            if (isset($_SESSION['islogged'])) {
                echo ".auth{ display: none;}";
            }
            if (isset($_POST['exit'])) {
                exitacc();
                header("Location: http://localhost:3000/4/index.php");
            }
            if (isset($_POST['login'])) {
                if(checkUser($_POST['username'],$_POST['password'])){
                $_SESSION['error'] = "";
                }
                else{
                $_SESSION['error'] = "Wrong input";
                }
                // $username = $_POST['username'];
                // $password = $_POST['password'];
                // checkUser($username, $password);
            }
            if (isset($_POST['signin'])) {
                $username = $_POST['username'];
                $password = $_POST['password'];
                saveLogin($username, $password);
            }
        ?>
    </style>
    <h1>Zmeika</h1>
    <div class="win">
        <div class="win-text">Lose</div>
    </div>

    <div class="forrow">
        <div>
            <div class="score">0</div>

            <div class="leaderboard">
                <div class="title1">Top-5</div>
                <hr>
                <div class="leaders">
                    <?php
                        for($i=1;$i<6;$i++){
                            echo $i.". ".getLeaders($i)."<br>";
                        }
                    ?>
                </div>
            </div>

            <div class="activeuser"><?php
                if(isset($_SESSION['username']))echo $_SESSION['username'];
            ?></div>

            <div class="auth">
                <button class="aubtns btn4">Log in</button>
                <button class="aubtns btn5">Sign in</button>
            </div>

            <div class="error"><?php
                if(isset($_SESSION['error'])){
                    echo $_SESSION['error'];
                }
            ?></div>

            <div class="login">
                <form action="" id="form1" class="loginform" method="post">
                    <div class="text3">Username</div>
                    <input type="text" class="log username" name="username" required maxlength="16">
                    <!-- <br> -->
                    <div class="text3">Password</div>
                    <input type="password" class="log password" name="password" required>
                    <div class="btns2">
                        <input class="btn6" name="login" type="submit" value="Log in">
                        <!-- <button class="btn6">Log in</button> -->
                        <button class="btn7">Back</button>
                    </div>
                </form>
            </div>

            <div class="signin">
                <form action="" class="signinform" method="post"> 
                <div class="text3">Create username</div>
                <input type="text" class="sign username" name="username" required maxlength="16">
                <!-- <br> -->
                <div class="text3">Create password</div>
                <input type="password" class="sign password" name="password" required>
                <div class="btns3">
                    <input class="btn8" name="signin" type="submit"  value="Sign in">
                    <!-- <button class="btn8">Sign in</button> -->
                    <button class="btn9">Back</button>
                </div>
                </form>
            </div>

            <div class="exit">
                <form action="" method="post">
                    <input type="submit" name="exit" class="btn10" value="Exit">
                </form>
                <!-- <button action='exitacc()' class="btn10">Exit</button> -->
            </div>

        </div>

        <!-- <canvas class="mainbox" width="600" height="600"></canvas> -->
        <div><canvas class="snake" width="600" height="600"></canvas></div>


        <div class="equalaizer">Press "Start" to<br>start the game<br><br>"Restart" to
            play<br>again<br><br>W,A,S,D<br>control
            <br><br>Record: &nbsp; <adsa class="record">0</adsa>
            <br><br>
            Input here interval
            <input type="text" class="timer" value="500">
            <button class="btn3">Apply</button>
            Write number pls <br><br>
            Current interval is: &nbsp; <adsa class="interval"></adsa>
        </div>
    </div>
    <div class="btns">
        <div class="btn">
            <button class="btn1">Start</button>
        </div>
        <div class="btn">
            <button class="btn2">Restart</button>
        </div>
    </div>
    <script src="script2.js"></script>
    <script src="script.js"></script>
</body>

</html>