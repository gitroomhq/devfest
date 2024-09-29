import { workflow } from '@novu/framework';
import { payloadSchema } from './payloadSchema';
// import { renderEmail } from './email-template/sample-email';

// Define the name for your workflow
const workflowName = 'chat-notification';

// Define the workflow
export const chatNotification = workflow(
  workflowName,
  async ({ step, payload }) => {
    // Define the step for the workflow
    // -----------------------------------in-app step-------------------------------------------------------------------------
    await step.inApp('In App Step', async () => {
      const result: {
        subject: string;
        body: string;
        avatar?: string;
        primaryAction?: {
          label: string;
          url: string;
        };
        secondaryAction?: {
          label: string;
          url: string;
        };
      } = {
        subject: payload.Subject,
        body: payload.Body,
      };

      if (payload.showInAppAvatar) {
        result.avatar = payload.Avatar;
      }

      if (payload.enablePrimaryAction) {
        result.primaryAction = {
          label: payload.inAppPrimaryActionLabel,
          url: payload.inAppPrimaryActionUrl,
        };
      }

      if (payload.enableSecondaryAction) {
        result.secondaryAction = {
          label: payload.inAppSecondaryActionLabel,
          url: payload.inAppSecondaryActionUrl,
        };
      }
      return result;
    });
  },
  {
    payloadSchema: payloadSchema,
  }
);
