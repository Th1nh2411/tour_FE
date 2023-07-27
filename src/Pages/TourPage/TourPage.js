import styles from './TourPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { Col, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { StoreContext, actions } from '../../store';
import { Breadcrumb, Button, Checkbox, Dropdown, Input, InputNumber, Pagination, Radio } from 'antd';
import config from '../../config';
import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineDown, AiOutlineStar } from 'react-icons/ai';
import { BsCalendar3, BsFillCaretRightFill, BsFillPersonFill } from 'react-icons/bs';
const cx = classNames.bind(styles);
const breadcrumbItems = [
    {
        title: (
            <Link to={config.routes.home} className={cx('breadcrumb-text')}>
                Trang chủ
            </Link>
        ),
    },
    {
        title: (
            <Link to={config.routes.course} className={cx('breadcrumb-text')}>
                Khoá học
            </Link>
        ),
    },
];
const formLearnOptions = [
    { label: 'Online', value: 'Online' },
    { label: 'Offline', value: 'Offline' },
];
const levelOptions = [
    {
        label: (
            <div className={cx('level-label')}>
                Dễ
                <Image className={cx('level-icon')} src={images.courseLevel1} />
            </div>
        ),
        value: 1,
    },
    {
        label: (
            <div className={cx('level-label')}>
                Trung bình
                <Image className={cx('level-icon')} src={images.courseLevel2} />
            </div>
        ),
        value: 2,
    },
    {
        label: (
            <div className={cx('level-label')}>
                Khó
                <Image className={cx('level-icon')} src={images.courseLevel3} />
            </div>
        ),
        value: 3,
    },
    {
        label: (
            <div className={cx('level-label')}>
                Cực khó
                <Image className={cx('level-icon')} src={images.courseLevel4} />
            </div>
        ),
        value: 4,
    },
];
const fieldOptions = [
    { label: 'Back-End', value: 'Back-End' },
    { label: 'Front-End', value: 'Front-End' },
    { label: 'Database', value: 'Database' },
    { label: 'Cấp tốc', value: 'Cấp tốc' },
    { label: 'STEM', value: 'STEM' },
    { label: 'Other', value: 'Other' },
];
function TourPage() {
    const [bottomPrice, setBottomPrice] = useState(0);
    const [topPrice, setTopPrice] = useState(10000000);
    const [formLearns, setFormLearn] = useState([]); // 0 = offline, 1 = online
    const [levels, setLevel] = useState([]);
    const [fields, setField] = useState([]);
    const [showPriceRangeMb, setShowPriceRangeMb] = useState(false);
    const [showFormLearnMb, setShowFormLearnMb] = useState(false);
    const [showLevelMb, setShowLevelMb] = useState(false);
    const [showFieldMb, setShowFieldMb] = useState(false);
    const [filter, setFilter] = useState(null);
    // console.log(`Ngưỡng : [${bottomPrice}, ${topPrice}]`);
    // console.log(`Hình thức : [${formLearns.map((item) => item)}]`);
    // console.log(`Level : [${levels.map((item) => item)}]`);
    // console.log(`Mảng : [${fields.map((item) => item)}]`);
    const onChangeFormLearn = (checkedValues) => {
        setFormLearn(checkedValues);
    };
    const onChangeLevel = (checkedValues) => {
        setLevel(checkedValues);
    };
    const onChangeField = (checkedValues) => {
        setField(checkedValues);
    };
    const handleClickFilterOff = () => {
        setFilter(null);
        setBottomPrice(0);
        setTopPrice(10000000);
        setFormLearn([]);
        setLevel([]);
        setField([]);
    };
    const handleClickFilter = () => {
        setFilter({
            bottomPrice,
            topPrice,
            formLearns: formLearns.length !== 0 ? formLearns : formLearnOptions.map((item) => item.value),
            levels: levels.length !== 0 ? levels : levelOptions.map((item) => item.value),
            fields: fields.length !== 0 ? fields : fieldOptions.map((item) => item.value),
        });
    };
    console.log(bottomPrice);
    return (
        <div className={cx('wrapper')}>
            <section className={cx('banner-wrapper')}>
                <div className={cx('banner-content')}>
                    <div className={cx('banner-title')}>Danh sách khoá học</div>
                    <div className={cx('breadcrumb-wrapper')}>
                        <Breadcrumb separator=">" className={cx('breadcrumb-wrapper')} items={breadcrumbItems} />
                    </div>
                </div>
            </section>
            <section className={cx('course-wrapper')}>
                <Row className={cx('g-3')}>
                    <Col md={3}>
                        <div className={cx('sidebar-wrapper')}>
                            <div className={cx('sidebar-header')}>
                                <h2 className={cx('sidebar-header__title')}>Lọc khoá học</h2>
                                <h5 className={cx('filter-off')} onClick={handleClickFilterOff}>
                                    Xoá lọc
                                </h5>
                            </div>
                            <div className={cx('price-range')}>
                                <div
                                    className={cx('sidebar-title')}
                                    onClick={() => setShowPriceRangeMb(!showPriceRangeMb)}
                                >
                                    Khoảng giá{' '}
                                    <BsFillCaretRightFill
                                        className={cx('sidebar-title-icon', { active: showPriceRangeMb })}
                                    />
                                </div>
                                <div className={cx('hide-on-mb', { active: showPriceRangeMb })}>
                                    <div className={cx('sidebar-subtitle')}>Từ giá</div>
                                    <InputNumber
                                        size="large"
                                        addonAfter="VNĐ"
                                        prefixCls="VNĐ"
                                        style={{ width: 100 + '%' }}
                                        value={bottomPrice}
                                        formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={(value) => {
                                            setBottomPrice(Number(value));
                                        }}
                                        status={bottomPrice > topPrice && 'error'}
                                    />
                                    <div className={cx('sidebar-subtitle')}>Đến giá</div>
                                    <InputNumber
                                        size="large"
                                        addonAfter="VNĐ"
                                        style={{ width: 100 + '%' }}
                                        value={topPrice}
                                        formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={(value) => {
                                            setTopPrice(Number(value));
                                        }}
                                        status={bottomPrice > topPrice && 'error'}
                                    />
                                    {bottomPrice > topPrice && (
                                        <p className={cx('price-error')}>Ngưỡng dưới không được quá ngưỡng trên</p>
                                    )}
                                </div>
                            </div>
                            <div className={cx('form-learn')}>
                                <div
                                    className={cx('sidebar-title')}
                                    onClick={() => setShowFormLearnMb(!showFormLearnMb)}
                                >
                                    Hình thức học{' '}
                                    <BsFillCaretRightFill
                                        className={cx('sidebar-title-icon', { active: showFormLearnMb })}
                                    />
                                </div>
                                <div className={cx('hide-on-mb', { active: showFormLearnMb })}>
                                    <Checkbox.Group
                                        options={formLearnOptions}
                                        onChange={onChangeFormLearn}
                                        value={formLearns}
                                    />
                                </div>
                            </div>
                            <div className={cx('level')}>
                                <div className={cx('sidebar-title')} onClick={() => setShowLevelMb(!showLevelMb)}>
                                    Trình độ{' '}
                                    <BsFillCaretRightFill
                                        className={cx('sidebar-title-icon', { active: showLevelMb })}
                                    />
                                </div>
                                <div className={cx('hide-on-mb', { active: showLevelMb })}>
                                    <Checkbox.Group
                                        value={levels}
                                        style={{ flexDirection: 'column' }}
                                        options={levelOptions}
                                        onChange={onChangeLevel}
                                    />
                                </div>
                            </div>
                            <div className={cx('field')}>
                                <div className={cx('sidebar-title')} onClick={() => setShowFieldMb(!showFieldMb)}>
                                    Lĩnh vực{' '}
                                    <BsFillCaretRightFill
                                        className={cx('sidebar-title-icon', { active: showFieldMb })}
                                    />
                                </div>
                                <div className={cx('hide-on-mb', { active: showFieldMb })}>
                                    <Checkbox.Group
                                        value={fields}
                                        options={fieldOptions}
                                        onChange={onChangeField}
                                        style={{ flexDirection: 'column' }}
                                    />
                                </div>
                            </div>
                            <Button onClick={handleClickFilter} type="primary" className={cx('sidebar-confirm-btn')}>
                                Tìm kiếm
                            </Button>
                        </div>
                    </Col>
                </Row>
            </section>
        </div>
    );
}

export default TourPage;
