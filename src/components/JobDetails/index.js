import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {IoIosLogOut} from 'react-icons/io'
import {BsBagFill} from 'react-icons/bs'
import Header from '../Header'
import SimilarJobDetails from '../SimilarJobDetails'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        title: data.job_details.title,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        rating: data.job_details.rating,
        packagePerAnnum: data.job_details.package_per_annum,
        simialrJobs: data.similar_jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        })),
      }
      this.setState({jobDetails: updatedData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderFailure = () => (
    <>
      <Header />
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="fail-img"
        />
        <h1 className="fail-head">Oops! Something Went Wrong</h1>
        <p className="fail-para">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="logout"
          onClick={() =>
            this.setState({status: apiStatus.progress}, this.getData)
          }
        >
          Retry
        </button>
      </div>
    </>
  )

  getSkill = details => {
    const {imageUrl, name} = details
    return (
      <li className="job-container sk" key={name}>
        <img src={imageUrl} className="skill-img" alt={name} />
        <p className="skill">{name}</p>
      </li>
    )
  }

  renderDetails = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      simialrJobs,
    } = jobDetails
    return (
      <>
        <Header />
        <div className="det-bg">
          <div className="li">
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
            <div className="des-con">
              <h1 className="salary">Description</h1>
              <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
                Visit <IoIosLogOut />
              </a>
            </div>
            <p className="description">{jobDescription}</p>
            <h1 className="salary">Skills</h1>
            <ul className="skill-container">
              {skills.map(each => this.getSkill(each))}
            </ul>
            <h1 className="salary">Life at Company</h1>
            <div className="life-container">
              <p className="para">{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="life-img"
              />
            </div>
          </div>
          <h1 className="salary mb">Similar Jobs </h1>
          <ul className="sim-container">
            {simialrJobs.map(each => (
              <SimilarJobDetails details={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {status} = this.state
    switch (status) {
      case apiStatus.failure:
        return this.renderFailure()
      case apiStatus.success:
        return this.renderDetails()
      case apiStatus.progress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
          </div>
        )
      default:
        return null
    }
  }
}

export default JobDetails
