import React, { Fragment } from 'react';
import styles from './Page.module.css'

//components
import Header from '../Header';
import Form from '../Form';
import Error from '../Error';
import Loader from '../Loader';
import Forecast from '../Forecast';

//hooks
import useForecast from '../../Hooks/useForecast'


const Page = () => {
    //hook cannot be called in conditional
    const{isError, isLoading, forecast, submitRequest} = useForecast();

    //store form passed data
    const submitSearch = (search) =>{
        //console.log(search);
        submitRequest(search)
    };

    return (
        <Fragment>
            <Header />
            {!forecast &&(
                <div className={styles.box }>
                    {!isLoading && <Form submitSearch={submitSearch}/>}
                    {isError && <Error message={isError}/>}
                    {isLoading && <Loader />}
                </div>
            )}
            {forecast && <Forecast forecast={forecast}/>}
        </Fragment>
    );
};
export default Page;
