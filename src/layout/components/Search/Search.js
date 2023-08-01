import { useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { AiFillCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import HeadlessTippy from '@tippyjs/react/headless';
import { IoSearch } from 'react-icons/io5';
import { useDebounce } from '../../../hooks';

const cx = classNames.bind(styles);
function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);
    const inputRef = useRef();
    const [showDetailRecipe, setShowDetailRecipe] = useState(false);
    const [detailRecipe, setDetailRecipe] = useState({});
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            // const results = await searchServices.search(debouncedValue, token);
            // setSearchResult(results.recipeJson);

            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);
    const handleClearSearch = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleChangeInput = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    const getDetailRecipeData = async (id) => {
        // const results = await recipeService.getDetailRecipe(id, token);
        // setDetailRecipe(results.recipe);
        setShowDetailRecipe(true);
    };
    const handleSubmit = (e) => {};
    return (
        // Using a wrapper div => solve warning Tippy, creating a newparentNode context
        <>
            <HeadlessTippy
                offset={[0, 5]}
                interactive
                visible={showResult && searchResult && searchResult.length > 0}
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <>
                        <div className={cx('search-result')} tabIndex="-1">
                            <h4 className={cx('search-title')}>Recipes</h4>
                            {searchResult.map((data) => (
                                <div>Item</div>
                            ))}
                        </div>
                    </>
                )}
            >
                <div className={cx('search')}>
                    <div className={cx('search-icon')}>
                        <IoSearch />
                    </div>
                    <input
                        ref={inputRef}
                        onChange={handleChangeInput}
                        value={searchValue}
                        placeholder="Bạn muốn đặt gì..."
                        onFocus={() => setShowResult(true)}
                    />
                    {loading ||
                        (!!searchValue && (
                            <button onClick={handleClearSearch} className={cx('clear')}>
                                <AiFillCloseCircle />
                            </button>
                        ))}

                    {loading && <AiOutlineLoading3Quarters className={cx('loading')} />}
                </div>
            </HeadlessTippy>
        </>
    );
}

export default Search;
