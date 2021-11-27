import React, { useState, useReducer, useEffect, useCallback } from "react";
import ContactContext from "./contact-context";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
const initialState = {
  contacts: [],
};
const contactReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      console.log(action.payload);
      return {
        contacts: [...action.payload],
      };
    case "DELETE_CONTACT":
      return {
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        ),
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [
          action.payload,
          ...state.contacts,
        ]
      };
      case "UPDATE_CONTACT":
        return {
          ...state,
          contacts: state.contacts.map(contact => {
            if(String(contact.id) === String(action.payload.id)) {
              return action.payload;
            }
            else {
              return contact;
            }
          })
        }
    default:
      return state;
  }
};

export default function ContactProvider(props) {
  const [contactState, dispatchContact] = useReducer(
    contactReducer,
    initialState
  );

  const fetchContact = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (response) {
        const loadedContact = [];
        for (let key in response.data) {
          loadedContact.push({
            id: response.data[key].id,
            name: response.data[key].name,
            email: response.data[key].email,
            phone: response.data[key].phone,
          });
        }
        dispatchContact({ type: "FETCH_SUCCESS", payload: [...loadedContact] });
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    }
  }, []);

  useEffect(() => {
    fetchContact();
  }, [fetchContact]);

  const removeContactHandler = async (contact) => {
    let response = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${contact.id}`
    );
    console.log(response.data);
    if (response.status >= 200 && response.status < 300) {
      dispatchContact({ type: "DELETE_CONTACT", payload: contact });
    }
  };

  const addContactHandler = async (contact) => {
    let response = await axios.post(
      `https://jsonplaceholder.typicode.com/users`,contact);
    if (response.status >= 200 && response.status < 300) {
      dispatchContact({ type: "ADD_CONTACT", payload: {
        ...response.data, id: uuidv4(),
      } });
    }
  };

  const updateContactHandler = async (contact) =>{
    if(+contact.id >=1 && +contact.id <=10){
      let response = await axios.put(`https://jsonplaceholder.typicode.com/users/${contact.id}`,{
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
    })
    if (response.status >= 200 && response.status < 300) {
      dispatchContact({ type: "UPDATE_CONTACT", payload: {
        ...contact,
      } });
    }
    }
    else{
      dispatchContact({ type: "UPDATE_CONTACT", payload: {
        ...contact,
      } });
    }
  }


  console.log(contactState);
  const contactContext = {
    contacts: [...contactState.contacts],
    addContact: addContactHandler,
    removeContact: removeContactHandler,
    updateContact: updateContactHandler,
  };
  return (
    <ContactContext.Provider value={contactContext}>
      {props.children}
    </ContactContext.Provider>
  );
}
