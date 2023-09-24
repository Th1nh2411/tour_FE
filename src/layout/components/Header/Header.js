import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '../../../assets/images';
import Image from '../../../components/Image';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import config from '../../../config';
import { useContext, useEffect, useRef, useState } from 'react';
import { StoreContext, actions } from '../../../store';
import { Badge, Button, Dropdown, Input, Space, Tooltip } from 'antd';
import { MdArrowDropDown, MdOutlineClose, MdOutlineMenu, MdTour } from 'react-icons/md';
import { IoLogOut, IoPerson } from 'react-icons/io5';
import * as categoryService from '../../../services/categoryService';
import Cookies from 'js-cookie';
const cx = classNames.bind(styles);

function Header() {
    const [state, dispatch] = useContext(StoreContext);
    const navigate = useNavigate();
    const [showMenuMb, setShowMenuMb] = useState(false);
    const [tourCategories, setTourCategories] = useState([]);
    const userInfo = state.userInfo;
    const overlayRef = useRef();
    const handleDocumentClick = (event) => {
        if (overlayRef.current && overlayRef.current.contains(event.target)) {
            setShowMenuMb(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleShowMenuMb = () => {
        setShowMenuMb(!showMenuMb);
    };
    const handleCloseMenuMb = () => {
        setShowMenuMb(false);
    };
    const handleLogOut = () => {
        dispatch(actions.setUserInfo(null));
        dispatch(actions.setUnpaidBooking(null));
        Cookies.remove('accessToken');
        Cookies.remove('userInfo');
        navigate(config.routes.home);
    };
    const getCategories = async () => {
        const results = await categoryService.getAllCategory();
        if (results) {
            setTourCategories(
                results.data.map((item, index) => {
                    return {
                        key: index,
                        label: (
                            <Link
                                style={{ fontSize: '1.8rem', fontWeight: 500, lineHeight: 2 }}
                                to={'/tour/category/' + item._id}
                                state={{ category: item }}
                            >
                                {item.categoryName}
                            </Link>
                        ),
                        icon: <MdTour style={{ fontSize: '2.2rem' }} />,
                    };
                }),
            );
        }
    };
    useEffect(() => {
        getCategories();
    }, []);

    const optionItems = [
        {
            key: '1',
            label: (
                <Badge dot={state.unpaidBooking}>
                    <p style={{ fontSize: '1.6rem' }}>Trang cá nhân</p>
                </Badge>
            ),
            icon: <IoPerson style={{ fontSize: '1.8rem' }} />,
        },
        {
            key: '2',
            label: <p style={{ fontSize: '1.6rem' }}>Đăng xuất</p>,
            icon: <IoLogOut style={{ fontSize: '1.8rem' }} />,
        },
    ];
    return (
        <>
            <header className={cx('wrapper', { active: showMenuMb })}>
                <div className={cx('inner')}>
                    <div className={cx('logo-wrapper')}>
                        <Link to={config.routes.home}>
                            <img
                                src="https://res.cloudinary.com/dgsumh8ih/image/upload/v1693657591/logoFull.png"
                                className={cx('logo')}
                                alt="logo"
                            />
                        </Link>
                        <div onClick={handleCloseMenuMb} className={cx('close-btn-mb')}>
                            <MdOutlineClose />
                        </div>
                    </div>
                    <div className={cx('side-group')}>
                        <nav className={cx('header-nav')}>
                            <NavLink
                                className={(nav) => cx('header-nav_item', { active: nav.isActive })}
                                to={config.routes.home}
                            >
                                Trang chủ
                            </NavLink>
                            <NavLink
                                className={(nav) => cx('header-nav_item', { active: nav.isActive })}
                                to={config.routes.aboutUs}
                            >
                                Về chúng tôi
                            </NavLink>

                            <NavLink
                                className={(nav) => cx('header-nav_item', { active: nav.isActive })}
                                to={config.routes.tour}
                            >
                                <Dropdown placement="bottom" menu={{ items: tourCategories }}>
                                    <span className={cx('align-center')}>
                                        Du lịch <MdArrowDropDown />
                                    </span>
                                </Dropdown>
                            </NavLink>
                            {userInfo && (
                                <>
                                    <NavLink
                                        className={(nav) => cx('header-nav_item', 'mb-nav', { active: nav.isActive })}
                                        to={config.routes.profile}
                                    >
                                        Trang cá nhân
                                    </NavLink>
                                    <div
                                        onClick={() => {
                                            navigate(config.routes.home);
                                            handleLogOut();
                                        }}
                                        className={cx('header-nav_item')}
                                        to={config.routes.home}
                                    >
                                        Đăng xuất
                                    </div>
                                </>
                            )}
                        </nav>
                    </div>
                    {userInfo ? (
                        <div className={cx('header-actions')} size={'large'}>
                            <h3>{userInfo.fullName.split(' ').pop()}</h3>
                            <Dropdown
                                menu={{
                                    items: optionItems,
                                    onClick: ({ key }) => {
                                        if (key == 1) navigate(config.routes.profile);
                                        if (key == 2) handleLogOut();
                                    },
                                }}
                            >
                                <Badge dot={state.unpaidBooking} offset={[-5, 5]}>
                                    <Image src={state.userInfo && state.userInfo.photo} className={cx('user-img')} />
                                </Badge>
                            </Dropdown>
                        </div>
                    ) : (
                        <div className={cx('header-actions')}>
                            <Link to={config.routes.login} className={cx('custom-btn')}>
                                Đăng nhập
                            </Link>
                            <Button
                                onClick={() => navigate(config.routes.register)}
                                size="large"
                                type="ghost"
                                className={cx('custom-btn', 'active')}
                            >
                                Đăng ký
                            </Button>
                        </div>
                    )}
                </div>
            </header>
            <div ref={overlayRef} className={cx('menu-modal-overlay', { active: showMenuMb })}></div>
            <MdOutlineMenu onClick={handleShowMenuMb} className={cx('show-menu-mb')} />
        </>
    );
}

export default Header;
