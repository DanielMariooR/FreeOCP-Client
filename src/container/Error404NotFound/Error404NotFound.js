import NavBar from '../../component/Navbar/Navbar';
import Footer from '../../component/Footer/Footer';
const Error404NotFound = () => {
    return(
        <div className='vh-100'>
            <NavBar/>
            <div className='container py-5'>
                    <h1 className='align-middle'>404 Not Found</h1>
                    <h3 className='align-middle' >Maaf, halaman yang Anda cari tidak ada di sistem kami</h3>
                    
            </div>
            <div className='fixed-bottom'>
                <Footer/>
            </div>
        </div>
    )
}
export default Error404NotFound;