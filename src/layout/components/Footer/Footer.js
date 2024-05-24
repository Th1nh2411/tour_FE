import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import images from '../../../assets/images';
import Image from '../../../components/Image/Image';
import { Col, Layout, Row, Typography } from 'antd';
import { FaFacebookF, FaLinkedinIn, FaPhoneAlt, FaYoutube } from 'react-icons/fa';
import { IoLocationSharp, IoMail } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import config from '../../../config';
const cx = classNames.bind(styles);
const { Title, Paragraph, Text } = Typography;

function Footer() {
    return (
        <Layout.Footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Row className={cx('g-3')} gutter={[32, 32]}>
                    <Col xs={24} sm={12} lg={6}>
                        <div className={cx('info-wrapper')}>
                            <Image src="https://res.cloudinary.com/dgsumh8ih/image/upload/v1693657591/logoFull.png" />
                            <div className={cx('introduce')}>
                                Trải nghiệm và tạo nên nhiều hành trình đáng nhớ cùng Holidate.
                            </div>
                            <div className={cx('follow-wrapper')}>
                                <Title level={4}>Theo dõi chúng tôi :</Title>
                                <div className={cx('list-icons')}>
                                    <FaFacebookF className={cx('social-icon')} />
                                    <FaLinkedinIn className={cx('social-icon')} />
                                    <FaYoutube className={cx('social-icon')} />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} lg={5}>
                        <div className={cx('info-wrapper')}>
                            <div className={cx('info-title')}>Khám phá</div>
                            <Link to={config.routes.home} className={cx('info-subtitle')}>
                                <Title level={5}>Trang chủ</Title>
                            </Link>
                            <Link to={config.routes.aboutUs} className={cx('info-subtitle')}>
                                <Title level={5}>Về chúng tôi</Title>
                            </Link>
                            <Link to={config.routes.tour} className={cx('info-subtitle')}>
                                <Title level={5}>Du lịch</Title>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} lg={5}>
                        <div className={cx('info-wrapper')}>
                            <div className={cx('info-title')}>Tìm hiểu</div>
                            <Link to={config.routes.aboutUs} className={cx('info-subtitle')}>
                                <Title level={5}>Bộ sưu tập</Title>
                            </Link>
                            <Link to={config.routes.login} className={cx('info-subtitle')}>
                                <Title level={5}>Đăng nhập</Title>
                            </Link>
                            <Link to={config.routes.register} className={cx('info-subtitle')}>
                                <Title level={5}>Đăng ký</Title>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <div className={cx('info-wrapper')}>
                            <div className={cx('info-title')}>Liên hệ</div>
                            <div className={cx('info-subtitle')}>
                                <IoLocationSharp className={cx('info-icon')} />
                                97 Man Thiện, Thành phố Thủ Đức
                            </div>
                            <div className={cx('info-subtitle')}>
                                <IoMail className={cx('info-icon')} />
                                holidate@gmail.com
                            </div>
                            <div className={cx('info-subtitle')}>
                                <FaPhoneAlt className={cx('info-icon')} />
                                09999999
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={cx('license-wrapper')}>© Copyright 2023 - Empowered by ducthnh2411</div>
        </Layout.Footer>
    );
}

export default Footer;
