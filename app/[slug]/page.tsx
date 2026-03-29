import { SplatViewer } from "@/components/splat/splat-viewer";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black">
      <SplatViewer splat={slug ?? "foo"} />
    </div>
  );
}
