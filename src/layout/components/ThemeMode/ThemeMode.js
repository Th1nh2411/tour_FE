import { useContext, useEffect, useRef, useState } from 'react';
import styles from './ThemeMode.module.scss';
import classNames from 'classnames/bind';
import { AiFillCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import HeadlessTippy from '@tippyjs/react/headless';
import { IoSearch } from 'react-icons/io5';
import { useDebounce } from '../../../hooks';
import { StoreContext, actions } from '../../../store';

const cx = classNames.bind(styles);
function ThemeMode() {
    const [state, dispatch] = useContext(StoreContext);
    const toggleThemeMode = () => {
        console.log(state);
        dispatch(actions.setTheme(state.theme === 'light' ? 'dark' : 'light'));
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
