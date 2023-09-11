import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import images from '../../../assets/images';
import Image from '../../../components/Image/Image';
import { Button, Col, Row } from 'antd';
import { FaFacebookF, FaLinkedinIn, FaPhoneAlt, FaYoutube } from 'react-icons/fa';
import { IoLocationSharp, IoMail } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import config from '../../../config';
import TextArea from 'antd/es/input/TextArea';
const cx = classNames.bind(styles);

function Footer() {
    return (
        <>
            <section className={cx('section')}>
                <Row>
                    <Col xs={24} md={10}>
                        <h3 className={cx('section-slogan')}>
                            <span className={cx('slogan-text')}>Góp ý</span>
                        </h3>
                        <h2 className={cx('mt-1')}>
                            Góp ý của quý khách có thể giúp chúng tôi có thể phục vụ tốt hơn trong tương lai.
                        </h2>
                        <div className={cx('mt-2', 'd-flex')}>
                            <TextArea placeholder="Bạn nghĩ gì về chúng tôi" size="large" />

                            <Button type="primary" size="large" className={cx('ml-2')}>
                                Gửi góp ý
                            </Button>
                        </div>
                        <Image
                            src="https://www.allianz-partners.com/en_global/products/travel/_jcr_content/root/parsys/wrapper_copy/wrapper/image.img.82.3360.jpeg/1656941434579/travel-1800x600px.jpeg"
                            className={cx('w-100', 'mt-2')}
                        />
                    </Col>
                    <Col xs={24} md={12} offset={2}>
                        <Image
                            src="https://doan-eta.vercel.app/static/media/male-tourist.f000d0ad1ca492b2bcfb.png"
                            className={cx('w-100')}
                        />
                    </Col>
                </Row>
            </section>
            <footer className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <Row className={cx('g-3')} gutter={[32, 32]}>
                        <Col xs={24} sm={12} lg={6}>
                            <div className={cx('info-wrapper')}>
                                <Image src="https://res.cloudinary.com/dgsumh8ih/image/upload/v1693657591/logoFull.png" />
                                <div className={cx('introduce')}>
                                    Trải nghiệm và tạo nên nhiều hành trình đáng nhớ cùng Holidate.
                                </div>
                                <div className={cx('follow-wrapper')}>
                                    <h4>Theo dõi chúng tôi :</h4>
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
                                    Trang chủ
                                </Link>
                                <Link to={config.routes.aboutUs} className={cx('info-subtitle')}>
                                    Về chúng tôi
                                </Link>
                                <Link to={config.routes.tour} className={cx('info-subtitle')}>
                                    Du lịch
                                </Link>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} lg={5}>
                            <div className={cx('info-wrapper')}>
                                <div className={cx('info-title')}>Tìm hiểu</div>
                                <Link to={config.routes.aboutUs} className={cx('info-subtitle')}>
                                    Bộ sưu tập
                                </Link>
                                <Link to={config.routes.login} className={cx('info-subtitle')}>
                                    Đăng nhập
                                </Link>
                                <Link to={config.routes.register} className={cx('info-subtitle')}>
                                    Đăng ký
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
            </footer>
        </>
    );
}

export default Footer;
