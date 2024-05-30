import { useContext, useEffect, useRef, useState } from 'react';
import styles from './ThemeMode.module.scss';
import classNames from 'classnames/bind';
import Cookies from 'js-cookie';
import { StoreContext, actions } from '../../../store';

const cx = classNames.bind(styles);
function ThemeMode() {
    const [state, dispatch] = useContext(StoreContext);
    const toggleThemeMode = () => {
        Cookies.set('theme', JSON.stringify(state.theme === 'light' ? 'dark' : 'light'));
        dispatch(actions.setTheme(state.theme === 'light' ? 'dark' : 'light'));
        state.setStyleTheme(state.theme === 'light' ? 'dark' : 'light');
    };
    return (
        <>
            <div onClick={toggleThemeMode} className={cx('dark', 'wrapper', { light: state.theme === 'light' })}>
                <div className={cx('zzz1')}></div>
                <div className={cx('zzz2')}></div>
                <div className={cx('zzz3')}></div>
                <div className={cx('planet')}>
                    <div className={cx('face')}>
                        <div className={cx('eye')}>
                            <div className={cx('eye-in')}></div>
                        </div>
                        <div className={cx('mouth')}></div>
                        <div className={cx('eye')}>
                            <div className={cx('eye-in')}></div>
                        </div>
                    </div>
                </div>
                <div className={cx('star', 'pos-star1')}></div>
                <div className={cx('star', 'pos-star2')}></div>
            </div>
            <div className={cx('bg')}></div>
        </>
    );
}

export default ThemeMode;
