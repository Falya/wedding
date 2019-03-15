<?php 
function setTimeout($fn, $timeout){
    // sleep for $timeout milliseconds.
    sleep(($timeout/1000));
    $fn();
}

// Some example function we want to run.
function someFunctionToExecute(){
    echo 'The function executed!';
}

// This will run the function after a 3 second sleep =>
// We're using an anonymous function to wrap the function
// which we wish to execute.
setTimeout(function(){
   echo $_SERVER[‘REMOTE_ADDR‘];
}, 2000);
