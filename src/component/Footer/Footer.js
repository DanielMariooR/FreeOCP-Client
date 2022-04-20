import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <div className="row py-5 bg-black w-100 mt-auto m-0">
            <div className="col-lg-2 col-4 d-flex flex-wrap align-items-center">
                <img className='w-75 mx-auto d-block' src="assets/logo.png" alt="FREEOCP" />
            </div>
            <div className="col text-white">
                <div className='row my-3'>
                    <FontAwesomeIcon className='fa-2x col-1' icon={faInstagram} />
                    <p className='col m-0'>@freeocp</p>
                </div>
                <div className='row my-3'>
                    <FontAwesomeIcon className='fa-2x col-1' icon={faFacebookF} />
                    <p className='col m-0'>Free OCP</p>
                </div>
                <div className='row my-3'>
                    <FontAwesomeIcon className='fa-2x col-1' icon={faLinkedin} />
                    <p className='col m-0'>Free Online Course Platform</p>
                </div>
                <div className='row my-3'>
                    <FontAwesomeIcon className='fa-2x col-1' icon={faEnvelope} />
                    <p className='col m-0'>contact@freeocp.com</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;