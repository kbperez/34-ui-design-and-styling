import React from 'react';
import {connect} from 'react-redux';
import {expenseUpdate, expenseDelete} from '../../actions/expense-actions';
import ExpenseForm from '../expense-form/expense-form';
import {renderIf} from '../../lib/utils';


class ExpenseItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // expenses: this.props.expenses ? this.props.expenses : {},
      editing: false,
    };

    this.handleEditing = this.handleEditing.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEditing() {
    this.setState({editing: !this.state.editing});
  }

  handleDelete() {
    this.props.expenseDelete(this.props.expenses);
  }

  handleUpdate(expense) {
    this.setState({editing: !this.state.editing});
    this.props.expenseUpdate(expense);
  }


  render() {
    return (
      <section className="expense-item" key={this.props.expenses._id}>
        <h4 onDoubleClick={this.handleEditing}>Expense: {this.props.expenses.spend}</h4>
        <p>Spent: {this.props.expenses.cost}</p>
        <button type="button" onClick={this.handleDelete}>{this.props.buttonText}</button>
        {renderIf(this.state.editing,
          <ExpenseForm
            className="expense-update"
            buttonText="Expense Update"
            expenses={this.props.expenses}

            onComplete={this.handleUpdate}/>)}
      </section>
    );
  }
}

let mapStateToProps = () => ({});
let mapDispatchToProps = (dispatch, getState) => ({
  expenseUpdate: expense => dispatch(expenseUpdate(expense)),
  expenseDelete: expense => dispatch(expenseDelete(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseItem);
