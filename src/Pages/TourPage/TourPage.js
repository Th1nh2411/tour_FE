import styles from './TourPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useContext, useEffect, useState } from 'react';
import { StoreContext, actions } from '../../store';
import config from '../../config';
import { Col, Input, InputNumber, Modal, Pagination, Row, Skeleton, Typography } from 'antd';
import { HiOutlineLocationMarker, HiOutlineMap, HiOutlineUsers } from 'react-icons/hi';
import * as tourService from '../../services/tourService';
import { BiPlusCircle, BiSearch } from 'react-icons/bi';
import TourItem from '../../components/TourItem/TourItem';
import { useLocation } from 'react-router';
import TourForm from '../../components/TourForm';
import SearchBar from '../../components/SearchBar/SearchBar';
const { Title, Paragraph, Text } = Typography;
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
    const [searchQuery, setSearchQuery] = useState(searchQueryFromHome || {});

    const getSearchTours = async (query = {}) => {
        setLoading(true);
        const results = await tourService.getSearchTours({
            keyword: query.keyword,
            availableSeats: query.availableSeats,
            category: category && category._id,
            page: currentPageTours - 1,
            minDuration: query.duration === 0 ? 1 : query.duration === 1 ? 4 : undefined,
            maxDuration: query.duration === 0 ? 3 : query.duration === 1 ? 365 : undefined,
        });

        if (results) {
            setLoading(false);
            if ((query.keyword || query.availableSeats > 1 || query.duration) && currentPageTours === 1) {
                state.showToast('Thành công', `Tìm thấy ` + results.count + ' chuyến phù hợp');
            }
            setListTours(results.data);
            setNumTours(results.count);
        }
    };

    useEffect(() => {
        if (category) {
            setResetQuery(true);
            setCurrentPageTours(1);
            setSearchQuery({});
            // getSearchTours();
        }
    }, [category]);
    useEffect(() => {
        console.log(searchQuery);
        getSearchTours(searchQuery);
    }, [currentPageTours, searchQuery]);
    return (
        <>
            {showTourForm && (
                <TourForm
                    data={tourDetail}
                    onClose={(edited) => {
                        if (edited === true) {
                            getSearchTours();
                        }
                        setShowTourForm(false);
                        setTourDetail(null);
                    }}
                />
            )}
            <div>
                <section className={cx('banner-section')}>
                    <div className={cx('banner-content')}>
                        <div className={cx('banner-title')}>
                            {(category && category.categoryName) || 'Danh sách Tất Cả Tour'}
                        </div>
                        <Title level={4} className={cx('banner-desc')}>
                            {category && category.description}
                        </Title>
                    </div>
                </section>
                <section className={cx('tour-section')}>
                    <SearchBar
                        defaultValue={searchQuery}
                        onSearch={(query) => {
                            setSearchQuery(query);
                            setCurrentPageTours(1);
                        }}
                        resetQuery={resetQuery}
                        doneReset={() => setResetQuery(false)}
                    />
                    {state.userInfo && state.userInfo.role === 'admin' && (
                        <Title onClick={() => setShowTourForm(true)} className={cx('add-btn')}>
                            <BiPlusCircle className={cx('add-icon')} />
                            Thêm chuyến mới
                        </Title>
                    )}
                    <Skeleton loading={loading}>
                        <div className={cx('align-end', 'content-between')}>
                            <Title level={5}>Số lượng chuyến: {numTours}</Title>
                            <Title
                                level={5}
                                onClick={() => {
                                    setSearchQuery({});
                                    setResetQuery(true);
                                    setCurrentPageTours(1);
                                }}
                                className={cx('undo-filter')}
                            >
                                Bỏ lọc
                            </Title>
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
                                <Title level={3}>No tour found</Title>
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
