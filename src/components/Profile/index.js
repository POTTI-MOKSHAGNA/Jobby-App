import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

const apiStatus = {
  initial: 'INITIAl',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {
    profileData: {},
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileData: updatedData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderProfile = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile" />
        <h1 className="name">{name}</h1>
        <p className="role">{shortBio}</p>
      </div>
    )
  }

  renderFailure = () => (
    <div>
      <button
        type="button"
        className="logout"
        onClick={() => this.getProfileData()}
      >
        RETRY
      </button>
    </div>
  )

  render() {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.renderProfile()
      case apiStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }
}

export default Profile
