import './index.css'
import {Component} from 'react'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class FiltersGroup extends Component {
  render() {
    const {changePack, changeType} = this.props
    return (
      <div>
        <h1 className="salary">Type of Employment</h1>
        <ul className="filter-list-container">
          {employmentTypesList.map(each => (
            <li className="filter-item" key={each.employmentTypeId}>
              <input
                type="checkbox"
                onChange={() => changeType(each.employmentTypeId)}
                id={each.employmentTypeId}
              />
              <label className="label" htmlFor={each.employmentTypeId}>
                {each.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="line" />
        <h1 className="salary ">Salary Range</h1>
        <ul className="filter-list-container">
          {salaryRangesList.map(each => (
            <li className="filter-item" key={each.salaryRangeId}>
              <input
                type="radio"
                id={each.salaryRangeId}
                onChange={() => changePack(each.salaryRangeId)}
                name="salary"
                value={each.salaryRangeId}
              />
              <label htmlFor={each.salaryRangeId} className="label">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default FiltersGroup
