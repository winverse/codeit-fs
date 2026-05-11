import React, { lazy, Suspense, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

// TODO: 1. React.lazy를 사용하여 아래 세 컴포넌트를 동적으로 임포트하세요.
// - src/components/settings/ProfileSettings.jsx
// - src/components/settings/AccountSettings.jsx
// - src/components/settings/AppearanceSettings.jsx

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="page-content">
      <h1>Settings</h1>
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          Account
        </button>
        <button
          className={`tab-btn ${activeTab === 'appearance' ? 'active' : ''}`}
          onClick={() => setActiveTab('appearance')}
        >
          Appearance
        </button>
      </div>

      {/* TODO: 2. 이 영역을 Suspense 컴포넌트로 감싸고, 적절한 fallback UI를 제공하세요. */}
      <div className="tab-content-wrapper">
        {/* TODO: 3. activeTab 상태에 따라 지연 로딩된 컴포넌트들을 조건부로 렌더링하세요. */}
        {activeTab === 'profile' && <p>Profile settings should be here.</p>}
        {activeTab === 'account' && <p>Account settings should be here.</p>}
        {activeTab === 'appearance' && <p>Appearance settings should be here.</p>}
      </div>
    </div>
  );
}
