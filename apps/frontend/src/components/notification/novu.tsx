'use client';
import { Inbox } from '@novu/react';
import { dark } from '@novu/react/themes';

export const NotificationBell = ({ userId }: { userId: string }) => {
  console.log('userId', userId);
  return (
    <Inbox
      applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_ID as string}
      subscriberId={userId as string}
      appearance={{
        elements: {
          popoverTrigger: 'novu-popover-trigger',
          bellIcon: 'novu-bell-icon',
          bellContainer: 'novu-bell-container',
          bellDot: 'novu-bell-dot',
        },
        baseTheme: dark,
      }}
    />
  );
};
