import ACTION_TYPES from "./actionTypes";

export const addNewContact = (payload) => {
  return {
    type: ACTION_TYPES.ADD_NEW_CONTACT,
    payload,
  };
}

export const deleteContact = (payload) => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT,
    payload,
  };
};

export const createContact = (payload) => {
  return {
    type: ACTION_TYPES.POST_NEW_CONTACT,
    payload,
  };
};

export const updateContact = (payload) => {
  return {
    type: ACTION_TYPES.PUT_CONTACT,
    payload,
  };
};

export const selectContact = (payload) => {
  return {
    type: ACTION_TYPES.SELECT_CONTACT,
    payload,
  };
};

export const getContacts = (payload) => {
  return {
    type: ACTION_TYPES.GET_CONTACTS,
    payload,
  };
};
