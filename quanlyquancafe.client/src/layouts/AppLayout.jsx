import React, { useState, useRef } from 'react';
import { Layout, Menu, theme } from 'antd';
import { PieChartOutlined, DesktopOutlined, FileOutlined } from '@ant-design/icons';
import { AppSideMenu } from './AppSideMenu';
import { AppHeader } from './AppHeader';        

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined />, '/option1'),
 
];

export const AppLayout = ({ children }) => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSideMenu />
            <Layout>
                <AppHeader />
                <Content style={{ margin: '16px 16px' }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};