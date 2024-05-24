import styles from './AboutUsPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import { useContext, useState } from 'react';
import { StoreContext } from '../../store';
import { HiPencil } from 'react-icons/hi';
import { Typography } from 'antd';

const cx = classNames.bind(styles);
const { Title, Paragraph, Text } = Typography;

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
                <Title level={3} className={cx('guide-name')}>
                    {data.guideName}
                </Title>
                <Text className={cx('guide-languages')}>{data.languages}</Text>
                <Text className={cx('guide-intro', { active: showAllDesc })}>{data.description}</Text>
                <Title level={5} onClick={() => setShowAllDesc(!showAllDesc)} className={cx('show-more')}>
                    {showAllDesc ? 'Thu gọn' : 'Xem thêm'}
                </Title>
            </div>
        </div>
    );
}

export default GuideItem;
