import './index.css'
import {Link} from 'react-router-dom'
import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {BsBagFill} from 'react-icons/bs'

const JobCard = props => {
  const {details} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    packagePerAnnum,
    employmentType,
    jobDescription,
  } = details
  return (
    <Link to={`/jobs/${id}`} className="list">
      <li className="li">
        <div className="job-container">
          <img src={companyLogoUrl} alt="company logo" className="cmp-logo" />
          <div>
            <h1 className="company-title">{title}</h1>
            <div className="job-container">
              <FaStar color="#fcc035" />
              <p className="rating"> {rating}</p>
            </div>
          </div>
        </div>
        <div className="details-container">
          <div className="job-container">
            <div className="job-container">
              <FaMapMarkerAlt />
              <p className="detail"> {location}</p>
            </div>
            <div className="job-container">
              <BsBagFill />
              <p className="detail">{employmentType}</p>
            </div>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="salary">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
