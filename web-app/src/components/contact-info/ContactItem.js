import React from 'react'
import styles from './contact-items.module.css';

// Reminder: Props in React can be seen parameters in regular JavaScript functions
// The data passed as props can be accessed in such a way:
// props.data1, props.data2, props.data3
export default function ContactItem(props) {
    
    return (
        // When using CSS sheets or CSS modules (CSS modules being scoped CSS sheets)
        // the CSS classes should be defined in the className attribute of the JSX/HTML tags
        <div className={styles.container}>

            <div className={styles.buttons}>
                <form action="http://localhost:3000">
                    <button>
                        ⬅ Contacts
                    </button>
                </form>
                <button>
                    Modifier
                </button>
            </div>

            <div className={styles.box}>
                <img src={props.data.picture} />
            </div>
            <div className={styles.box}>
                <span className={styles.info}>{props.data.lastname} {props.data.firstname}</span>
            </div>
            <div className={styles.subbox}>
                <span className={styles.subtitle}>Numéro</span>
                <span className={styles.label}>{props.data.number}</span>
            </div>
            <div className={styles.subbox}>
                <span className={styles.subtitle}>Adresse Mail</span>
                <span className={styles.label}>{props.data.email}</span>
            </div>
            <div className={styles.subbox}>
                <span className={styles.subtitle}>Adresse</span>
                <span className={styles.label}>{props.data.adress}</span>
            </div>
        </div>
    )
}