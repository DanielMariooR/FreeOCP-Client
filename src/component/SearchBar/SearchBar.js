import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {

    return (
        <div className="input-group col-3 searchbar">
            <form className='d-flex'>
                <input className="form-control my-0 px-3 border-0 shadow-none search-input" type="text" placeholder="Mau belajar apa hari ini?" aria-label="Search" />
                <div className="input-group-prepend">
                    <button type="submit" className='submit-search p-0 bg-white'>
                        <span className="input-group-text border-0 bg-white py-3 px-3">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;