import styles from './AboutUsPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import { useContext, useState } from 'react';
import { StoreContext } from '../../store';
import { HiPencil } from 'react-icons/hi';

const cx = classNames.bind(styles);

function GuideItem({ data, onEdit }) {
    const [showAllDesc, setShowAllDesc] = useState(false);
    const [state, dispatch] = useContext(StoreContext);
    const userInfo = state.userInfo;
    return (
        <div className={cx('guide-item')}>
            <div style={{ position: 'relative' }}>
                <Image src={data.photo} className={cx('guide-img')} />
                {userInfo && userInfo.role === 'admin' && onEdit && (
                    <HiPencil onClick={onEdit} className={cx('edit-icon')} />
                )}
            </div>
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
