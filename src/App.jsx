import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import ChatRoom from './views/ChatRoom/ChatRoom';
import Campaigns from './views/Campaigns/Campaigns';
import LeadsDatabase from './views/LeadsDatabase/LeadsDatabase';
import Analytics from './views/Analytics/Analytics';
import './App.css';

// 页面组件映射
const pageComponents = {
  chat: ChatRoom,
  campaigns: Campaigns,
  leads: LeadsDatabase,
  analytics: Analytics,
};

function App() {
  const [activeKey, setActiveKey] = useState('chat');

  // 根据 activeKey 获取对应的页面组件
  const ActivePage = pageComponents[activeKey] || ChatRoom;

  // 获取当前页面的标题用于面包屑
  const pageTitles = {
    chat: 'Active Chat',
    campaigns: 'Campaigns',
    leads: 'Leads Database',
    analytics: 'Analytics',
  };

  return (
    <div className="app-container">
      <Sidebar activeKey={activeKey} onMenuClick={setActiveKey} />
      <div className="main-content">
        <Navigation currentPage={pageTitles[activeKey]} />
        <ActivePage />
      </div>
    </div>
  );
}

export default App;
