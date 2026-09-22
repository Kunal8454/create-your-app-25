import { createFileRoute } from "@tanstack/react-router";
import { VideoAnalyticsScreen } from "@/components/analytics/VideoAnalyticsScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Video Analytics — TikTok Studio Dashboard" },
      {
        name: "description",
        content:
          "A TikTok Studio style video analytics dashboard with views, retention, traffic sources, audience and engagement insights.",
      },
      { property: "og:title", content: "Video Analytics — TikTok Studio Dashboard" },
      {
        property: "og:description",
        content:
          "Explore video views, retention, traffic sources, audience demographics and engagement in a mobile analytics dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <VideoAnalyticsScreen />;
}
