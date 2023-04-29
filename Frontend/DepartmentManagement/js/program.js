$(function () {
    if (!isLogin()) {
        window.location.replace("http://127.0.0.1:5500/html/login.html");
    }

    $(".header").load("header.html", function () {
        document.getElementById("fullname").innerHTML = storage.getItem("FULL_NAME");

        if (storage.getItem("ROLE") == "User") {
            document.getElementById("viewListDepartments").style.display = "none";
            document.getElementById("viewListAccounts").style.display = "none";
        }
        if (storage.getItem("ROLE") == "Admin") {
            document.getElementById("viewListAccounts").style.display = "none";
        }
    });
    $(".main").load("home.html");
    $(".footer").load("footer.html");
});

function isLogin() {
    if (storage.getItem("ID")) {
        return true;
    }
    return false;
}

function logout() {
    storage.removeItem("ID");
    storage.removeItem("FULL_NAME");
    storage.removeItem("USERNAME");
    storage.removeItem("PASSWORD");

    storage.removeItem("AVATAR_URL");

    // redirect to login page
    window.location.replace("http://127.0.0.1:5500/html/login.html");

}


