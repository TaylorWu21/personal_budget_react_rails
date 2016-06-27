import React from 'react';

class BalanceSheet extends React.Component {
	constructor(props) {
		super(props);
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

	handleEditView() {
		this.props.onEditView(this.props);
	}

	handleUpdate(e) {
		e.preventDefault();
		this.props.onUpdate(this.props, this.refs.item.value, this.refs.amount.value);
	}

	handleDelete() {
		this.props.onDelete(this.props);
	}

	render() {
		if(this.props.editView) {
			return(
				<tr>
					<form onSubmit={this.handleUpdate.bind(this)}>
						<input type='text' placeholder='Item' defaultValue={this.props.item} ref='item' required />
						<input type='number' placeholder='Amount' defaultValue={this.props.amount} ref='amount' required />
						<input type='submit' className='waves-effect waves-light btn green' value='Update' />
						<button onClick={this.toggleEdit} className='btn orange'>Back</button>
					</form>
				</tr>
			)
		}
		return(
			<tr className="balance-sheet">
				<td>{this.props.item}</td>
				<td>{this.props.amount}</td>
				<td>
					<button className='btn' onClick={this.handleEditView.bind(this)}>Edit</button>
					<button className='btn red' onClick={this.handleDelete.bind(this)}>Delete</button>
				</td>
			</tr>
		)
	}
}

export default BalanceSheet;





