import React from 'react';
import { useDispatch } from 'react-redux';
import API from '../../contact-servis';
import {
  deleteContact,
  selectContact,
} from "../../store/actions/actions";
import './ContactItem.css';

function ContactItem({ contact }) {

  const dispatch = useDispatch();

  function onItemDelete() {
    API.delete(`/${contact.id}`)
      .then(({ status }) => console.log(status));
    dispatch(deleteContact(contact.id));
  }

  function onContactEdit(event) {
    event.stopPropagation()
    dispatch(selectContact(contact));
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