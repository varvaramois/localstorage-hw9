const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const telInput = document.getElementById("tel");
const emailInput = document.getElementById("email");
const btn = document.getElementById("btn");
const box = document.getElementById("box");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editingIndex = null; // змінна для зберігання індексу редагованого контакту

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts)); // зберігаємо контакти в localStorage
}

function renderContacts() { 
  box.innerHTML = "";
  contacts.forEach((contact, index) => {
    const li = document.createElement("li");
    li.className = "contact__item";
    li.innerHTML = `
      <span>${contact.name} ${contact.surname} - ${contact.tel} - ${contact.email}</span>
      <div class="btns">
        <button onclick="editContact(${index})">✏️</button>
        <button class="delete" onclick="deleteContact(${index})">🗑️</button>
      </div>
    `;
    box.appendChild(li);
  });
}

window.editContact = function (index) { 
  const contact = contacts[index];  
  nameInput.value = contact.name; 
  surnameInput.value = contact.surname; 
  telInput.value = contact.tel; 
  emailInput.value = contact.email;
  editingIndex = index;
  btn.textContent = "Оновити";
};

window.deleteContact = function (index) {
  if (confirm("А по попі?")) {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
  }
};

btn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const surname = surnameInput.value.trim();
  const tel = telInput.value.trim();
  const email = emailInput.value.trim();
  if (!name || !surname || !tel || !email) {
    alert("Забув шо писати?");
    return;
  }
  const contact = { name, surname, tel, email };
  if (editingIndex === null) {
    contacts.push(contact);
  } else {
    contacts[editingIndex] = contact;
    editingIndex = null;
    btn.textContent = "Додати";
  }
  saveContacts();
  renderContacts();
  nameInput.value = "";
  surnameInput.value = "";
  telInput.value = "";
  emailInput.value = "";
});

renderContacts();
