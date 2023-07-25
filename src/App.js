import React, { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import "./App.css";

function App() {
  // state = {
  //   contacts: [],
  //   contactForEdit: this.createEmptyContact(),
  // };

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

  //   selectContact = (contact) => {
  //   this.setState({
  //     contactForEdit: contact,
  //   });
  // };

  function selectContact(contact) {
    setContactForEdit(contact);
  }

  // createContact(contact) {
  //   contact.id = Date.now();
  //   this.setState((state) => {
  //     const contacts = [...state.contacts, contact];
  //     this.saveState(contacts);
  //     return {
  //       contacts,
  //       contactForEdit: this.createEmptyContact(),
  //     };
  //   });
  // };

  function createContact(contact) {
    contact.id = Date.now();
    const newContacts = [...contacts, contact];
    setContacts(newContacts);
    saveState(newContacts);
    setContactForEdit(createEmptyContact());
  }

  // function updateContact(contact) {
  //   this.setState((state) => {
  //     const contacts = state.contacts.map((item) =>
  //       item.id === contact.id ? contact : item
  //     );
  //     this.saveState(contacts);
  //     return {
  //       contacts,
  //       contactForEdit: contact,
  //     };
  //   });
  // }

  function updateContact(contact) {
    const updateContacts = contacts.map((item) =>
      item.id === contact.id ? contact : item);
    setContacts(updateContacts);
    saveState(updateContacts);
    setContactForEdit(contact);
  }

  // saveContact = (contact) => {
  //   if (!contact.id) {
  //     this.createContact(contact);
  //   } else {
  //     this.updateContact(contact);
  //   }
  // };

  function saveContact(contact) {
    if (!contact.id) {
      createContact(contact);
    } else {
      updateContact(contact);
    }
  }

  // addNewContact = () => {
  //   this.setState({
  //     contactForEdit: this.createEmptyContact(),
  //   });
  // };

  function addNewContact() {
    setContactForEdit(createEmptyContact());
  }

  // deleteContact = (id) => {
  //   this.setState((state) => {
  //     const contacts = state.contacts.filter((contact) => contact.id !== id);
  //     this.saveState(contacts);
  //     return {
  //       contacts,
  //       contactForEdit: this.createEmptyContact(),
  //     };
  //   });
  // };

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
