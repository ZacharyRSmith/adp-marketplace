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
  render() {
    return (<div>
      <div>What a Reaction!</div>

      <BootstrapTable data={db.employees}>
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
