import React, { useState, useEffect } from 'react';
import FormComponent from 'components/FormComponent/FormComponent';
import ListComponent from './ListComponent/ListComponent';
import Filter from 'components/Filter/Filter';
import Notiflix from 'notiflix';

import { nanoid } from 'nanoid';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    try {
      const contactsList = JSON.parse(localStorage.getItem('contacks'));
      if (contactsList) {
        setContacts(contactsList);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('contacks', JSON.stringify(contacts));
  }, [contacts]);
  const submitForm = ({ name, number }) => {
    if (findContackt(name).length) {
      Notiflix.Notify.failure(`${name} is already in contacts.`);
    } else {
      const id = nanoid();
      setContacts([...contacts, { id, name, number }]);
    }
  };
  const changeFilter = e => {
    setFilter(e.target.value);
  };
  const findContackt = name => {
    const alignContact = name.toLowerCase();

    return contacts.filter(el => {
      return el.name.toLowerCase().includes(alignContact);
    });
  };
  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(el => el.id !== contactId));
  };
  const filterContackt = findContackt(filter);
  return (
    <div className="container">
      <h1>Phonebook</h1>
      <FormComponent onSubmit={submitForm}></FormComponent>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter}></Filter>

      {filterContackt.length > 0 && (
        <ListComponent
          contacts={filterContackt}
          onDeleteContact={deleteContact}
        ></ListComponent>
      )}
    </div>
  );
}
