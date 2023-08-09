import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '../../../assets/images';
import Image from '../../../components/Image';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import config from '../../../config';
import { useContext, useEffect, useRef, useState } from 'react';
import { StoreContext, actions } from '../../../store';
import { Button, Dropdown, Input, Space, Tooltip } from 'antd';
import { MdOutlineClose, MdOutlineMenu } from 'react-icons/md';
import { IoLogOut, IoPerson } from 'react-icons/io5';
import Cookies from 'js-cookie';
const cx = classNames.bind(styles);

function Header() {
    const [state, dispatch] = useContext(StoreContext);
    const navigate = useNavigate();
    const [showMenuMb, setShowMenuMb] = useState(false);
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
        Cookies.remove('accessToken');
        Cookies.remove('userInfo');
    };

    const dropdownItems = [
        {
            key: '1',
            label: (
                <Link style={{ fontSize: '1.6rem' }} to={config.routes.profile}>
                    Your Profile
                </Link>
            ),
            icon: <IoPerson style={{ fontSize: '1.8rem' }} />,
        },
        {
            key: '2',
            label: (
                <div style={{ fontSize: '1.6rem' }} onClick={handleLogOut}>
                    Log Out
                </div>
            ),
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
                                src="https://www.learnworlds.com/app/themes/learnworlds/dist/images/logo.svg"
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
                                Home
                            </NavLink>
                            <NavLink
                                className={(nav) => cx('header-nav_item', { active: nav.isActive })}
                                to={config.routes.aboutUs}
                            >
                                About
                            </NavLink>

                            <NavLink
                                className={(nav) => cx('header-nav_item', { active: nav.isActive })}
                                to={config.routes.tour}
                            >
                                Tours
                            </NavLink>
                        </nav>
                    </div>
                    {userInfo ? (
                        <div className={cx('align-center')} size={'large'}>
                            <h3>{userInfo.username}</h3>
                            <Dropdown menu={{ items: dropdownItems }}>
                                <Image src={images.shoppingCart} className={cx('cart-img')} />
                            </Dropdown>
                        </div>
                    ) : (
                        <div className={cx('header-actions')}>
                            <Link to={config.routes.login} className={cx('custom-btn')}>
                                Login
                            </Link>
                            <Button
                                onClick={() => navigate(config.routes.register)}
                                size="large"
                                type="ghost"
                                className={cx('custom-btn', 'active')}
                            >
                                Register
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
