import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import images from '../../../assets/images';
import Image from '../../../components/Image/Image';
import { Col, Row } from 'react-bootstrap';
import { FaFacebookF, FaLinkedinIn, FaPhoneAlt, FaYoutube } from 'react-icons/fa';
import { IoLocationSharp, IoMail } from 'react-icons/io5';
const cx = classNames.bind(styles);

function Header() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Row className={cx('g-3')}>
                    <Col md={4}>
                        <div className={cx('info-wrapper')}>
                            <Image src="https://www.learnworlds.com/app/themes/learnworlds/dist/images/logo.svg" />
                            <div className={cx('introduce')}>
                                Chúng tôi cung cấp các khoá học chất lượng cao để cải thiện các kỹ năng lập trình của
                                bạn. Tất cả các mentor của chúng tôi đều có nhiều kinh nghiệm trong thực tế và giảng
                                dạy.
                            </div>
                            <div className={cx('follow-wrapper')}>
                                <h4>Theo dõi chúng tôi tại:</h4>
                                <div className={cx('list-icons')}>
                                    <FaFacebookF className={cx('social-icon')} />
                                    <FaLinkedinIn className={cx('social-icon')} />
                                    <FaYoutube className={cx('social-icon')} />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className={cx('info-wrapper')}>
                            <div className={cx('info-title')}>Menu</div>
                            <div className={cx('info-subtitle')}>Trang chủ</div>
                            <div className={cx('info-subtitle')}>Về chúng tôi</div>
                            <div className={cx('info-subtitle')}>Nền tảng LMS</div>
                            <div className={cx('info-subtitle')}>Khoá học STEM</div>
                            <div className={cx('info-subtitle')}>Khoá học</div>
                            <div className={cx('info-subtitle')}>Mentor</div>
                            <div className={cx('info-subtitle')}>Blog</div>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className={cx('info-wrapper')}>
                            <div className={cx('info-title')}>Điều khoản</div>
                            <div className={cx('info-subtitle')}>Chính sách bảo mật</div>
                            <div className={cx('info-subtitle')}>Điều khoản dịch vụ</div>
                        </div>
                        <div className={cx('info-wrapper')}>
                            <div className={cx('info-title')}>Cộng tác viên</div>
                            <div className={cx('info-subtitle')}>Đăng ký Cộng tác viên</div>
                            <div className={cx('info-subtitle')}>Đăng ký Mentor</div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className={cx('info-wrapper')}>
                            <div className={cx('info-title')}>Liên hệ với chúng tôi</div>
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
