let x = document.getElementById("login");
let y = document.getElementById("sign-up");
let z = document.getElementById("btn");

function signUp(){
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
}

function login(){
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
}

// form validation

function clearErrors(){

    errors = document.getElementsByClassName('formerror');
    for(let item of errors)
    {
        item.innerHTML = "";
    }


}
function seterror(id, error){
    //sets error inside tag of id 
    element = document.getElementById(id);
    element.getElementsByClassName('formerror')[0].innerHTML = error;

}

function validateForm(){
    var returnval = true;
    clearErrors();
    var name = document.forms['myForm']["fname"].value;
    if (name.length<5){
        seterror("name", "*Length of name is too short");
        returnval = false;
    }

    if (name.length == 0){
        seterror("name", "*Length of name cannot be zero!");
        returnval = false;
    }

    var email = document.forms['myForm']["femail"].value;
    if (email.length>20){
        seterror("email", "*Email length is too long");
        returnval = false;
    }

    var password = document.forms['myForm']["fpass"].value;
    if (password.length < 6){
        seterror("pass", "*Password should be atleast 6 characters long!");
        returnval = false;
    }

    var cpassword = document.forms['myForm']["fcpass"].value;
    if (cpassword != password){
        seterror("cpass", "*Password and Confirm password should match!");
        returnval = false;
    }

    return returnval;
}