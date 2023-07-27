import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { Col, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { StoreContext, actions } from '../../store';
const cx = classNames.bind(styles);

function Home() {
    const [state, dispatch] = useContext(StoreContext);

    return <div className={cx('wrapper')}>Home page</div>;
}

export default Home;
