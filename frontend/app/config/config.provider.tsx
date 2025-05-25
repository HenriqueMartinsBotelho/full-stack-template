import React, { useState } from 'react';

import { ConfigContext } from './config.context';

import { getConfig } from '@/app/config/config.config';

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<any>(getConfig());

  return (
    <ConfigContext.Provider
      value={{
        config,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}
