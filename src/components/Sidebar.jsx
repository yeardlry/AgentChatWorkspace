import { Menu, Avatar } from 'antd';
import {
  MessageOutlined,
  SendOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  RightOutlined,
  UserOutlined
} from '@ant-design/icons';
import './Sidebar.css';

const menuItems = [
  {
    key: 'chat',
    icon: <MessageOutlined />,
    label: 'Active Chat',
  },
  {
    key: 'campaigns',
    icon: <SendOutlined />,
    label: 'Campaigns',
  },
  {
    key: 'leads',
    icon: <DatabaseOutlined />,
    label: 'Leads Database',
  },
  {
    key: 'analytics',
    icon: <BarChartOutlined />,
    label: 'Analytics',
  },
];

function Sidebar({ activeKey = 'chat', onMenuClick }) {
  return (
    <div className="sidebar">
      {/* 顶部 - Logo区域 */}
      <div className="sidebar-top">
        <div className="logo-box">
          <span className="logo-letter">A</span>
        </div>
        <span className="logo-text">Agent Workspace</span>
      </div>

      {/* 中间 - 菜单 */}
      <div className="sidebar-middle">
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={({ key }) => onMenuClick && onMenuClick(key)}
          items={menuItems}
          className="sidebar-menu"
        />
      </div>

      {/* 底部 - 用户信息 */}
      <div className="sidebar-bottom">
        <Avatar size={40} icon={<UserOutlined />} className="user-avatar" />
        <div className="user-info">
          <div className="username">John Doe</div>
          <div className="plan">Pro plan</div>
        </div>
        <RightOutlined className="arrow-icon" />
      </div>
    </div>
  );
}

export default Sidebar;
