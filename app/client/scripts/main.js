var db = { employees: [] };
// BEGIN MOCK DATA
var mockEmployee1 = {
  employerId: 1,
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phoneNumber: '(555) 555-0001'
};
var mockEmployee2 = {
  employerId: 1,
  name: 'Jane Doe\'s Sister',
  email: 'janes.sister@example.com',
  phoneNumber: '(555) 555-0002'
};
var mockEmployee3 = {
  employerId: 1,
  name: 'Jane Doe\'s Brother',
  email: 'janes.brother@example.com',
  phoneNumber: '(555) 555-0003'
};
db.employees = [
  mockEmployee1,
  mockEmployee2,
  mockEmployee3
];
// END MOCK DATA


const App = React.createClass({
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
        data={db.employees}
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
