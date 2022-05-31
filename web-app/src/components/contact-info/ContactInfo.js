import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import ContactItem from './ContactItem';
import styles from "./contact-items.module.css";


export default function ContactInfo() {

  // useParems function from the react-router-dom library
  // can be used to retrieve parameters from the URL 
  let { id } = useParams();

  // Definition of the state
  const [contacts, setContacts] = useState([]);

  // API calls is made as soon as the component is rendered
  useEffect(() => {
    fetch("/contact/"+id)
      .then(data => data.json())
      .then(data => {
          setContacts(data)
      })
  }, [])

  // Need to check if the state info already fetched successfully the data or not
  // Info is initially equals to null, when the data is fetched info value will be updated
  // Since it's a state, when its value changes the JSX below will be re-rendered

    const items = contacts.map(user => {
        const id = user.id;
        const route = "/contact/" + id;
        return (
            <div>
                <ContactItem data={user} />
            </div>
        );
    });

    if (contacts.length > 0) {
        return (
            <div>
                {items}
            </div>
        )
    }

    else {
        <p>Conversation are being fetched...</p>
    }
}