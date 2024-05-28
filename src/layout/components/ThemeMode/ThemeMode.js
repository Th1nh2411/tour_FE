import { useContext, useEffect, useRef, useState } from 'react';
import styles from './ThemeMode.module.scss';
import classNames from 'classnames/bind';
import { StoreContext, actions } from '../../../store';

const cx = classNames.bind(styles);
function ThemeMode() {
    const [state, dispatch] = useContext(StoreContext);
    const toggleThemeMode = () => {
        console.log(state);
        dispatch(actions.setTheme(state.theme === 'light' ? 'dark' : 'light'));
        document.documentElement.style.setProperty('--box-shadow-color', state.theme === 'dark' ? '#0003' : '#fff3');
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
