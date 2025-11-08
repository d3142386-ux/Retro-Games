import React, { createContext, useContext, useEffect, useState } from 'react';

type AdProviderAPI = {
  isReady: boolean;
  showBanner: () => void;
  hideBanner: () => void;
  showRewarded: () => Promise<{ rewarded: boolean }>;  
  testMode: boolean;
};

const AdContext = createContext<AdProviderAPI | null>(null);

/**
 * AdProvider — обёртка для интеграции стороннего Ad SDK.
 * - В TEST_MODE показывает заглушки.
 * - Для реальной работы: подключите SDK в index.html или через npm пакет и реализуйте init/запросы ниже.
 * - Конфигурация SDK через env-переменные:
 *    REACT_APP_AD_BANNER_ID, REACT_APP_AD_REWARDED_ID, REACT_APP_AD_TESTMODE=true
 */
export const AdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const testMode = (process.env.REACT_APP_AD_TESTMODE || 'true') === 'true';
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    // Инициализация SDK: примерная заглушка
    if (testMode) {
      setReady(true);
      return;
    }

    // Если вы подключили реальный SDK, инициализируйте его здесь,
    // например: window.AdSDK.init({ bannerId: ..., rewardedId: ... }).then(() => setReady(true))
    // Поскольку у нас нет конкретного SDK, оставляем заглушку:
    setReady(true);
  }, [testMode]);

  const showBanner = () => {
    if (testMode) {
      const evt = new CustomEvent('ad:show-banner');
      window.dispatchEvent(evt);
      return;
    }
    // Реальный вызов SDK: window.AdSDK.showBanner();
  };

  const hideBanner = () => {
    if (testMode) {
      const evt = new CustomEvent('ad:hide-banner');
      window.dispatchEvent(evt);
      return;
    }
    // Реальный вызов SDK: window.AdSDK.hideBanner();
  };

  const showRewarded = async (): Promise<{ rewarded: boolean }> => {
    if (testMode) {
      // симулируем показ рекламы и вознаграждение
      await new Promise((r) => setTimeout(r, 1200));
      return { rewarded: true };
    }

    // Реальная реализация через SDK должна возвращать, получил ли пользователь награду
    // return window.AdSDK.showRewardedAd();
    return { rewarded: false };
  };

  return (
    <AdContext.Provider value={{ isReady, showBanner, hideBanner, showRewarded, testMode }}>
      {children}
    </AdContext.Provider>
  );
};

export const useAds = () => {
  const ctx = useContext(AdContext);
  if (!ctx) throw new Error('useAds must be used inside AdProvider');
  return ctx;
};