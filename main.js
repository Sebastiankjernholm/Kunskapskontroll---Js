function AddContact(event) {

    event.preventDefault();
    const name = document.getElementById("name-input").value;
    const phone = document.getElementById("phone-input").value;

    if (name && phone) {
        const contactList = document.getElementById("contact-list");

        const listItem = document.createElement("Li")
        listItem.innerHTML = `<span class="name">${name}</span> - <span class="phone">${phone}</span>`;
        contactList.appendChild(listItem);

        document.getElementById("name-input").value = '';
        document.getElementById("phone-input").value = '';
    }
    else {
        alert("Please enter both name and phone number."); // Alert if fields are empty
    }
}