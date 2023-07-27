import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '../../../assets/images';
import Image from '../../../components/Image';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import config from '../../../config';
import { useContext, useEffect, useRef, useState } from 'react';
import LocalStorageManager from '../../../utils/LocalStorageManager';

import { StoreContext, actions } from '../../../store';
import { Button, Input } from 'antd';
import { MdOutlineClose, MdOutlineMenu, MdSearch } from 'react-icons/md';
const cx = classNames.bind(styles);

function Header() {
    const localStorageManager = LocalStorageManager.getInstance();
    const [showMenuMb, setShowMenuMb] = useState(false);
    const [searchValue, setSearchVale] = useState('');
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
                        <MdOutlineClose onClick={handleCloseMenuMb} className={cx('close-btn-mb')} />
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
                                to={config.routes.STEMCourse}
                            >
                                Khoá học STEM
                            </NavLink>
                            <NavLink
                                className={(nav) => cx('header-nav_item', { active: nav.isActive })}
                                to={config.routes.course}
                            >
                                Khoá học
                            </NavLink>
                            <NavLink
                                className={(nav) => cx('header-nav_item', { active: nav.isActive })}
                                to={config.routes.mentor}
                            >
                                Mentor
                            </NavLink>
                            <NavLink
                                className={(nav) => cx('header-nav_item', { active: nav.isActive })}
                                to={config.routes.blog}
                            >
                                Blog
                            </NavLink>
                        </nav>
                    </div>
                    <div className={cx('cart-wrapper')}>
                        <h2 className={cx('cart-title')}>Giỏ hàng</h2>
                        <Image src={images.shoppingCart} alt="cart" className={cx('cart-img')} />
                        <span className={cx('cart-quantity')}>3</span>
                    </div>
                    <Input
                        className={cx('search')}
                        suffix={<MdSearch />}
                        value={searchValue}
                        onChange={(e) => setSearchVale(e.target.value)}
                        placeholder="Tìm kiếm khoá học"
                    />
                </div>
            </header>
            <div ref={overlayRef} className={cx('menu-modal-overlay', { active: showMenuMb })}></div>
            <MdOutlineMenu onClick={handleShowMenuMb} className={cx('show-menu-mb')} />
        </>
    );
}

export default Header;
