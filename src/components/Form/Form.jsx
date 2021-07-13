import React, {useState} from 'react';
import styles from './Form.module.css';

//can also use props and call probs.submitSearch
const Form = ({submitSearch}) => {
    const [location, setLocation] = useState('')

    const onSubmit = e =>{
        e.preventDefault();
        if(location !=='')
        {
            submitSearch(location);
        }
    }


    return (
        <form onSubmit={onSubmit}>
            <input
                aria-label="location"
                type="text"
                className={`${styles.input} form-control`}
                placeholder="Search for location"
                required
                value={location}
                //on input, will call events and update "location" state
                onChange={e => setLocation(e.target.value)}
            />

            <button type="submit" className={styles.button}>
                SEARCH
            </button>
        </form>
    );
};

export default Form;
