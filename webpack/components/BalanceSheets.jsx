import React from 'react';
import BalanceSheet from './BalanceSheet';
import { Link } from 'react-router'

class BalanceSheets extends React.Component {
	constructor(props) {
		super(props);
		this.state = { balance_sheets: [], editView: false };
		this.toggleEdit = this.toggleEdit.bind(this);
	}

	componentWillMount() {
		$.ajax({
			url: '/api/balance_sheets',
			type: 'GET',
			dataType: 'JSON'
		}).done( balance_sheets => {
			balance_sheets = balance_sheets.map(function(balance_sheet) {
				balance_sheet['editView'] = false;
				return balance_sheet;
			});
			this.setState({ balance_sheets });
		}).fail( data => {
			console.log(data);
		});
	}

	deleteBalance(id) {
		$.ajax({
			url: `/api/balance_sheets/${id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( data => {
			let balanceSheets = this.state.balance_sheets;
			let index = balanceSheets.findIndex( b => b.id === id);
			this.setState({
				balance_sheets: [
					...balanceSheets.slice(0, index),
					...balanceSheets.slice(index + 1, balanceSheets.length)
				]
			})
		}).fail( data => {
			console.log(data)
		})
	}

	addBalance(e) {
		e.preventDefault();
		$.ajax({
			url: '/api/balance_sheets',
			type: 'POST',
			data: { balance_sheet: { item: this.refs.item.value, amount: this.refs.amount.value }},
			dataType: 'JSON'
		}).done( balance_sheet => {
			this.setState({ balance_sheets: [{...balance_sheet}, ...this.state.balance_sheets] })
			this.refs.item.value = null;
			this.refs.amount.value = null;
			console.log(this.state.balance_sheets)
		}).fail( data => {
			console.log(data)
		});
	}

	addForm() {
		return(
			<div className='center'>
				<h3>New Expense/Income</h3>
				<form onSubmit={this.addBalance.bind(this)}>
					<input type='text' placeholder='Enter Item' ref='item' required />
					<input type='number' placeholder='Enter Amount' ref='amount' required />
					<input type='submit' className='waves-effect waves-light btn green' />
				</form>
			</div>
		)
	}

	toggleEdit() {
		console.log('clicked');
		this.setState({ editView: !this.state.editView });
	}

	handleEdit(e) {
		e.preventDefault();
		let item = this.refs.item.value;
		let amount = this.refs.amount.value;
		$.ajax({
			url: `{/api/BalanceSheets/${this.state.balance_sheets.id}}`,
			type: 'PUT',
			data: { balanceSheet: { item, amount } },
			dataType: 'JSON'
		}).done( balance_sheet => {
			this.setState({ balanceSheet, editView: false})
		}).fail( data => {
			console.log(data);
		});
	}

	displayBalance() {
		let balanceSheets = this.state.balance_sheets.map( balanceSheet => {
			return(
				<tr key={`balanceSheets-${balanceSheet.id}`}>
					<td>{balanceSheet.item}</td>
					<td>{balanceSheet.amount}</td>
					<td>
						<button onClick={this.toggleEdit} className='btn'>Edit</button>
						<button className='btn red' onClick={() => this.deleteBalance(balanceSheet.id)}>Delete</button>
					</td>
				</tr>
			);
		});
		return(
			<div>
				<table className='bordered striped centered responsive-table'>
				<thead>
					<tr>
						<th>Items:</th>
						<th>Amount:</th>
						<th>Actions:</th>
					</tr>
					</thead>
					<tbody>
						{balanceSheets}
					</tbody>
				</table>
			</div>
		)
	}

	render() {
		if(this.state.editView) {
			return(
				<div>
					<h5>Edit Item</h5>
						<form onSubmit={this.handleEdit.bind(this)}>
							<input placeholder="Item" defaultValue={this.state.balance_sheets.item} ref='item' />
							<input placeholder='Amount' defaultValue={this.state.balance_sheets.amount} ref='amount' />
							<input type='submit' value='Update Balance' className='btn green' />
							<button type='button' onClick={this.toggleEdit} className='btn orange'>Back</button>
						</form>
				</div>
			)
		} else {
			return(
				<div>
					<div>
						{this.addForm()}
					</div>
					<div>
						{this.displayBalance()}
					</div>
				</div>
			)
		}
	}
}

export default BalanceSheets












