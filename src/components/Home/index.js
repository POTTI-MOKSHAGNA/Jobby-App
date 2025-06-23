import './index.css'
import Header from '../Header'

const Home = props => {
  const {history} = props
  const redirectJobs = () => {
    history.push('/jobs')
  }
  return (
    <>
      <Header />
      <div className="bg">
        <h1 className="home-head">Find The Job That Fits Your Life</h1>
        <p className="home-para">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button className="home-btn" type="button" onClick={redirectJobs}>
          Find jobs
        </button>
      </div>
    </>
  )
}

export default Home
