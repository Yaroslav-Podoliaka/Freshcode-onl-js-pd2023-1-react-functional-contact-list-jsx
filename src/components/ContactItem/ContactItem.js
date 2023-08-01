import React, { useEffect } from 'react';
import './ContactItem.css';

function ContactItem({ contact, onDelete, onEdit }) {

  useEffect(() => {
    onContactEdit(contact)
  }, [contact])

  function onItemDelete() {
    onDelete(contact.id);
  }

  function onContactEdit(contact) {
    onEdit(contact);
  }

  return (
    <div className="contact-item" onDoubleClick={onContactEdit}>
      <p className="content">
        {contact.firstName} {contact.lastName}
      </p>
      <span className="delete-btn" onClick={onItemDelete}>
        X
      </span>
    </div>
  );
}

export default ContactItem