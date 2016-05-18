const App = React.createClass({
  getInitialState () {
    return { employees: [] };
  },

  componentDidMount () {
    $.ajax({
      url: `${window.location.origin}/api/employee`,
      dataType: 'json',
      success: employees => {
        this.setState({ employees });
      },
      error: (xhr, status, err) => {
        alert('There was an error getting employee data. Please try refreshing the page.');
      }
    });
  },

  handleAfterInsertRow (row) {
    row.employerId = 1;

    $.ajax({
      type: 'POST',
      url: `${window.location.origin}/api/employee`,
      data: JSON.stringify(row),
      contentType: 'application/json; charset=UTF-8',
      error: (xhr, status, err) => {
        alert(`Oh noz!! There was an error creating that employee. ` +
          `Please note that while they show up on this page, ` +
          `they do not exist in the database! : /`);
       }
    });
  },

  render () {
    return (<div>
      <div>What a Reaction!</div>

      <BootstrapTable
        data={this.state.employees}
        pagination={true}
        insertRow={true}
        options={{
          afterInsertRow: this.handleAfterInsertRow
        }}>
        <TableHeaderColumn dataField="name" isKey={true}>
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="email">
          Email
        </TableHeaderColumn>
        <TableHeaderColumn dataField="phoneNumber">
          Phone Number
        </TableHeaderColumn>
      </BootstrapTable>
    </div>);
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
