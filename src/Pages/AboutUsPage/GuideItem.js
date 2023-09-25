import styles from './AboutUsPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import { useState } from 'react';

const cx = classNames.bind(styles);

function GuideItem({ data }) {
    const [showAllDesc, setShowAllDesc] = useState(false);

    return (
        <div className={cx('guide-item')}>
            <Image src={data.photo} className={cx('guide-img')} />
            <div className={cx('guide-body')}>
                <h3 className={cx('guide-name')}>{data.guideName}</h3>
                <p className={cx('guide-languages')}>{data.languages}</p>
                <p className={cx('guide-intro', { active: showAllDesc })}>{data.description}</p>
                <h5 onClick={() => setShowAllDesc(!showAllDesc)} className={cx('show-more')}>
                    {showAllDesc ? 'Thu gọn' : 'Xem thêm'}
                </h5>
            </div>
        </div>
    );
}

export default GuideItem;
