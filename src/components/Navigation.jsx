import { Breadcrumb, Button } from 'antd';
import { HomeOutlined, BellOutlined, ShareAltOutlined } from '@ant-design/icons';
import './Navigation.css';

function Navigation({ currentPage = 'Active Chat' }) {
  const breadcrumbItems = [
    {
      title: <HomeOutlined />,
      href: '/',
    },
    {
      title: currentPage,
    },
  ];

  return (
    <div className="navigation">
      <div className="navigation-left">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="navigation-right">
        <Button type="text" icon={<BellOutlined />} className="nav-btn bell-btn" />
        <Button icon={<ShareAltOutlined />} className="nav-btn share-btn">
          Share
        </Button>
      </div>
    </div>
  );
}

export default Navigation;
