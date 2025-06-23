import './index.css'
import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    jobData: [],
    status: apiStatus.initial,
    search: '',
    type: [],
    pack: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {search, type, pack} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?search=${search}&minimum_package=${pack}&employment_type=${type.join(
      ',',
    )}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobData: updatedData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderFailure = () => (
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
  )

  renderJob = () => {
    const {jobData, status} = this.state
    switch (status) {
      case apiStatus.success:
        return jobData.length === 0 ? (
          <div className="failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="fail-img"
            />
            <h1 className="fail-head">No Jobs Found</h1>
            <p className="fail-para">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        ) : (
          <ul className="list-container">
            {jobData.map(each => (
              <JobCard details={each} key={each.id} />
            ))}
          </ul>
        )
      case apiStatus.failure:
        return this.renderFailure()
      case apiStatus.progress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ff0b37" height={50} width={50} />
          </div>
        )
      default:
        return null
    }
  }

  changeSearch = event => {
    this.setState({search: event.target.value}, this.getData)
  }

  changePack = id => {
    this.setState({pack: id}, this.getData)
  }

  changeType = id => {
    this.setState(prevState => {
      if (prevState.type.includes(id)) {
        const newType = prevState.type.filter(each => each !== id)
        return {type: newType}
      }
      return {type: [...prevState.type, id]}
    }, this.getData)
  }

  render() {
    const {search} = this.state
    return (
      <>
        <Header />
        <div className="job-bg">
          <div>
            <div className="search-bar mob">
              <input
                type="search"
                value={search}
                onChange={this.changeSearch}
                placeholder="Search"
                className="searchInput"
              />
              <button
                className="search-icon"
                type="button"
                onClick={() => this.getData}
                data-testid="searchButton"
              >
                <FaSearch />
              </button>
            </div>
            <Profile />
            <hr className="line" />
            <FiltersGroup
              changeType={this.changeType}
              changePack={this.changePack}
            />
          </div>
          <div className="abc">
            <div className="search-bar des">
              <input
                type="search"
                value={search}
                onChange={this.changeSearch}
                placeholder="Search"
                className="searchInput"
              />
              <button
                className="search-icon"
                type="button"
                onClick={() => this.getData}
                data-testid="searchButton"
              >
                <FaSearch />
              </button>
            </div>
            {this.renderJob()}
          </div>
        </div>
      </>
    )
  }
}

export default AllJobsSection
