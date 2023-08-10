import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createContact,
  deleteContact,
  updateContact,
} from "../../store/actions/actions";
import API from "../../contact-servis";
import "./ContactForm.css";

function ContactForm() {
  const contactForEdit = useSelector((store) => store.contactForEdit);

  const [contact, setContact] = useState(contactForEdit);
  const dispatch = useDispatch();

  useEffect(() => {
    setContact(contactForEdit);
  }, [contactForEdit]);

  function onInputChange(event) {
    const { name, value } = event.target;
    setContact((contact) => ({
      ...contact,
      [name]: value,
    }));
  }

  function onClearField(event) {
    const sibling = event.target.parentNode.firstChild;
    setContact((contact) => ({
      ...contact,
      [sibling.name]: "",
    }));
  }

  function onFormSubmit(event) {
    event.preventDefault();
    if (!contact.id) {
      API.post("/", contact).then(({ data }) => {
        dispatch(createContact(data));
      });
    } else {
      API.put(`/${contact.id}`, contact).then(({ data }) =>
        dispatch(updateContact(data))
      );
    }
  }

  function onContactDelete() {
    API.delete(`/${contact.id}`).then(({ status }) => console.log(status));
    dispatch(deleteContact(contact.id));
  }

  return (
    <form id='contact-form' onSubmit={onFormSubmit}>
      <div className='form-container'>
        <div className='contact-info'>
          <input
            type='text'
            className='text-field'
            placeholder='First name'
            name='firstName'
            value={contact.firstName}
            onChange={onInputChange}
          />
          <span className='clear' onClick={onClearField}>
            X
          </span>
        </div>
        <div className='contact-info'>
          <input
            type='text'
            className='text-field'
            placeholder='Last name'
            name='lastName'
            value={contact.lastName}
            onChange={onInputChange}
          />
          <span className='clear' onClick={onClearField}>
            X
          </span>
        </div>
        <div className='contact-info'>
          <input
            type='email'
            className='text-field'
            placeholder='Email'
            name='email'
            value={contact.email}
            onChange={onInputChange}
          />
          <span className='clear' onClick={onClearField}>
            X
          </span>
        </div>
        <div className='contact-info'>
          <input
            type='text'
            className='text-field'
            placeholder='Phone'
            name='phone'
            value={contact.phone}
            onChange={onInputChange}
          />
          <span className='clear' onClick={onClearField}>
            X
          </span>
        </div>
      </div>
      <div className='btns'>
        <button id='save' type='submit'>
          Save
        </button>
        {contact.id ? (
          <button id='delete' type='button' onClick={onContactDelete}>
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}

export default ContactForm;
