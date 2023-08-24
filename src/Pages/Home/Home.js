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
import HOME_DATA from './data';
import TourItem from '../../components/TourItem/TourItem';
import { Link } from 'react-router-dom';
import config from '../../config';
const cx = classNames.bind(styles);

function Home() {
    const [state, dispatch] = useContext(StoreContext);
    const [loading, setLoading] = useState(false);
    const [locationValue, setLocationValue] = useState('');
    const [distanceValue, setDistanceValue] = useState(400);
    const [maxPeopleValue, setMaxPeopleValue] = useState(0);
    const [featuredTours, setFeaturedTours] = useState([]);
    const searchQuery = useMemo(() => {
        return { locationValue, distanceValue, maxPeopleValue };
    }, [locationValue, distanceValue, maxPeopleValue]);
    const getFeaturedTour = async () => {
        setLoading(true);
        const results = await tourService.getFeaturedTours();
        setFeaturedTours(results ? results.data : []);
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
                        <h3 className={cx('section-slogan')}>
                            <span className={cx('slogan-text')}>Know Before You Go</span>
                            <Image
                                className={cx('slogan-icon')}
                                src="https://doan-eta.vercel.app/static/media/world.12b28835610f2449f5e9.png"
                            />
                        </h3>
                        <h1 className={cx('section-title')}>
                            Traveling opens the door to creating <span>memories with TickZ</span>
                        </h1>
                        <p className={cx('section-desc')}>
                            Our Vietnam is a beautiful country. We have a variety of landscapes which are widely
                            well-known such as Ha Long Bay, Hoi An Old quarter and Phong Nha Ke Bang cave. A long coast
                            with many attractive beaches is also our recognized reputation. Although Vietnam was a rich
                            traditional culture country, it has undergone a great change since 1945 due to the war. But
                            you can still find spiritual values in traditional arts performances such as singing Tru,
                            Cheo, Tuong, water puppet, ancient artifacts at the museums at the cultural centers in Hanoi
                            and Saigon.
                        </p>
                    </Col>
                    <Col xs={0} lg={4}>
                        <Image
                            src="https://doan-eta.vercel.app/static/media/hero-img01.cdfa5451ce66d17ee1f8.jpg"
                            className={cx('banner-img')}
                        />
                    </Col>
                    <Col xs={24} lg={4}>
                        <video
                            controls
                            src="https://doan-eta.vercel.app/static/media/hero-video.9e800d0ad3a61e8c12f6.mp4"
                            className={cx('banner-img', 'mt-2')}
                        />
                    </Col>
                    <Col xs={0} lg={4}>
                        <Image
                            src="https://doan-eta.vercel.app/static/media/hero-img02.c5c2185a4223b66365fb.jpg"
                            className={cx('banner-img', 'mt-4')}
                        />
                    </Col>
                </Row>
                <div className={cx('search-bar')}>
                    <Row className={cx('align-center')}>
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
                            <Link state={searchQuery} to={config.routes.tour}>
                                <div className={cx('search-btn')}>
                                    <BiSearch />
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </section>
            <section>
                <Row align="center" gutter={[28, 28]}>
                    <Col lg={6}>
                        <h3 className={cx('service-slogan')}>What we serve</h3>
                        <h3 className={cx('section-title')}>We offer out best services</h3>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('service-item')}>
                            <Image src={images.cloudIcon} className={cx('service-icon')} />
                            <h2 className={cx('mt-1')}>Calculate Weather</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('service-item')}>
                            <Image src={images.chainIcon} className={cx('service-icon')} />
                            <h2 className={cx('mt-1')}>Best Tour Guide</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('service-item')}>
                            <Image src={images.gearIcon} className={cx('service-icon')} />
                            <h2 className={cx('mt-1')}>Customization</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </Col>
                </Row>
            </section>
            <section>
                <h3 className={cx('section-slogan')}>
                    <span className={cx('slogan-text')}>Explore</span>
                </h3>
                <h2 className={cx('mt-1')}>Our Feature Tours</h2>

                <Skeleton loading={loading}>
                    <Row gutter={20}>
                        {featuredTours &&
                            featuredTours.map((item, index) => (
                                <Col key={index} sm={12} lg={6}>
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
                            <span className={cx('slogan-text')}>Experience</span>
                        </h3>
                        <h1 className={cx('section-title')}>With Duong our all experience we will serve you</h1>
                        <p className={cx('section-desc')}>
                            Our Vietnam is a beautiful country. We have a variety of landscapes which are widely
                            well-known such as Ha Long Bay, Hoi An Old quarter and Phong Nha Ke Bang cave.
                        </p>
                        <Row gutter={[32, 16]} className={cx('mt-3')}>
                            <Col xs={24} lg={8}>
                                <span className={cx('statistic-item')}>
                                    <div className={cx('statistic-number')}>12k+</div>
                                    <p className={cx('statistic-title')}>Successful trip</p>
                                </span>
                            </Col>
                            <Col xs={24} lg={8}>
                                <span className={cx('statistic-item')}>
                                    <div className={cx('statistic-number')}>2k+</div>
                                    <p className={cx('statistic-title')}>Regular clients</p>
                                </span>
                            </Col>
                            <Col xs={24} lg={8}>
                                <span className={cx('statistic-item')}>
                                    <div className={cx('statistic-number')}>15</div>
                                    <p className={cx('statistic-title')}>Year experience</p>
                                </span>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} md={12} offset={2}>
                        <Image
                            src="https://doan-eta.vercel.app/static/media/experience.f276d1992082e5879afb.png"
                            className={cx('w-100')}
                        />
                    </Col>
                </Row>
            </section>
            <section>
                <h3 className={cx('section-slogan')}>
                    <span className={cx('slogan-text')}>Gallery</span>
                </h3>
                <h2 className={cx('mt-1')}>Visit our customers tour gallery</h2>
                <Row gutter={[16, 16]} className={cx('mt-3')}>
                    <Col lg={6}>
                        <div className={cx('gallery-img-group')}>
                            <Image
                                className={cx('gallery-img')}
                                src="https://doan-eta.vercel.app/static/media/gallery-01.3c21b9a6df0243f772c5.jpg"
                            />
                            <Image
                                className={cx('gallery-img')}
                                src="https://doan-eta.vercel.app/static/media/gallery-05.b327cf60ba18a59db408.jpg"
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('gallery-img-group')}>
                            <Image
                                className={cx('gallery-img')}
                                src="https://doan-eta.vercel.app/static/media/gallery-02.c9ae06755eebce595a38.jpg"
                            />
                            <Image
                                className={cx('gallery-img')}
                                src="https://doan-eta.vercel.app/static/media/gallery-06.66c107edd159054ae8cf.jpg"
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('gallery-img-group')}>
                            <Image
                                className={cx('gallery-img')}
                                src="https://doan-eta.vercel.app/static/media/gallery-03.9acd7c84d293f45ac15e.jpg"
                            />
                            <Image
                                className={cx('gallery-img')}
                                src="https://doan-eta.vercel.app/static/media/gallery-07.45ab035583b65864c53a.jpg"
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('gallery-img-group')}>
                            <Image
                                className={cx('gallery-img')}
                                src="https://doan-eta.vercel.app/static/media/gallery-04.4c0ac04026db9075b42b.jpg"
                            />
                            <Image
                                className={cx('gallery-img')}
                                src="https://doan-eta.vercel.app/static/media/gallery-02.c9ae06755eebce595a38.jpg"
                            />
                        </div>
                    </Col>
                </Row>
            </section>
            <section>
                <h3 className={cx('section-slogan')}>
                    <span className={cx('slogan-text')}>Fans Love</span>
                </h3>
                <h2 className={cx('mt-1')}>What our fans say about us</h2>
                <Slide className={cx('mt-2')} navigation={false} numItemPerSlide={3} autoPlay>
                    {HOME_DATA.reviews.map((item, index) => (
                        <div key={index} className={cx('reviews-item')}>
                            <p>{item.desc}</p>
                            <div className={cx('reviews-customer')}>
                                <Image src={item.image} className={cx('customer-img')} />
                                <div>
                                    <h3 className={cx('customer-name')}>{item.name}</h3>
                                    <p className={cx('customer-role')}>{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slide>
            </section>
            <section>
                <Row>
                    <Col xs={24} md={10}>
                        <h3 className={cx('section-slogan')}>
                            <span className={cx('slogan-text')}>Subscribe</span>
                        </h3>
                        <h2 className={cx('mt-1')}>Subscribe us now to get useful traveling information</h2>
                        <div className={cx('mt-3', 'd-flex')}>
                            <Input placeholder="Enter your email" size="large" className={cx('customer-input')} />

                            <Button type="ghost" size="large" className={cx('customer-btn', 'ml-2')}>
                                Subscribe
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
        </div>
    );
}

export default Home;
