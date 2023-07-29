import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import images from '../../../assets/images';
import Image from '../../../components/Image/Image';
import { Col, Row } from 'antd';
import { FaFacebookF, FaLinkedinIn, FaPhoneAlt, FaYoutube } from 'react-icons/fa';
import { IoLocationSharp, IoMail } from 'react-icons/io5';
const cx = classNames.bind(styles);

function Header() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Row className={cx('g-3')} gutter={{ lg: 32 }}>
                    <Col xs={24} md={6}>
                        <div className={cx('info-wrapper')}>
                            <Image src="https://www.learnworlds.com/app/themes/learnworlds/dist/images/logo.svg" />
                            <div className={cx('introduce')}>
                                Traveling opens the door to creating memories with ducthnh
                            </div>
                            <div className={cx('follow-wrapper')}>
                                <h4>Follow Us :</h4>
                                <div className={cx('list-icons')}>
                                    <FaFacebookF className={cx('social-icon')} />
                                    <FaLinkedinIn className={cx('social-icon')} />
                                    <FaYoutube className={cx('social-icon')} />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} md={6}>
                        <div className={cx('info-wrapper')}>
                            <div className={cx('info-title')}>Discover</div>
                            <div className={cx('info-subtitle')}>Home</div>
                            <div className={cx('info-subtitle')}>About </div>
                            <div className={cx('info-subtitle')}>Tours</div>
                        </div>
                    </Col>
                    <Col xs={24} md={6}>
                        <div className={cx('info-wrapper')}>
                            <div className={cx('info-title')}>Quick Links</div>
                            <div className={cx('info-subtitle')}>Gallery</div>
                            <div className={cx('info-subtitle')}>Login</div>
                            <div className={cx('info-subtitle')}>Register</div>
                        </div>
                    </Col>
                    <Col xs={24} md={6}>
                        <div className={cx('info-wrapper')}>
                            <div className={cx('info-title')}>Contact</div>
                            <div className={cx('info-subtitle')}>
                                <IoLocationSharp className={cx('info-icon')} />
                                Vinhome quận 9, thành phố Thủ Đức
                            </div>
                            <div className={cx('info-subtitle')}>
                                <IoMail className={cx('info-icon')} />
                                amazingtech.hr@gmail.com
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
        </footer>
    );
}

export default Header;
