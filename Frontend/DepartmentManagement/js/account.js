function viewAccountPage() {
    $(".main").load("accountPage.html", function() {
        buildAccountTable();
    });
}

function buildAccountTable() {
    $('#account-table tbody').empty();
    getListAccounts();
}

var accounts = [];

// paging
var currentPage = 1;
var size = 5;

// get List
function getListAccounts() {
    var url = "http://localhost:8080/api/v1/accounts";

    // paging
    url += '?page=' + currentPage + '&size=' + size;

    // search
    var search = document.getElementById("input-search-account").value;
    if (search) {
        url += "&search=" + search;
    }

    // call API from server
    $.ajax({
        url: url,
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            accounts = data.content;
            fillAccountToTable();
            fillAccountPaging(data.numberOfElements, data.totalPages);
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

}

function fillAccountToTable() {
    accounts.forEach(function(item, index) {
        $('#account-table tbody').append(
            '<tr>' +
            '<label></label>' +
            '</span>' +
            '</td>' +
            '<td style="text-align: center;">' + item.username + '</td>' +
            '<td style="text-align: center;">' + item.firstName + '</td>' +
            '<td style="text-align: center;">' + item.lastName + '</td>' +
            '<td style="text-align: center;">' + item.role + '</td>' +
            '<td>' +
            '<a class="delete" title="Delete" data-toggle="tooltip" onClick="openConfirmAccountDelete(' + item.id + ')"><i class="material-icons">&#xE872;</i></a>' +
            '</td>' +
            '</td>' +
            '</tr>'
        );
    });
}

// paging
function fillAccountPaging(currentSize, totalPages) {
    // prev
    if (currentPage > 1) {
        document.getElementById("account-previousPage-btn").disabled = false;
    } else {
        document.getElementById("account-previousPage-btn").disabled = true;
    }

    // next
    if (currentPage < totalPages) {
        document.getElementById("account-nextPage-btn").disabled = false;
    } else {
        document.getElementById("account-nextPage-btn").disabled = true;
    }

    // text
    document.getElementById("account-page-info").innerHTML = currentSize + (currentSize > 1 ? " records " : " record ") + currentPage + " of " + totalPages;
}

function resetAccountPaging() {
    currentPage = 1;
    size = 5;
}

function prevAccountPage() {
    changeAccountPage(currentPage - 1);
}

function nextAccountPage() {
    changeAccountPage(currentPage + 1);
}

function changeAccountPage(page) {
    currentPage = page;
    buildAccountTable();
}

function openAddAccountModal() {
    openAccountModal();
    resetFormAddAccount();
}

function resetFormAddAccount() {
    
    document.getElementById("titleModalAccount").innerHTML = "Add Account";
    
    document.getElementById("userName").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("role").value = "";
    hideNameErrorMessage();
}

function openAccountModal() {
    $('#myModalAccount').modal('show');
}

function hideAccountModal() {
    $('#myModalAccount').modal('hide');
}

function resetAccountTable() {
    resetAccountPaging();
    resetAccountSearch();
}


function addAccount() {

    // get data
    var username = document.getElementById("userName").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var role = document.getElementById("role").value;

    // validate name 6 -> 30 characters
    if (!username || username.length < 6 || username.length > 30) {
        // show error message
        showNameErrorMessage("Account name must be from 6 to 30 characters!");
        return;
    }

    // validate unique name
    $.ajax({
        url: "http://localhost:8080/api/v1/accounts/username/" + username + "/exists",
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function (data, textStatus, xhr) {
            if (data) {
                // show error message
                showNameErrorMessage("Account name is exists!");
            } else {
                // call api create department
                var account = {
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    role: role
                };

                $.ajax({
                    url: 'http://localhost:8080/api/v1/accounts',
                    type: 'POST',
                    data: JSON.stringify(account), // body
                    contentType: "application/json", // type of body (json, xml, text)
                    // dataType: 'json', // datatype return
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
                    },
                    success: function (data, textStatus, xhr) {
                        console.log(data);
                        // success
                        hideAccountModal();
                        showAccountSuccessAlert();
                        resetAccountTable();
                        buildAccountTable();
                    },
                    error(jqXHR, textStatus, errorThrown) {
                        alert("Error when loading data");
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            }
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function showAccountSuccessAlert() {
    $("#success-alert-account").fadeTo(2000, 500).slideUp(500, function () {
        $("#success-alert-account").slideUp(500);
    });
}

function luu() {
    var id = document.getElementById("id").value;

    if (id == null || id == "") 
        addAccount();

}

function deleteAllAccounts(ids) {
    // get checked
    var ids = [];
    var usernames = [];
    var i = 0;

    // open confirm ==> bạn có muốn xóa bản ghi ...

    var result = confirm("Want to delete " + usernames + "?");
    if (result) {
        // call API
        $.ajax({
            url: 'http://localhost:8080/api/v1/accounts?ids=' + ids,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
            },
            success: function (result) {
                // error
                if (result == undefined || result == null) {
                    alert("Error when loading data");
                    return;
                }

                // success
                showAccountSuccessAlert();
                resetAccountTable();
                buildAccountTable();
            }
        });
    }

}

function resetAccountSearch() {
    document.getElementById("input-search-account").value = "";
}

// https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
function handKeyUpEventForAccountSearching(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        handleAccountSearch();
    }
}

function handleAccountSearch() {
    resetAccountPaging();
    buildAccountTable();
}

function refreshAccountTable() {
    resetAccountTable();
    buildAccountTable();
}

function openConfirmAccountDelete(id) {
    var index = accounts.findIndex(x => x.id == id);
    var username = accounts[index].username;

    var result = confirm("Want to delete " + username + "?");
    if (result) {
        deleteAccount(id);
    }
}

function deleteAccount(id) {
    // TODO validate

    $.ajax({
        url: 'http://localhost:8080/api/v1/accounts/' + id,
        type: 'DELETE',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function (result) {
            // error
            if (result == undefined || result == null) {
                alert("Error when loading data");
                return;
            }

            // success
            showAccountSuccessAlert();
            resetAccountTable();
            buildAccountTable();
        }
    });
}










