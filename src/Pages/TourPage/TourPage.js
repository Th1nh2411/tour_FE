import styles from './TourPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useContext, useEffect, useState } from 'react';
import { StoreContext, actions } from '../../store';
import config from '../../config';
import { Col, Input, InputNumber, Modal, Pagination, Row, Skeleton } from 'antd';
import { HiOutlineLocationMarker, HiOutlineMap, HiOutlineUsers } from 'react-icons/hi';
import * as tourService from '../../services/tourService';
import { BiPlusCircle, BiSearch } from 'react-icons/bi';
import TourItem from '../../components/TourItem/TourItem';
import { useLocation } from 'react-router';
import TourForm from '../../components/TourForm';
const cx = classNames.bind(styles);

function TourPage() {
    const [state, dispatch] = useContext(StoreContext);
    const searchQueryFromHome = useLocation().state;
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('All Tours');
    const [locationValue, setLocationValue] = useState(searchQueryFromHome ? searchQueryFromHome.locationValue : '');
    const [distanceValue, setDistanceValue] = useState(searchQueryFromHome ? searchQueryFromHome.distanceValue : 400);
    const [maxPeopleValue, setMaxPeopleValue] = useState(searchQueryFromHome ? searchQueryFromHome.maxPeopleValue : 0);
    const [listTours, setListTours] = useState([]);
    const [totalTours, setTotalTours] = useState([]);
    const [currentPageTours, setCurrentPageTours] = useState(1);

    const [showTourForm, setShowTourForm] = useState(false);
    const [tourDetail, setTourDetail] = useState(null);

    const getAllTours = async () => {
        setLoading(true);
        const results = await tourService.getAllTours(currentPageTours - 1);
        if (results) {
            setListTours(results.data);
            setTotalTours(results.count);
            setLoading(false);
        }
    };
    const getSearchTours = async () => {
        const results = await tourService.getSearchTours(locationValue, distanceValue, maxPeopleValue);
        setListTours(results.data);
        setTotalTours(results.count);
        setTitle('Tour Search Result');
        if (results && results.data && results.data.length !== 0) {
            state.showToast(results.message, `Found ${results.data.length} Tour`, 'success');
        } else {
            state.showToast(results.message, `No Tour Found`, 'error');
        }
    };

    useEffect(() => {
        if (searchQueryFromHome) {
            getSearchTours();
        } else {
            getAllTours();
        }
    }, [currentPageTours]);
    return (
        <>
            <TourForm
                data={tourDetail}
                showTourForm={showTourForm}
                onClose={(edited) => {
                    if (edited === true) {
                        if (searchQueryFromHome) {
                            getSearchTours();
                        } else {
                            getAllTours();
                        }
                    }
                    setShowTourForm(false);
                    setTourDetail(null);
                }}
            />
            <div>
                <section className={cx('banner-section')}>
                    <div className={cx('banner-content')}>
                        <div className={cx('banner-title')}>{title}</div>
                    </div>
                </section>
                <section className={cx('tour-section')}>
                    <div className={cx('search-bar')}>
                        <Row>
                            <Col>
                                <div className={cx('search-item')}>
                                    <HiOutlineMap className={cx('icon')} />
                                    <div>
                                        <h5 className={cx('search-title')}>Location</h5>
                                        <Input
                                            className={cx('search-input')}
                                            placeholder="Where are you going"
                                            bordered={false}
                                            value={locationValue}
                                            onChange={(e) => setLocationValue(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className={cx('search-item')}>
                                    <HiOutlineLocationMarker className={cx('icon')} />
                                    <div>
                                        <h5 className={cx('search-title')}>Max Distance</h5>
                                        <Input
                                            className={cx('search-input')}
                                            placeholder="Distance k/m"
                                            bordered={false}
                                            value={distanceValue}
                                            onChange={(e) => setDistanceValue(e.target.value)}
                                            min={0}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className={cx('search-item')}>
                                    <HiOutlineUsers className={cx('icon')} />
                                    <div>
                                        <h5 className={cx('search-title')}>Max People</h5>
                                        <InputNumber
                                            className={cx('search-input')}
                                            placeholder="0"
                                            bordered={false}
                                            value={maxPeopleValue}
                                            onChange={(value) => setMaxPeopleValue(value)}
                                            min={0}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col className={cx('d-flex')}>
                                <div onClick={() => getSearchTours()} className={cx('search-btn')}>
                                    <BiSearch />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {state.userInfo && state.userInfo.role === 'admin' && (
                        <h4 onClick={() => setShowTourForm(true)} className={cx('add-tour')}>
                            <BiPlusCircle className={cx('add-btn')} />
                            Add tour
                        </h4>
                    )}
                    <Skeleton loading={loading}>
                        <Row gutter={20}>
                            {listTours ? (
                                listTours.map((item, index) => (
                                    <Col key={index} sm={12} lg={6}>
                                        <TourItem
                                            onEdit={() => {
                                                setTourDetail(item);
                                                setShowTourForm(true);
                                            }}
                                            data={item}
                                        />
                                    </Col>
                                ))
                            ) : (
                                <h3>No tour found</h3>
                            )}
                        </Row>
                    </Skeleton>
                    <Pagination
                        onChange={(page) => setCurrentPageTours(page)}
                        style={{ textAlign: 'center' }}
                        className={cx('mt-2')}
                        current={currentPageTours}
                        total={totalTours}
                        pageSize={8}
                    />
                </section>
            </div>
        </>
    );
}

export default TourPage;
