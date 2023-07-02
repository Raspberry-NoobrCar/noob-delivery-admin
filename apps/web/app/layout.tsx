import { Metadata } from "next";

export const metadata: Metadata = {
  title: "监控 | 菜鸡速递",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: "0"}}>{children}</body>
    </html>
  );
}
