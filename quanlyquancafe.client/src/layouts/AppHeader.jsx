import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "../components/avatar/Avatar";
import { CircleButton } from "../components/buttons/CircleButton";
import { FullRoundedTextField } from "../components/textfields/FullRoundedTextField";
import { theme, Layout, Breadcrumb } from "antd";
import {useState, useEffect} from 'react';

const { Header } = Layout;

export const AppHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigateProfile = () => {
        navigate('/profile');
    };
    useEffect(() => {
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const breadcrumbList = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return {
                path: url,
                breadcrumbName: pathSnippets[index].charAt(0).toUpperCase() + pathSnippets[index].slice(1),
            };
        });
        setBreadcrumbItems(breadcrumbList);
    }, [location]);

    const handleBreadcrumbClick = (path) => {
        navigate(path);
    };

    return (
        <Header className='flex items-center justify-between px-6' style={{background: colorBgContainer }}>
            <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems.map((item) => ({
                title: (
                    <span 
                        onClick={() => handleBreadcrumbClick(item.path)} 
                        style={{ cursor: 'pointer' }}
                    >
                        {item.breadcrumbName}
                    </span>
                ),
                key: item.path,
            }))} />
            <div className='flex gap-x-4 items-center'>
                <CircleButton icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>} />
                <Avatar onClick={() => navigateProfile()} />
                <div className='flex flex-col'>
                    <p>Username</p>
                </div>
            </div>
        </Header>
    );
};