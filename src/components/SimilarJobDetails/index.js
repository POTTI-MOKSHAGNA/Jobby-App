import './index.css'
import {Link} from 'react-router-dom'
import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {BsBagFill} from 'react-icons/bs'

const SimilarJobDetails = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = details
  return (
    <li className="li mb w">
      <Link to={`/jobs/${id}`} className="list">
        <div className="job-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="cmp-logo"
          />
          <div>
            <h1 className="company-title">{title}</h1>
            <div className="job-container">
              <FaStar color="#fcc035" />
              <p className="rating"> {rating}</p>
            </div>
          </div>
        </div>
        <h1 className="salary">Description</h1>
        <p className="description">{jobDescription}</p>
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
      </Link>
    </li>
  )
}

export default SimilarJobDetails
