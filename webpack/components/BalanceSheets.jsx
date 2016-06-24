import React from 'react';

class BalanceSheets extends React.Component {
	constructor(props) {
		super(props);
		this.state = { balance_sheets: [] };
	}

	componentWillMount() {
		$.ajax({
			url: '/api/balance_sheets',
			type: 'GET',
			dataType: 'JSON'
		}).done( balance_sheets => {
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
			<div>
				<h3>New Balance</h3>
				<form onSubmit={this.addBalance.bind(this)}>
					<input type='text' placeholder='Enter Item' ref='item' required />
					<input type='number' placeholder='Enter Amount' ref='amount' required />
					<input type='submit' className='btn' />
				</form>
			</div>
		)
	}

	displayBalance() {
		let balanceSheets = this.state.balance_sheets.map( balanceSheet => {
			return(
				<tr key={`balance_sheets-${balanceSheet.id}`}>
					<td>{balanceSheet.item}</td>
					<td>{balanceSheet.amount}</td>
					<td>
						<button className='btn '>Edit</button>
						<button className='btn red' onClick={() => this.deleteBalance(balanceSheet.id)}>Delete</button>
					</td>
				</tr>
			);
		});
		return(
			<div>
				<table>
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
				<div className='container'>
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












