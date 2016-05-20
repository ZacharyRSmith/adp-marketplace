# ADP Marketplace

> My solution to a coding challenge from ADP Marketplace.

> Live site at: https://adp-challenge.herokuapp.com/

> The instructions are purposefully not shown.

> Employers cannot be created from UI or API. Two test users exist, with emails:

- 'user1@example.com'
- 'user2@example.com'

each with password: 'password'.

## Usage

### Installing Dependencies

From within the root directory:

```sh
npm install
```

## Tests

> Some tests to do by hand

From API:

- Create employee
- Read employee
- Update employee
- Delete employee

From UI:

- Create employee
- Read employee
- Update employee
- Delete employee

## Notes

### Data schema

There are many Employers. Employer has many Employees.

There are no associations between the employers. For example, if an employee exists in two employers' databases, that data is maintained separately.

#### Employee info

Notes: Validate no info, including employee name (assume no name collisions), except employer_id.

- employer_id
- name (assume no name collisions)
- phone num
- email
- TIMESTAMPS (possible feature)
