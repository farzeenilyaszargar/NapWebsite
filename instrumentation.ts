import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

const processors = posthogKey && posthogHost
  ? [
      new BatchLogRecordProcessor({
        exporter: new OTLPLogExporter({
          url: new URL("/i/v1/logs", posthogHost).toString(),
          headers: {
            Authorization: `Bearer ${posthogKey}`,
            "Content-Type": "application/json",
          },
        }),
      }),
    ]
  : [];

export const posthogLoggerProvider = new LoggerProvider({
  resource: resourceFromAttributes({ "service.name": "nap-website" }),
  processors,
});

export const posthogWaitlistLogger = posthogLoggerProvider.getLogger("posthog.waitlist");

export function register() {}
