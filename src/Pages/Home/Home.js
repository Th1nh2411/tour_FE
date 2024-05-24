import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { Button, Col, Form, Input, InputNumber, Row, Skeleton, Spin, Typography } from 'antd';
import { useContext, useEffect, useMemo, useState } from 'react';
import { StoreContext, actions } from '../../store';
import { BiSearch } from 'react-icons/bi';
import Slide from '../../components/Slide';
import * as tourService from '../../services/tourService';
import HOME_DATA from './data';
import TourItem from '../../components/TourItem/TourItem';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import SearchBar from '../../components/SearchBar/SearchBar';
const { Title, Paragraph, Text } = Typography;
const cx = classNames.bind(styles);

function Home() {
    const [loading, setLoading] = useState(false);
    const [state, dispatch] = useContext(StoreContext);
    const navigate = useNavigate();
    const [featuredTours, setFeaturedTours] = useState();

    const getFeaturedTour = async () => {
        setLoading(true);
        const results = await tourService.getFeaturedTours();
        if (results) {
            setFeaturedTours(results.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        getFeaturedTour();
    }, []);
    return (
        <div className={cx('wrapper')}>
            {/* Banner Section */}
            <section>
                <Row gutter={[{ lg: 24 }, 0]}>
                    <Col lg={12}>
                        <Title level={3} className={cx('section-slogan')}>
                            <Text className={cx('slogan-text')}>Những điều cần biết</Text>
                            <Image
                                className={cx('slogan-icon')}
                                src="https://res.cloudinary.com/dgsumh8ih/image/upload/v1694075871/travel.png"
                            />
                        </Title>
                        <Title level={1} className={cx('section-title')}>
                            Du hành khắp thế giới và tạo nhiều <Text>kỉ niệm đẹp với Holidate</Text>
                        </Title>
                        <Text className={cx('section-desc')}>
                            Chúng tôi cung cấp một loạt các tour du lịch đa dạng, từ những kỳ nghỉ thư giãn tại các điểm
                            đẹp như biển biển và núi rừng cho đến những chuyến phiêu lưu mạo hiểm đầy thú vị.
                            <br />
                            <br /> Bất kể bạn là người yêu thiên nhiên, người muốn khám phá văn hóa mới, hay bạn đang
                            tìm kiếm những trải nghiệm ẩm thực độc đáo, chúng tôi sẽ đưa bạn đến những địa điểm tuyệt
                            vời nhất.
                        </Text>
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
                        <Title level={3} className={cx('service-slogan')}>
                            Chuyến đi đáng nhớ
                        </Title>
                        <Title level={3} className={cx('section-title')}>
                            Chúng tôi cung cấp những dịch vụ tốt nhất
                        </Title>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('service-item')}>
                            <Image src={images.cloudIcon} className={cx('service-icon')} />
                            <Title className={cx('mt-1')}>Đặt tour</Title>
                            <Text>
                                Bạn có thể dễ dàng tìm và đặt tour du lịch mà bạn mong muốn chỉ trong vài bước đơn giản.
                            </Text>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('service-item')}>
                            <Image src={images.chainIcon} className={cx('service-icon')} />
                            <Title className={cx('mt-1')}>Hướng dẫn viên</Title>
                            <Text>
                                Chúng tôi tập hợp đội ngũ hướng dẫn viên du lịch chất lượng, có kiến thức sâu rộng về
                                địa điểm bạn muốn khám phá.
                            </Text>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('service-item')}>
                            <Image src={images.gearIcon} className={cx('service-icon')} />
                            <Title className={cx('mt-1')}>Hỗ trợ khách hàng</Title>
                            <Text>
                                Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải quyết mọi vấn đề và câu hỏi của bạn
                                trong suốt chuyến đi của bạn.
                            </Text>
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
                <Title level={3} className={cx('section-slogan')}>
                    <Text className={cx('slogan-text')}>Khám phá</Text>
                </Title>
                <Title className={cx('mt-1')}>Những chuyến đi nổi bật</Title>

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
                        <Title level={3} className={cx('section-slogan')}>
                            <Text className={cx('slogan-text')}>Kinh nghiệm</Text>
                        </Title>
                        <Title level={1} className={cx('section-title')}>
                            Với tất cả kinh nghiệm và tâm huyết
                        </Title>
                        <Text className={cx('section-desc')}>
                            Những hướng dẫn viên du lịch tận tâm và có kinh nghiệm sẽ hướng dẫn bạn qua mỗi bước đi,
                            mang đến cho bạn cái nhìn sâu rộng về văn hóa, lịch sử và địa điểm mà bạn sắp đặt chân đến.
                            Điều này giúp tạo ra những trải nghiệm thú vị và đáng nhớ.
                        </Text>
                        <Row gutter={[32, 16]} className={cx('mt-3')}>
                            <Col xs={24} sm={8} md={24} lg={8}>
                                <Text className={cx('statistic-item')}>
                                    <div className={cx('statistic-number')}>12k+</div>
                                    <Text className={cx('statistic-title')}>Successful trip</Text>
                                </Text>
                            </Col>
                            <Col xs={24} sm={8} md={24} lg={8}>
                                <Text className={cx('statistic-item')}>
                                    <div className={cx('statistic-number')}>2k+</div>
                                    <Text className={cx('statistic-title')}>Regular clients</Text>
                                </Text>
                            </Col>
                            <Col xs={24} sm={8} md={24} lg={8}>
                                <Text className={cx('statistic-item')}>
                                    <div className={cx('statistic-number')}>15</div>
                                    <Text className={cx('statistic-title')}>Year experience</Text>
                                </Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={0} md={2}></Col>
                    <Col xs={24} md={12}>
                        <Image
                            src="https://res.cloudinary.com/dgsumh8ih/image/upload/v1693636842/tour.jpg"
                            className={cx('w-100')}
                        />
                    </Col>
                </Row>
            </section>
            <section>
                <Title level={3} className={cx('section-slogan')}>
                    <Text className={cx('slogan-text')}>Bộ sưu tập</Text>
                </Title>
                <Title className={cx('mt-1')}>Tham quan bộ sưu tập từ những chuyến đi của chúng tôi</Title>
                <Row gutter={[16, 8]} className={cx('mt-3')}>
                    {HOME_DATA.gallery.map((item, index) => (
                        <Col key={index} xs={24} md={12} lg={6}>
                            <Image className={cx('gallery-img')} src={item} />
                        </Col>
                    ))}
                </Row>
            </section>
        </div>
    );
}

export default Home;
