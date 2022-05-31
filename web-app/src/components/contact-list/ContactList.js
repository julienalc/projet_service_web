import React, { useState, useEffect } from 'react'
import ContactItem from './ContactItem';
import { Link } from "react-router-dom";
import styles from './contact-items.module.css';

export default function ContactList() {

    
    // Declaration of the component's state
    // Reminder: the difference between a regular variable
    // and a state is when states changes, the component is re-rendered
    // meaning the JSX (HTML) will be too
    const [contacts, setContacts] = useState([]);

    // Reminder: the useEffect hook let us define piece of code that should be
    // executed at a specific moment of the component life-cycle
    // useEffect expects two paramters, one is a function (an anomymous function for better syntax)
    // and a list of variable/state that should trigger the execution of the function passed in the
    // first parameter.
    // If the second paramter is an empty list (like it's the case in the useEffect hook bellow),
    // annonymous function passed as the first parameter will be executed once the component is rendered
    // It's usually a good place to make API calls.
    useEffect(() => {
        fetch("/contact")
            .then(data => data.json())
            .then(data => setContacts(data));
    }, []);


    // Using an array.map() to map/transform a list of wine (data)
    // to a list of <li><Link to={route}><ContactItem data={wine}/></Link></li>
    // This usually how we display lists of items in a React application

    const items = contacts.map(user => {
        const id = user.id;
        const route = "/contact/" + id;
        return (
            <div className={styles.container}>
                <Link to={route}><ContactItem data={user} /></Link>
            </div>
        );
    });

    if (contacts.length > 0) {
        return (
            <div>
                <div className={styles.title}>Contacts</div>
                <div>
                    {items}
                </div>
            </div>

        )
    }

    else {
        <p>Conversation are being fetched...</p>
    }
}