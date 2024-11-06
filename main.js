function validateContact(name, phone) {
    if (!name || !phone) {
        return "Både namn och telefonnummer måste fyllas i.";
    }
    return null;
}

function AddContact(event) {
    event.preventDefault();
    const name = document.getElementById("name-input").value;
    const phone = document.getElementById("phone-input").value;

    const errorMessage = validateContact(name, phone);
    if (errorMessage) {
        displayError(errorMessage);
        return;
    }

    // Raderar Error.message vid korrekt input
    clearErrorMessage();

    const contactList = document.getElementById("contact-list");

    const listItem = document.createElement("Li");
    listItem.innerHTML = `<span class="name">${name}</span> - <span class="phone">${phone}</span>`;

    // Skapar Edit & Delete - knappar
    const editButton = document.createElement("button");
    editButton.textContent = "Ändra";
    editButton.onclick = () => editContact(listItem, editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Radera";
    deleteButton.onclick = () => deleteContact(listItem);

    // Append knappar och lista
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    contactList.appendChild(listItem);

    const clearAllButton = document.getElementById("clear-all-button");
    clearAllButton.style.display = "inline-block";

    // Input blir tom efter kontakt skapad
    document.getElementById("name-input").value = '';
    document.getElementById("phone-input").value = '';
}

function editContact(listItem, editButton) {
    const nameSpan = listItem.querySelector(".name");
    const phoneSpan = listItem.querySelector(".phone");

    if (nameSpan.contentEditable === "true") {
        // Checkar om både namn och phone finns med
        if (!nameSpan.textContent.trim() || !phoneSpan.textContent.trim()) {
            displayError("Kontakten kan inte sparas utan både namn och telefonnummer.");
            return;
        }

        // Tar bort error-message om korrekt
        clearErrorMessage();

        // Sparar kontakt och låser den
        nameSpan.contentEditable = "false";
        phoneSpan.contentEditable = "false";
        editButton.textContent = "Ändra";

        document.getElementById("name-input").disabled = true;
        document.getElementById("phone-input").disabled = true;
    } else {
        // Låser upp för edit
        nameSpan.contentEditable = "true";
        phoneSpan.contentEditable = "true";
        nameSpan.focus();
        editButton.textContent = "Spara";

        document.getElementById("name-input").disabled = false;
        document.getElementById("phone-input").disabled = false;
    }
}

// Tar bort kontkat
function deleteContact(listItem) {
    listItem.remove();
}

// Tar bort alla kontakter
function clearAllContacts() {
    const contactList = document.getElementById("contact-list");
    contactList.innerHTML = '';

    // Gömmer "radera lista" om det inte finns någon kontakt
    const clearAllButton = document.getElementById("clear-all-button");
    clearAllButton.style.display = "none";

    // Återställ input-fälten för namn och telefon till aktiva
    document.getElementById("name-input").disabled = false;
    document.getElementById("phone-input").disabled = false;
}

// Visa Error-message
function displayError(message) {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
}

// Ta bort error message
function clearErrorMessage() {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = '';
}

document.getElementById("clear-all-button").addEventListener("click", clearAllContacts);