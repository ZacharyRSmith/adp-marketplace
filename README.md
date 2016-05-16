# ADP Marketplace

> My solution to a coding challenge from ADP Marketplace. The instructions are purposefully not shown.

## Usage

### Installing Dependencies

From within the root directory:

```sh
npm install
```

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
