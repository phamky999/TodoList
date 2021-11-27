import React, { useContext } from "react";
import ContactContext from "../../store/contact-context";
import ContactItem from "./ContactItem";
import "../../assets/css/Contacts.css";
export default function ContactList() {
  const ContactCtx = useContext(ContactContext);

  const deleteItemHandler = (item) => {
    ContactCtx.removeContact(item);
  };
  return (
    <div className="contact-box">
      <div className="title">
        <h3>Contact List</h3>
        <span></span>
      </div>
      <div className="body">
        {ContactCtx.contacts.length === 0 ? (
          <p>Found no contacts</p>
        ) : (
          ContactCtx.contacts.map((item) => {
            return (
              <ContactItem
                key={item.id}
                id={item.id}
                name={item.name}
                phone={item.phone}
                email={item.email}
                onDelete={deleteItemHandler.bind(null, item)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
