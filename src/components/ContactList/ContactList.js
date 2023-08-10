import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactItem from "../ContactItem/ContactItem";
import { Watch } from "react-loader-spinner";
import {
  addNewContact,
  deleteContact,
  selectContact,
  getContacts,
} from "../../store/actions/actions";
import API from "../../contact-servis";
import "./ContactList.css";
import store from "../../store";

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector((store) => store.contacts);

  useEffect(() => {
    API.get("/")
      .then(({ data }) => dispatch(getContacts(data)))
      .catch(({ statusText }) => console.log(statusText));
  }, [dispatch]);

  function onAddNewContact() {
    dispatch(addNewContact());
  }

  return (
    <div className='list-container'>
      <div className='item-container'>
        {!contacts ? (
          <Watch
            heigth='500'
            width='500'
            radius='100'
            color='teal'
            arialable='watch-loading'
            wrapperStyle={{}}
            wrapperClassName=''
            visible={true}
          />
        ) : (
          contacts.map((contact) => {
            return (
              <ContactItem
                key={contact.id}
                contact={contact}
                onDelete={deleteContact}
                onEdit={selectContact}
              />
            );
          })
        )}
      </div>
      <button id='new' onClick={onAddNewContact}>
        New
      </button>
    </div>
  );
}

export default ContactList;
