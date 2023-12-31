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
import SearchBar from '../../components/SearchBar/SearchBar';
const cx = classNames.bind(styles);

function TourPage() {
    const [state, dispatch] = useContext(StoreContext);
    const pageState = useLocation().state;
    const { searchQueryFromHome, category } = pageState || {};
    const [loading, setLoading] = useState(false);

    const [listTours, setListTours] = useState([]);
    const [numTours, setNumTours] = useState([]);
    const [currentPageTours, setCurrentPageTours] = useState(1);

    const [showTourForm, setShowTourForm] = useState(false);
    const [tourDetail, setTourDetail] = useState(null);

    const [resetQuery, setResetQuery] = useState(false);

    const getSearchTours = async (query = {}, reset) => {
        setLoading(true);
        let results;
        if (reset) {
            results = await tourService.getSearchTours({ category: category && category._id });
        } else {
            results = await tourService.getSearchTours({
                keyword: query.keyword,
                availableSeats: query.availableSeats,
                category: category && category._id,
                page: currentPageTours - 1,
                minDuration: query.duration ? 4 : 1,
                maxDuration: query.duration ? 365 : 3,
            });
        }

        setLoading(false);
        if ((query.keyword || query.availableSeats > 1) && currentPageTours === 1) {
            state.showToast('Thành công', `Tìm thấy ` + results.count + ' chuyến phù hợp');
        }
        setListTours(results.data);
        setNumTours(results.count);
    };

    useEffect(() => {
        if (!searchQueryFromHome) {
            setResetQuery(true);

            setCurrentPageTours(1);
            getSearchTours({}, true);
        }
    }, [category]);
    useEffect(() => {
        getSearchTours(searchQueryFromHome);
    }, [currentPageTours]);
    return (
        <>
            <TourForm
                data={tourDetail}
                showTourForm={showTourForm}
                onClose={(edited) => {
                    if (edited === true) {
                        getSearchTours();
                    }
                    setShowTourForm(false);
                    setTourDetail(null);
                }}
            />
            <div>
                <section className={cx('banner-section')}>
                    <div className={cx('banner-content')}>
                        <div className={cx('banner-title')}>
                            {(category && category.categoryName) || 'Danh sách Tất Cả Tour'}
                        </div>
                        <h4 className={cx('banner-desc')}>{category && category.description}</h4>
                    </div>
                </section>
                <section className={cx('tour-section')}>
                    <SearchBar
                        defaultValue={searchQueryFromHome}
                        onSearch={(query) => {
                            getSearchTours(query);
                        }}
                        resetQuery={resetQuery}
                        doneReset={() => setResetQuery(false)}
                    />
                    {state.userInfo && state.userInfo.role === 'admin' && (
                        <h4 onClick={() => setShowTourForm(true)} className={cx('add-tour')}>
                            <BiPlusCircle className={cx('add-btn')} />
                            Add tour
                        </h4>
                    )}
                    <Skeleton loading={loading}>
                        <div className={cx('align-end', 'content-between')}>
                            <h4>Số lượng chuyến: {numTours}</h4>
                            <h4
                                onClick={() => {
                                    setResetQuery(true);

                                    setCurrentPageTours(1);
                                    getSearchTours({}, true);
                                }}
                                className={cx('undo-filter')}
                            >
                                Bỏ lọc
                            </h4>
                        </div>
                        <Row style={{ marginTop: 5 }} gutter={[20, 20]}>
                            {listTours ? (
                                listTours.map((item, index) => (
                                    <Col key={index} xs={24} sm={12} lg={8} xl={6}>
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
                        total={numTours}
                        pageSize={8}
                    />
                </section>
            </div>
        </>
    );
}

export default TourPage;
