import React from 'react';
import BalanceSheet from './BalanceSheet';
import { Link } from 'react-router'

class BalanceSheets extends React.Component {
	constructor(props) {
		super(props);
		this.state = { balance_sheets: [] };
		this.deleteBalance = this.deleteBalance.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
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

	deleteBalance(balanceSheet) {
		let that = this;
		$.ajax({
			url: `/api/balance_sheets/${balanceSheet.id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( data => {
			let balanceSheets = that.state.balance_sheets;
			let index = balanceSheets.findIndex( b => b.id === balanceSheet.id);
			that.setState({
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

	toggleEdit(balanceSheet) {
		this.state.balance_sheets = this.state.balance_sheets.map(balance => {
			if(balanceSheet.id === balance.id) {
				balance.editView = !balance.editView;
			}
			return balance;
		});
		this.setState(this.state.balance_sheets);
	}

	handleEdit(balanceSheet, item, amount) {
		$.ajax({
			url: `/api/balance_sheets/${balanceSheet.id}`,
			type: 'PUT',
			data: { balance_sheet: {item, amount} },
			dataType: 'JSON'
		}).done( balance_sheet => {
				let balance_sheets = this.state.balance_sheets.map(balance => {
				if(balanceSheet.id === balance.id) {
					balance.editView = !balance.editView;
					balance.item = balance_sheet.item;
					balance.amount = balance_sheet.amount;
				}
				return balance;
			});
			this.setState({ balance_sheets });
		}).fail( data => {
			console.log(data);
		});
	}

	displayBalance() {
		let balanceSheets = this.state.balance_sheets.map( balanceSheet => {
			return(
				<BalanceSheet key={`balance-sheet-${balanceSheet.id}`} {...balanceSheet } onDelete={this.deleteBalance} onEditView={this.toggleEdit} onUpdate={this.handleEdit}/>
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

export default BalanceSheets












