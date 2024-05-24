import styles from './AboutUsPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useContext, useEffect, useState } from 'react';
import { StoreContext, actions } from '../../store';
import { Button, Col, Form, Row, Typography } from 'antd';
import * as reviewService from '../../services/reviewService';
import * as guideService from '../../services/guideService';
import Slide from '../../components/Slide';
import GuideForm from '../../components/GuideForm';
import GuideItem from './GuideItem';
import TextArea from 'antd/es/input/TextArea';
import { BiPlusCircle } from 'react-icons/bi';
const { Title, Paragraph, Text } = Typography;
const cx = classNames.bind(styles);

function AboutUsPage() {
    const [state, dispatch] = useContext(StoreContext);
    const [loading, setLoading] = useState(false);
    const [top8Reviews, setTop8Reviews] = useState();
    const [allGuide, setAllGuide] = useState();
    const [feedbackForm] = Form.useForm();

    const [showGuideForm, setShowGuideForm] = useState(false);
    const [guideDetail, setGuideDetail] = useState(null);
    const handleSendFeedback = async (values) => {
        setLoading(true);
        const results = await reviewService.sendFeedBack(values);
        if (results) {
            state.showToast('Thành công', results.message);
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
        getTop8Reviews();
        getAllGuide();
    }, []);
    return (
        <>
            {showGuideForm && (
                <GuideForm
                    data={guideDetail}
                    onClose={(edited) => {
                        if (edited === true) {
                            getAllGuide();
                        }
                        setShowGuideForm(false);
                        setGuideDetail(null);
                    }}
                />
            )}
            <div className={cx('wrapper')}>
                <section className={cx('banner-section')}>
                    <div className={cx('banner-content')}>
                        <div className={cx('banner-title')}>Về chúng tôi</div>
                    </div>
                </section>
                <section className={cx('section-wrapper')}>
                    <Title level={3} className={cx('section-slogan')}>
                        <Text className={cx('slogan-text')}>Đồng hành</Text>
                    </Title>
                    <Title className={cx('mt-1')}>
                        Những hướng dẫn viên tận tâm và đầy kinh nghiệm từ đội ngũ của chúng tôi
                    </Title>
                    {state.userInfo && state.userInfo.role === 'admin' && (
                        <Title level={4} onClick={() => setShowGuideForm(true)} className={cx('add-btn')}>
                            <BiPlusCircle className={cx('add-icon')} />
                            Thêm HDV mới
                        </Title>
                    )}
                    <Slide className={cx('mt-2')} navigation={false} numItemPerSlide={3} autoPlay>
                        {allGuide &&
                            allGuide.map((item, index) => (
                                <GuideItem
                                    key={index}
                                    onEdit={() => {
                                        setGuideDetail(item);
                                        setShowGuideForm(true);
                                    }}
                                    data={item}
                                />
                            ))}
                    </Slide>
                </section>
                <section className={cx('section-wrapper')}>
                    <Title level={3} className={cx('section-slogan')}>
                        <Text className={cx('slogan-text')}>Đánh giá</Text>
                    </Title>
                    <Title className={cx('mt-1')}>Những gì khách hàng đánh giá</Title>
                    <Slide className={cx('mt-2')} navigation={false} numItemPerSlide={3} autoPlay>
                        {top8Reviews &&
                            top8Reviews.map((item, index) => (
                                <div key={index} className={cx('review-item')}>
                                    <Text className={cx('review-comment')}>{item.comment}</Text>
                                    <div className={cx('review-customer')}>
                                        <Image src={item.tourInfo.photo} className={cx('review-img')} />

                                        <div>
                                            {item.userInfo && (
                                                <Title level={3} className={cx('customer-name')}>
                                                    {item.userInfo.fullName}
                                                </Title>
                                            )}
                                            <Text className={cx('review-tourName')}>{item.tourInfo.tourName}</Text>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </Slide>
                </section>
                <section className={cx('section-wrapper')}>
                    <Row gutter={[15, 15]} align={'middle'}>
                        <Col xs={24} md={12}>
                            <Title level={3} className={cx('section-slogan')}>
                                <Text className={cx('slogan-text')}>Góp ý</Text>
                            </Title>
                            <Title className={cx('mt-1')}>
                                Góp ý của quý khách có thể giúp chúng tôi có thể phục vụ tốt hơn trong tương lai.
                            </Title>
                            <Form form={feedbackForm} onFinish={handleSendFeedback}>
                                <div className={cx('mt-2', 'd-flex')}>
                                    <Form.Item style={{ flex: 1 }} name="message">
                                        <TextArea placeholder="Bạn nghĩ gì về chúng tôi" size="large" />
                                    </Form.Item>

                                    <Button
                                        loading={loading}
                                        type="primary"
                                        size="large"
                                        className={cx('ml-2')}
                                        htmlType="submit"
                                    >
                                        Gửi góp ý
                                    </Button>
                                </div>
                            </Form>
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
        </>
    );
}

export default AboutUsPage;
