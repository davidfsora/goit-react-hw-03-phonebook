import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from "./ContactForm/ContactForm.jsx";
import SearchFilter from "./SearchFilter/SearchFilter.jsx";
import ContactList from "./ContactList/ContactList.jsx";
export class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			contacts: [],
			name: '',
			number: '',
			filter: ''
		};
	};

	handleAddName = (evt) => {
		this.setState({ name: evt.target.value });
	};

	handleAddNumber = (evt) => {
		this.setState({ number: evt.target.value });
	};
	
	handleAddInfo = (evt) => {
		evt.preventDefault();
		
		if (this.state.name.trim() === '' || this.state.number.trim() === '') return;

		if (this.state.contacts.some((contact) => contact.name === this.state.name)) {
			alert(`${this.state.name} is already in contacts.`);
			return;
		};

		const newContact = {
			id: nanoid(),
			name: this.state.name,
			number: this.state.number,
		};
		
		this.setState((prevState) => ({
			contacts: [...prevState.contacts, newContact],
			name: '',
			number: '',
		}));
	};
	
	handleFilterSearch = (evt) => {
		this.setState({ filter: evt.target.value });
	};

	deleteContact = (id) => {
		this.setState((prevState) => ({
			contacts: prevState.contacts.filter((contact) => contact.id !== id),
		}));
	};

	componentDidMount() {
		const storedContacts = localStorage.getItem('contacts');
		if (storedContacts) {
			this.setState({ contacts: JSON.parse(storedContacts) });
		}
	};

	componentDidUpdate(prevState) {
		if (prevState.contacts !== this.state.contacts) {
			localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
		}
	}
	
	render() {
		const applyFilter = this.state.contacts.filter((contact) =>
			contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
		);
		
		return (
			<div
				style={{
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
					alignItems: 'center',
					fontSize: 20,
					color: '#010101'
				}}
			>
				<h1>Phonebook</h1>
				<ContactForm
					name={this.state.name}
					number={this.state.number}
					handleAddName={this.handleAddName}
					handleAddNumber={this.handleAddNumber}
					handleAddInfo={this.handleAddInfo}
				></ContactForm>
				<h2>Contacts</h2>
				<SearchFilter
					filter={this.state.filter}
					filterSearch={this.handleFilterSearch}
				></SearchFilter>
				<ContactList
					contacts={applyFilter}
					deleteContact={this.deleteContact}
				></ContactList>
			</div>
		);
	}
}
