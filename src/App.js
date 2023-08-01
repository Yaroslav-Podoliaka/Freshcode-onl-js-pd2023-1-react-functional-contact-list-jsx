import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import "./App.css";

function App() {

  const [contacts, setContacts] = useState([]);
  const [contactForEdit, setContactForEdit] = useState(createEmptyContact());

  function createEmptyContact() {
    return {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
  }

  function saveState(contacts) {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  function restoreState() {
    const data = localStorage.getItem("contacts");
    return data ? JSON.parse(data) : [];
  }

  useEffect(() => {
    setContacts(restoreState());
  }, []);

  function selectContact(contact) {
    setContactForEdit(contact);
  }

  function createContact(contact) {
    contact.id = Date.now();
    const newContacts = [...contacts, contact];
    setContacts(newContacts);
    saveState(newContacts);
    setContactForEdit(createEmptyContact());
  }

  function updateContact(contact) {
    const updateContacts = contacts.map((item) =>
      item.id === contact.id ? contact : item);
    setContacts(updateContacts);
    saveState(updateContacts);
    setContactForEdit(contact);
  }

  function saveContact(contact) {
    if (!contact.id) {
      createContact(contact);
    } else {
      updateContact(contact);
    }
  }

  function addNewContact() {
    setContactForEdit(createEmptyContact());
  }

  function deleteContact(id) {
    const delContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(delContacts);
    saveState(delContacts);
    setContactForEdit(createEmptyContact());
  }

  return (
    <div className="container">
      <h1 className="header">Contact List</h1>
      <div className="main">
        <ContactList
          contacts={contacts}
          onDelete={deleteContact}
          onAddContact={addNewContact}
          onEditContact={selectContact}
        />
        <ContactForm
          contactForEdit={contactForEdit}
          onSubmit={saveContact}
          onDelete={deleteContact}
        />
      </div>
    </div>
  );
}

export default App;
