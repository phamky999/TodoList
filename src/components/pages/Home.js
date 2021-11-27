import React from 'react'
import ContactList from '../contacts/ContactList'

export default function Home() {
    return (
        <div className="container" style={{minHeight: '100vh'}}>
            <ContactList />
        </div>
    )
}
