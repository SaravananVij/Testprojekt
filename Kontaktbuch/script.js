let names = ['Erica Mustermann', 'John Doe'];
let phoneNumbers = ['015712345678', '015798765432'];
load();


function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += `<h1>My Contacts</h1>`; // " `` " Variablen nutzbar
    content.innerHTML += `
    <div>
        <input placeholder="Name" id="name">
        <input placeholder="Telefon" id="phone">
        <button onclick="addContact()">Hinzufügen</button>
        <button onclick="deleteContact(${1})">Löschen</button>
    </div>
    `;

    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const phoneNumber = phoneNumbers[i];

        content.innerHTML += `
            <div class="card">
                <b>Name: </b> ${name} <br>
                <b>Telefon: </b> ${phoneNumber} <br>
            </div>
        `;
    }
}

function addContact() {
    let name = document.getElementById('name');
    let phone = document.getElementById('phone');

    names.push(name.value);
    phoneNumbers.push(phone.value);


    render();
    save();
}

function deleteContact(i) {
    names.splice(i, 1);
    phoneNumbers.splice(i, 1);
    render();
    save();
}

function save() {
    let nameAsText = JSON.stringify(names);
    localStorage.setItem('names', nameAsText);
    let phoneAsText = JSON.stringify(phoneNumbers);
    localStorage.setItem('phoneNumbers', phoneAsText);
}

function load() {
    let nameAsText = localStorage.getItem('names');
    let phoneAsText = localStorage.getItem('phoneNumbers');
    if (nameAsText && phoneAsText) {
        names = JSON.parse(nameAsText);
        phoneNumbers = JSON.parse(phoneAsText);
    }

}