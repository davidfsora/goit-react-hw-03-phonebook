import React, { Component } from "react";
import styles from '../Styles.module.css'

export default class SearchFilter extends Component {
	render() {
		return (
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				padding: '20px',
				gap: '10px',
			}}>
				<p>Find contacts by name</p>
				<input
					type="text"
					name="filter"
					value={this.props.filter}
					onChange={this.props.filterSearch}
					className={styles.input}
				/>
			</div>
		);
	}
}

