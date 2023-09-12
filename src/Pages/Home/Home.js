import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { Button, Col, Input, InputNumber, Row, Skeleton, Spin } from 'antd';
import { useContext, useEffect, useMemo, useState } from 'react';
import { StoreContext, actions } from '../../store';
import { HiOutlineLocationMarker, HiOutlineMap, HiOutlineUsers } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Slide from '../../components/Slide';
import * as tourService from '../../services/tourService';
import * as reviewService from '../../services/reviewService';
import * as guideService from '../../services/guideService';
import HOME_DATA from './data';
import TourItem from '../../components/TourItem/TourItem';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import SearchBar from '../../components/SearchBar/SearchBar';
import TextArea from 'antd/es/input/TextArea';
import GuideItem from './GuideItem';
const cx = classNames.bind(styles);

function Home() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [featuredTours, setFeaturedTours] = useState([]);
    const [top8Reviews, setTop8Reviews] = useState([]);
    const [allGuide, setAllGuide] = useState([]);
    const getFeaturedTour = async () => {
        setLoading(true);
        const results = await tourService.getFeaturedTours();
        if (results) {
            setFeaturedTours(results.data);
        }
        setLoading(false);
    };
    const getTop8Reviews = async () => {
        const results = await reviewService.getTop8Review();
        if (results) {
            setTop8Reviews(results.data);
        }
    };
    const getAllGuide = async () => {
        const results = await guideService.getAllGuide();
        if (results) {
            setAllGuide(results.data);
        }
    };
    useEffect(() => {
        getFeaturedTour();
        getTop8Reviews();
        getAllGuide();
    }, []);
    return (
        <div className={cx('wrapper')}>
            {/* Banner Section */}
            <section>
                <Row gutter={[{ lg: 24 }, 0]}>
                    <Col lg={12}>
                        <h3 className={cx('section-slogan')}>
                            <span className={cx('slogan-text')}>Những điều cần biết</span>
                            <Image
                                className={cx('slogan-icon')}
                                src="https://res.cloudinary.com/dgsumh8ih/image/upload/v1694075871/travel.png"
                            />
                        </h3>
                        <h1 className={cx('section-title')}>
                            Du hành khắp thế giới và tạo nhiều <span>kỉ niệm đẹp với Holidate</span>
                        </h1>
                        <p className={cx('section-desc')}>
                            Chúng tôi cung cấp một loạt các tour du lịch đa dạng, từ những kỳ nghỉ thư giãn tại các điểm
                            đẹp như biển biển và núi rừng cho đến những chuyến phiêu lưu mạo hiểm đầy thú vị.
                            <br />
                            <br /> Bất kể bạn là người yêu thiên nhiên, người muốn khám phá văn hóa mới, hay bạn đang
                            tìm kiếm những trải nghiệm ẩm thực độc đáo, chúng tôi sẽ đưa bạn đến những địa điểm tuyệt
                            vời nhất.
                        </p>
                    </Col>
                    <Col xs={0} lg={4}>
                        <Image
                            src="https://res.cloudinary.com/dgsumh8ih/image/upload/v1694488512/tour-img1.jpg"
                            className={cx('banner-img')}
                        />
                    </Col>
                    <Col xs={24} lg={4}>
                        <video
                            autoPlay
                            controls
                            loop
                            src="https://res.cloudinary.com/dgsumh8ih/video/upload/v1694491259/tour-video.mp4"
                            className={cx('banner-img', 'mt-2')}
                        />
                    </Col>
                    <Col xs={0} lg={4}>
                        <Image
                            src="https://res.cloudinary.com/dgsumh8ih/image/upload/v1694488512/tour-img2.jpg"
                            className={cx('banner-img', 'mt-4')}
                        />
                    </Col>
                </Row>
            </section>
            <section>
                <Row align="center" gutter={[28, 28]}>
                    <Col lg={6}>
                        <h3 className={cx('service-slogan')}>Chuyến đi đáng nhớ</h3>
                        <h3 className={cx('section-title')}>Chúng tôi cung cấp những dịch vụ tốt nhất</h3>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('service-item')}>
                            <Image src={images.cloudIcon} className={cx('service-icon')} />
                            <h2 className={cx('mt-1')}>Đặt tour</h2>
                            <p>
                                Bạn có thể dễ dàng tìm và đặt tour du lịch mà bạn mong muốn chỉ trong vài bước đơn giản.
                            </p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('service-item')}>
                            <Image src={images.chainIcon} className={cx('service-icon')} />
                            <h2 className={cx('mt-1')}>Hướng dẫn viên</h2>
                            <p>
                                Chúng tôi tập hợp đội ngũ hướng dẫn viên du lịch chất lượng, có kiến thức sâu rộng về
                                địa điểm bạn muốn khám phá.
                            </p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('service-item')}>
                            <Image src={images.gearIcon} className={cx('service-icon')} />
                            <h2 className={cx('mt-1')}>Hỗ trợ khách hàng</h2>
                            <p>
                                Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải quyết mọi vấn đề và câu hỏi của bạn
                                trong suốt chuyến đi của bạn.
                            </p>
                        </div>
                    </Col>
                </Row>
            </section>
            <section>
                <SearchBar
                    onSearch={(searchQuery) =>
                        navigate(config.routes.tour, { state: { searchQueryFromHome: searchQuery } })
                    }
                />
                <h3 className={cx('section-slogan')}>
                    <span className={cx('slogan-text')}>Khám phá</span>
                </h3>
                <h2 className={cx('mt-1')}>Những chuyến đi nổi bật</h2>

                <Skeleton loading={loading}>
                    <Row style={{ marginTop: 10 }} gutter={[20, 20]}>
                        {featuredTours &&
                            featuredTours.map((item, index) => (
                                <Col key={index} xs={24} sm={12} lg={8} xl={6}>
                                    <TourItem data={item} />
                                </Col>
                            ))}
                    </Row>
                </Skeleton>
            </section>
            <section>
                <Row gutter={[32, 16]} className={cx('align-center')}>
                    <Col md={10}>
                        <h3 className={cx('section-slogan')}>
                            <span className={cx('slogan-text')}>Kinh nghiệm</span>
                        </h3>
                        <h1 className={cx('section-title')}>Với tất cả kinh nghiệm và tâm huyết</h1>
                        <p className={cx('section-desc')}>
                            Những hướng dẫn viên du lịch tận tâm và có kinh nghiệm sẽ hướng dẫn bạn qua mỗi bước đi,
                            mang đến cho bạn cái nhìn sâu rộng về văn hóa, lịch sử và địa điểm mà bạn sắp đặt chân đến.
                            Điều này giúp tạo ra những trải nghiệm thú vị và đáng nhớ.
                        </p>
                        <Row gutter={[32, 16]} className={cx('mt-3')}>
                            <Col xs={24} sm={8} md={24} lg={8}>
                                <span className={cx('statistic-item')}>
                                    <div className={cx('statistic-number')}>12k+</div>
                                    <p className={cx('statistic-title')}>Successful trip</p>
                                </span>
                            </Col>
                            <Col xs={24} sm={8} md={24} lg={8}>
                                <span className={cx('statistic-item')}>
                                    <div className={cx('statistic-number')}>2k+</div>
                                    <p className={cx('statistic-title')}>Regular clients</p>
                                </span>
                            </Col>
                            <Col xs={24} sm={8} md={24} lg={8}>
                                <span className={cx('statistic-item')}>
                                    <div className={cx('statistic-number')}>15</div>
                                    <p className={cx('statistic-title')}>Year experience</p>
                                </span>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} md={12} offset={2}>
                        <Image
                            src="https://res.cloudinary.com/dgsumh8ih/image/upload/v1693636842/tour.jpg"
                            className={cx('w-100')}
                        />
                    </Col>
                </Row>
            </section>
            <section>
                <h3 className={cx('section-slogan')}>
                    <span className={cx('slogan-text')}>Bộ sưu tập</span>
                </h3>
                <h2 className={cx('mt-1')}>Tham quan bộ sưu tập từ những chuyến đi của chúng tôi</h2>
                <Row gutter={[16, 8]} className={cx('mt-3')}>
                    {HOME_DATA.gallery.map((item, index) => (
                        <Col key={index} xs={24} md={12} lg={6}>
                            <Image className={cx('gallery-img')} src={item} />
                        </Col>
                    ))}
                </Row>
            </section>
            <section>
                <h3 className={cx('section-slogan')}>
                    <span className={cx('slogan-text')}>Đồng hành</span>
                </h3>
                <h2 className={cx('mt-1')}>Những hướng dẫn viên tận tâm và đầy kinh nghiệm từ đội ngũ của chúng tôi</h2>
                <Slide className={cx('mt-2')} navigation={false} numItemPerSlide={3} autoPlay>
                    {allGuide.map((item, index) => (
                        <GuideItem key={index} data={item} />
                    ))}
                </Slide>
            </section>
            <section>
                <h3 className={cx('section-slogan')}>
                    <span className={cx('slogan-text')}>Đánh giá</span>
                </h3>
                <h2 className={cx('mt-1')}>Những gì khách hàng đánh giá</h2>
                <Slide className={cx('mt-2')} navigation={false} numItemPerSlide={3} autoPlay>
                    {top8Reviews.map((item, index) => (
                        <div key={index} className={cx('review-item')}>
                            <p className={cx('review-comment')}>{item.comment}</p>
                            <div className={cx('review-customer')}>
                                <Image src={item.tourInfo.photo} className={cx('review-img')} />
                                <div>
                                    <h3 className={cx('customer-name')}>{item.userInfo.fullName}</h3>
                                    <p className={cx('review-tourName')}>{item.tourInfo.tourName}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slide>
            </section>
            <section>
                <Row gutter={[15, 15]} align={'middle'}>
                    <Col xs={24} md={12}>
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
                    <Col xs={0} md={12}>
                        <Image
                            src="https://res.cloudinary.com/dgsumh8ih/image/upload/v1694494492/8934044_4022795_gakypn.jpg"
                            className={cx('w-100')}
                        />
                    </Col>
                </Row>
            </section>
        </div>
    );
}

export default Home;
