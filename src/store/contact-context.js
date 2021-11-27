import React from 'react';

const ContactContext = React.createContext({
    contacts: [],
    addContact: (contact) =>{},
    removeContact: (contact) =>{},
    updateContact: (contact) =>{},
});

export default ContactContext;