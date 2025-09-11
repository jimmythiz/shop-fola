import './NotFound.css'

const NotFound = () => {
  return (
    <>
    <div className='notfound-container'>
        <p className="notfound-location"><a href="/">Home / </a>  404 Error </p>
        <div className="notfound-details">
            <p className='fourheader'>404 Not Found</p>
            <p className='four-more'>This page does not exist. Please go back to the homepage.</p>
            <a href="/">Back To Homepage</a>
        </div>
    </div>
    </>
  )
}

export default NotFound