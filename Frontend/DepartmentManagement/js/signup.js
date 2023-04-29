function signup() {

    // get data
    var username1 = document.getElementById("userNName").value;
    var firstName1 = document.getElementById("firstNName").value;
    var lastName1 = document.getElementById("lastNName").value;
    var password1 = document.getElementById("passw").value;
    var role1 = document.getElementById("rolLe").value;
    var email1 = document.getElementById("emaill").value;

    // validate name 6 -> 30 characters
    if (!username1 || username1.length < 6 || username1.length > 30) {
        // show error message
        showNameErrorMessage("User name must be from 6 to 30 characters!");
        return;
    }

    if (!firstName1 || firstName1.length < 1 || firstName1.length > 30) {
        // show error message
        showFirstNameErrorMessage("First name must be from 6 to 30 characters!");
        return;
    }

    if (!lastName1 || lastName1.length < 6 || lastName1.length > 30) {
        // show error message
        showLastNameErrorMessage("Last name must be from 6 to 30 characters!");
        return;
    }

    if (!email1 || email1.length < 6 || email1.length > 30) {
        // show error message
        showEmailErrorMessage("Please input email!");
        return;
    }

    if (!password1 || password1.length < 4 || password1.length > 30) {
        // show error message
        showPasswordErrorMessage("Please input password!");
        return;
    }

                // call api create department
                var account = {
                    username: username1,
                    firstName: firstName1,
                    lastName: lastName1,
                    role: role1,
                    password: password1,
                    email: email1
                };

                $.ajax({
                    url: 'http://localhost:8080/api/v1/signup',
                    type: 'POST',
                    data: JSON.stringify(account), // body
                    contentType: "application/json", // type of body (json, xml, text)
                    // dataType: 'json', // datatype return
                    beforeSend: function (xhr) {
                       
                    },
                    success: function (data, textStatus, xhr) {
                        alert("Đăng ký thành công")
                        window.location.replace("http://127.0.0.1:5500/html/login.html");
                    },
                    error(jqXHR, textStatus, errorThrown) {
                        alert("Lỗi! Mời bạn đăng ký lại");
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            }
 
            function showNameErrorMessage(message) {
                document.getElementById("nameErrorMessagee").style.display = "block";
                document.getElementById("nameErrorMessagee").innerHTML = message;
                
            }
            
            function hideNameErrorMessage() {
                document.getElementById("nameErrorMessagee").style.display = "none";
            }

            function showFirstNameErrorMessage(message) {
                document.getElementById("firstnameErrorMessagee").style.display = "block";
                document.getElementById("firstnameErrorMessagee").innerHTML = message;               
            }

            function hideFirstNameErrorMessage() {
                document.getElementById("firstnameErrorMessagee").style.display = "none";
            }

            function showLastNameErrorMessage(message) {
                document.getElementById("lastnameErrorMessagee").style.display = "block";
                document.getElementById("lastnameErrorMessagee").innerHTML = message;               
            }

            function hideLastNameErrorMessage() {
                document.getElementById("lastnameErrorMessagee").style.display = "none";
            }

            function showEmailErrorMessage(message) {
                document.getElementById("emailErrorMessagee").style.display = "block";
                document.getElementById("emailErrorMessagee").innerHTML = message;               
            }

            function hideEmailErrorMessage() {
                document.getElementById("emailErrorMessagee").style.display = "none";
            }

            function showPasswordErrorMessage(message) {
                document.getElementById("passwordErrorMessagee").style.display = "block";
                document.getElementById("passwordErrorMessagee").innerHTML = message;               
            }

            function hidePasswordErrorMessage() {
                document.getElementById("passwordErrorMessagee").style.display = "none";
            }

            


