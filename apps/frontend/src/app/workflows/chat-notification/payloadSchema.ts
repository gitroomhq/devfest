import { z } from "zod";

export const payloadSchema = z.object({
  // Notification Fields
  Subject: z.string().default("New Notification"),
  Body: z.string().default("You have a new notification."),
  showInAppAvatar: z.boolean().default(true),
  Avatar: z.string().url().optional().default("https://example.com/default-avatar.png"),
  
  // Primary Action Fields
  enablePrimaryAction: z.boolean().default(false),
  inAppPrimaryActionLabel: z.string().optional().default("View"),
  inAppPrimaryActionUrl: z.string().url().optional().default("https://example.com/action"),
  
  // Secondary Action Fields
  enableSecondaryAction: z.boolean().default(false),
  inAppSecondaryActionLabel: z.string().optional().default("Dismiss"),
  inAppSecondaryActionUrl: z.string().url().optional().default("https://example.com/dismiss"),
});