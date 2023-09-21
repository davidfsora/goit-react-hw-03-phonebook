import React, { Component } from 'react';
import styles from '../Styles.module.css';

export default class ContactList extends Component {
	render() {
		return (
			<div>
				<ul>
					{this.props.contacts.map((contact) =>
						<li key={contact.id}>{contact.name} : {contact.number}
							<button onClick={() => this.props.deleteContact(contact.id)} className={styles.button}>Delete</button>
						</li>
					)}
				</ul>
			</div>
		);
	}
}
