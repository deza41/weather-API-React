import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import styles from './Forecast.module.css';

import CurrentDay from '../CurrentDay';
import CurrentDayDescription from '../CurrentDayDescription'
import UpcomingDaysForecast from '../UpcomingDaysForecast'

const Forecast = ({forecast}) => (
    <Container className={styles.box}>
        <Row>
            <Col xs={12} md={4}>
                <div className={styles.card}>
                    <CurrentDay {...forecast.currentDay}/>
                </div>
            </Col>
            <Col xs={12} md={8} className="d-flex flex-column justify-content-between">
                {console.log(forecast)}
                <CurrentDayDescription forecast={forecast.currentDayDetails}/>
                <UpcomingDaysForecast days={forecast.upcomingDays}/>
            </Col>
        </Row>
    </Container>
);
export default Forecast;
