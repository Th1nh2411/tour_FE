import React, { useCallback, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import styles from './Slide.module.scss';
import classNames from 'classnames/bind';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
const cx = classNames.bind(styles);

function Slide({
    children,
    numItemPerSlide = 1,
    className,
    autoPlay = false,
    numTransitionItem = 1,
    space = 40,
    navigation = true,
    loop = false,
    thumbSize = 8,
    breakpoints = {},
}) {
    const childrenArray = React.Children.toArray(children);
    const sliderRef = useRef(null);
    const [viewIndex, setViewIndex] = useState(0);
    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.slideNext();
    }, []);

    const breakpointsOptions = {
        767: {
            slidesPerView: 2,
            slidesPerGroup: 1,
        },
        992: {
            slidesPerView: numItemPerSlide,
            slidesPerGroup: numTransitionItem,
        },
        ...breakpoints,
    };
    return (
        <div className={cx('wrapper', className)}>
            <Swiper
                breakpoints={breakpointsOptions}
                loop={loop}
                onBeforeInit={(swiper) => {
                    sliderRef.current = swiper;
                }}
                slidesPerView={1}
                slidesPerGroup={1}
                spaceBetween={space}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    dynamicMainBullets: 3,
                }}
                autoplay={
                    autoPlay && {
                        delay: 2000,
                    }
                }
                modules={[Pagination, Autoplay]}
                speed={1000}
                className={cx('swiper')}
                style={{ '--swiper-pagination-bullet-size': `${thumbSize}px` }}
            >
                {childrenArray.map((item, index) => (
                    <SwiperSlide key={index}>{item}</SwiperSlide>
                ))}
            </Swiper>
            {navigation && (
                <div>
                    <div className={cx('swiper-prev', { disable: viewIndex === 0 })} onClick={handlePrev}>
                        <BsChevronLeft />
                    </div>
                    <div
                        className={cx('swiper-next', { disable: viewIndex === childrenArray.length - numItemPerSlide })}
                        onClick={handleNext}
                    >
                        <BsChevronRight />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Slide;
