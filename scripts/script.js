$(function () {
    $("#btnLoad").click(loadContacts);
    $("#btnCreate").click(createContact);

    const baseUrl = "https://ajaxtest-e4b9c.firebaseio.com/phonebook";

    function loadContacts() {
        $("#phonebook").empty();
        $.get(baseUrl + ".json")
            .then(displayContacts)
            .catch(displayError);
    }

    function displayContacts(contacts) {
        let keys = Object.keys(contacts);
        for (let key of keys) {
            let contact = contacts[key];
            if (contact.person) {
                let li = $("<li>");
                li.text(contact.person + ": " + contact.phone + " ");
                li.appendTo($("#phonebook"));
                li.append(
                    $("<button class='btn'>Delete</button>").click(function () {
                        deleteContact(key);
                    })
                );
            }
        }
    }

    function displayError() {
        $("#phonebook").html("<li>Error</li>");
    }

    function deleteContact(key) {
        let delRequest = {
            method: "DELETE",
            url: baseUrl + "/" + key + ".json"
        };
        $.ajax(delRequest)
            .then(loadContacts)
            .catch(displayError);
    }

    function createContact() {
        let person = $("#person").val();
        let phone = $("#phone").val();

        let newContact = {person, phone};

        let createRequest = {
            method: "POST",
            url: baseUrl + ".json",
            data: JSON.stringify(newContact)
        };

        $("#person").val('');
        $("#phone").val('');

        $.ajax(createRequest)
            .then(loadContacts)
            .catch(displayError);
    }
});