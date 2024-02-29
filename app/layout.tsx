import { ThemeRegistry } from "app/ThemeRegistry";
import { Children } from "app/types/commonProps";

import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Demonstrates my adeptness in seamlessly integrating images and text with smooth transitions, resulting in visually captivating compositions that enhance the overall aesthetics of the content. By leveraging Next.js image optimization, this showcases my dedication to performance and utilization of cutting-edge technology.",
  title: "Inspirational Poster Generator",
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
