import { useEffect, useReducer } from 'react';
import UserContext from './Context';
import reducer from './reducer';
import { actions } from '.';
import LocalStorageManager from '../utils/LocalStorageManager';
import images from '../assets/images';
const courseItems = [
    {
        courseImg: images.netCourse,
        mentorImg: images.mentor1,
        courseName: '.NET Core API',
        level: 1,
        MentorName: 'Trần Hoà Hiệp',
        NumStudent: 92,
        info: ' .NET Core API là một framework được tạo ra bởi Microsoft để xây dựng các ứng dụng web API và microservices microservices microservices',
        reviews: 5,
        price: 1500000,
        numSessions: 28,
        type: 'Offline',
        field: 'Database',
    },
    {
        courseImg: images.phpCourse,
        mentorImg: images.mentor1,
        courseName: 'Khoá học Php',
        level: 1,
        MentorName: 'Trần Hoà Nghĩa',
        NumStudent: 58,
        info: ' Reactjs là một framework được tạo ra bởi Microsoft để xây dựng các ứng dụng web API và microservices microservices microservices',
        reviews: 3,
        price: 2500000,
        numSessions: 24,
        type: 'Online',
        field: 'Back-End',
    },
    {
        courseImg: images.frontendCourse,
        mentorImg: images.mentor3,
        courseName: 'Khoá học frontend',
        level: 2,
        MentorName: 'Trần Hoà Hiệp',
        NumStudent: 77,
        info: ' .NET Core API là một framework được tạo ra bởi Microsoft để xây dựng các ứng dụng web API và microservices microservices microservices',
        reviews: 4,
        price: 3400000,
        numSessions: 25,
        type: 'Offline',
        field: 'Front-End',
    },
    {
        courseImg: images.devopsCourse,
        mentorImg: images.mentor2,
        courseName: 'Khoá học DevOps',
        level: 3,
        MentorName: 'Trần Hoà Hiệp',
        NumStudent: 84,
        info: ' DevOps là một framework được tạo ra bởi Microsoft để xây dựng các ứng dụng web API và microservices microservices microservices',
        reviews: 3,
        price: 3000000,
        numSessions: 14,
        type: 'Online',
        field: 'Database',
    },
    {
        courseImg: images.frontendCourse,
        mentorImg: images.mentor3,
        courseName: 'Khoá học frontend 3',
        level: 4,
        MentorName: 'Trần Hoà Hiệp',
        NumStudent: 112,
        info: ' .NET Core API là một framework được tạo ra bởi Microsoft để xây dựng các ứng dụng web API và microservices microservices microservices',
        reviews: 4,
        price: 1000000,
        numSessions: 22,
        type: 'Offline',
        field: 'Front-End',
    },
    {
        courseImg: images.dotMVCCourse,
        mentorImg: images.mentor2,
        courseName: 'Khoá học DOT NET MVC',
        level: 4,
        MentorName: 'Trần Hoà Hưng',
        NumStudent: 95,
        info: ' DOT NET MVC là một framework được tạo ra bởi Microsoft để xây dựng các ứng dụng web API và microservices microservices microservices',
        reviews: 4,
        price: 2000000,
        numSessions: 20,
        type: 'Online',
        field: 'Back-End',
    },
    {
        courseImg: images.dotMVCCourse,
        mentorImg: images.mentor2,
        courseName: 'Khoá học DOT NET MVC 2',
        level: 3,
        MentorName: 'Trần Hoà Hưng',
        NumStudent: 65,
        info: ' DOT NET MVC là một framework được tạo ra bởi Microsoft để xây dựng các ứng dụng web API và microservices microservices microservices',
        reviews: 3.5,
        price: 1200000,
        numSessions: 24,
        type: 'Online',
        field: 'Front-End',
    },
    {
        courseImg: images.frontendCourse,
        mentorImg: images.mentor3,
        courseName: 'Khoá học frontend 2',
        level: 1,
        MentorName: 'Trần Hoà Hiệp2',
        NumStudent: 89,
        info: ' .NET Core API là một framework được tạo ra bởi Microsoft để xây dựng các ứng dụng web API và microservices microservices microservices',
        reviews: 4.5,
        price: 2700000,
        numSessions: 25,
        type: 'Online',
        field: 'Front-End',
    },
    {
        courseImg: images.devopsCourse,
        mentorImg: images.mentor2,
        courseName: 'Khoá học Back end Expressjs',
        level: 2,
        MentorName: 'Trần Hoà Hiệp',
        NumStudent: 67,
        info: ' Expressjs là một framework được tạo ra bởi Microsoft để xây dựng các ứng dụng web API và microservices microservices microservices',
        reviews: 3,
        price: 1200000,
        numSessions: 22,
        type: 'Offline',
        field: 'Back-End',
    },
];
const mentorItems = [
    {
        name: 'Đỗ Minh Quân',
        img: images.mentor1,
        info: 'Tôi tên là Đỗ Minh Quân. Một Lập trình viên với đam mê mãnh liệt về công nghệ thông tin. Tôi đã làm việc trong ngành này trong một vài năm và có kinh nghiệm làm việc đáng kể',
    },
    {
        name: 'Hà Anh Tài',
        img: images.mentor2,
        info: 'Tôi tên là Hà Anh Tài. Một Lập trình viên với đam mê mãnh liệt về công nghệ thông tin. Tôi đã làm việc trong ngành này trong một vài năm và có kinh nghiệm làm việc đáng kể',
    },
    {
        name: 'Lê Đức Tân',
        img: images.mentor3,
        info: 'Tôi tên là Lê Đức Tân. Một Lập trình viên với đam mê mãnh liệt về công nghệ thông tin. Tôi đã làm việc trong ngành này trong một vài năm và có kinh nghiệm làm việc đáng kể',
    },
    {
        name: 'Lê Mậu Đức',
        img: images.mentor4,
        info: 'Tôi tên là Lê Mậu Đức. Một Lập trình viên với đam mê mãnh liệt về công nghệ thông tin. Tôi đã làm việc trong ngành này trong một vài năm và có kinh nghiệm làm việc đáng kể',
    },
    {
        name: 'Trần Nhật Cường',
        img: images.mentor5,
        info: 'Tôi tên là Trần Nhật Cường. Một Lập trình viên với đam mê mãnh liệt về công nghệ thông tin. Tôi đã làm việc trong ngành này trong một vài năm và có kinh nghiệm làm việc đáng kể',
    },
    {
        name: 'Trần Hoà Hiệp',
        img: images.mentor6,
        info: 'Tôi tên là Trần Hoà Hiệp. Một Lập trình viên với đam mê mãnh liệt về công nghệ thông tin. Tôi đã làm việc trong ngành này trong một vài năm và có kinh nghiệm làm việc đáng kể',
    },
    {
        name: 'Tô Lý Hữu Nhân',
        img: images.mentor7,
        info: 'Tôi tên là Tô Lý Hữu Nhân. Một Lập trình viên với đam mê mãnh liệt về công nghệ thông tin. Tôi đã làm việc trong ngành này trong một vài năm và có kinh nghiệm làm việc đáng kể',
    },
    {
        name: 'Nguyễn Thị Trà My',
        img: images.mentor8,
        info: 'Tôi tên là Nguyễn Thị Trà My. Một Lập trình viên với đam mê mãnh liệt về công nghệ thông tin. Tôi đã làm việc trong ngành này trong một vài năm và có kinh nghiệm làm việc đáng kể',
    },
];
function Provider({ children }) {
    const localStorageManager = LocalStorageManager.getInstance();

    const initState = {
        toast: { show: false, content: '', title: '' },
        courseItems: courseItems,
        mentorItems: mentorItems,
    };
    const [state, dispatch] = useReducer(reducer, initState);

    return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
}

export default Provider;
