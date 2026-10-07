import PreviewPage from "./[slug]/page";

export default async function GenericPreviewPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <PreviewPage
      params={Promise.resolve({ slug: "preview" })}
      searchParams={searchParams}
    />
  );
}
