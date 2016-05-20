const LoginForm = React.createClass({
  getInitialState () {
    return { email: '', password: '' };
  },

  handleChangeOnEmail (e) {
    this.setState({ email: e.target.value });
  },

  handleChangeOnPassword (e) {
    this.setState({ password: e.target.value });
  },

  onSubmitOfAuth (e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    if (!email || !password) return;

    this.props.onSubmitOfAuth({ email, password });
    this.setState({ email: '', password: '' });
  },

  render () {
    return (<form className="form" onSubmit={this.onSubmitOfAuth}>
      <div className="form-group">
        <input
          className="btn-block"
          id="email"
          type="text"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChangeOnEmail}
        />
      </div>
      <div className="form-group">
        <input
          className="btn-block"
          id="password"
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChangeOnPassword}
        />
      </div>
      <input
        className="btn btn-primary btn-block"
        type="submit"
        value="Log in"
      />
    </form>);
  }
});

const NavBar = React.createClass({
  handleClickOnInstructions (e) {
    e.preventDefault();
    alert(`
      Welcome! ( :

      Please login with the credentials provided to you by admin.

      - Add new employees by clicking on 'New'

      - Edit employees by double-clicking their email or phone number cell, changing info, then pressing enter

      - Delete employees by selecting their rows and clicking 'Delete'`);
  },

  render () {
    return(<nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a href="#" className="navbar-brand">Kontact</a>
        </div>

        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#" onClick={this.handleClickOnInstructions}>Instructions</a>
            </li>
            <li>
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                Login<span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <LoginForm onSubmitOfAuth={this.props.handleSubmitOfAuth} />
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>);
  }
});

const App = React.createClass({
  getInitialState () {
    return {
      employees: [],
      employerId: null,
    };
  },

  handleAfterDeleteRow (rowKeys) {
    if (!this.state.employerId) return alert('No signed-in employer found! This data will not persist.');
    const data = {
      employerId: this.state.employerId,
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
    if (!this.state.employerId) return alert('No signed-in employer found! This data will not persist.');
    row.employerId = this.state.employerId;

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
    if (!this.state.employerId) return alert('No signed-in employer found! This data will not persist.');

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

  handleSubmitOfAuth ({ email, password }) {
    $.ajax({
      type: 'POST',
      url: `${window.location.origin}/api/employee/auth`,
      data: JSON.stringify({ email, password }),
      contentType: 'application/json; charset=UTF-8'
    })
      .done(({ employees, employerId }) => {
        this.setState({ employees, employerId });
      })
      .fail(() => {
        this.setState({ employees: [] });
        alert('There was an error with authentication! D :');
      });
  },

  render () {
    return (<div>
      <header>
        <NavBar handleSubmitOfAuth={this.handleSubmitOfAuth} />
      </header>

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
