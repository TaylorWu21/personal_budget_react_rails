import React from 'react';

class BalanceSheet extends React.Component {
	constructor(props) {
		super(props);
		this.state = { balanceSheet: null, editView: true};
		this.toggleEdit = this.toggleEdit.bind(this);
	}

	componentWIllMount() {
		$.ajax({
			url: `/api/balance_sheets/${this.prop.id}`,
			type: 'GET',
			dataType: 'JSON'
		}).done( balanceSheet => {
			this.setState({ balanceSheet });
		}).fail( data => {
			console.log(data);
		});
	}

	toggleEdit() {
		this.setState({ editView: !this.state.editView });
	}

	handleEdit(e) {
		e.preventDefault();
		let item = this.refs.item.value;
		let amount = this.refs.amount.value;
		$.ajax({
			url: `{/api/BalanceSheets/${this.state.balance_sheet.id}}`,
			type: 'PUT',
			data: { balanceSheet: { item, amount } },
			dataType: 'JSON'
		}).done( balance_sheet => {
			this.setState({ balanceSheet, editView: false})
		}).fail( data => {
			console.log(data);
		});
	}

	render() {
		if(this.state.editView) {
			return(
				<div>
					<h5>Edit Item</h5>
						<form>
							<input placeholder="Item" defaultValue={this.state.props.balance_sheets.item} ref='item' />
							{/*<input placeholder='Amount' defaultValue={this.state.props.balanceSheet.amount} ref='amount' />*/}
							<input />
						</form>
				</div>
			)
		} else {
			return(
				<p>hi</p>
			)
		}
	}
}

export default BalanceSheet;





