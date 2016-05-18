const App = React.createClass({
  getInitialState () {
    return { employees: [] };
  },

  componentDidMount () {
    $.get(`${window.location.origin}/api/employee`, employees => {
      this.setState({ employees });
    })
      .fail(() => {
        alert('There was an error getting employee data. Please try refreshing the page.');
      });
  },

  handleAfterDeleteRow (rowKeys) {
    const data = {
      employerId: 1,
      employeeNames: rowKeys
    };

    $.ajax({
      type: 'DELETE',
      url: `${window.location.origin}/api/employee`,
      data: JSON.stringify(data),
      contentType: 'application/json; charset=UTF-8'
    })
      .fail(() => {
        alert('There was an error deleting employee data. ' +
          'What you see might not reflect what is currently in the database.');
      });
  },

  handleAfterInsertRow (row) {
    row.employerId = 1;

    $.ajax({
      type: 'POST',
      url: `${window.location.origin}/api/employee`,
      data: JSON.stringify(row),
      contentType: 'application/json; charset=UTF-8'
    })
      .fail(() => {
        alert(`Oh noz!! There was an error creating that employee. ` +
          `Please note that while they show up on this page, ` +
          `they do not exist in the database! : (`);
      });
  },

  handleAfterSaveCell (row, cellName, cellValue) {
    $.ajax({
      type: 'PUT',
      url: `${window.location.origin}/api/employee`,
      data: JSON.stringify(row),
      contentType: 'application/json; charset=UTF-8'
    })
      .fail(() => {
        alert('There was an error editing employee data. ' +
          'What you see might not reflect what is currently in the database.');
      });
  },

  render () {
    return (<div>
      <div>What a Reaction!</div>

      <BootstrapTable
        cellEdit={{ afterSaveCell: this.handleAfterSaveCell, mode: "dbclick" }}
        data={this.state.employees}
        deleteRow={true}
        insertRow={true}
        pagination={true}
        selectRow={{ mode: "checkbox" }}
        options={{
          afterDeleteRow: this.handleAfterDeleteRow,
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
