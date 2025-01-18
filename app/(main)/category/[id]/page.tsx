
import { imgUrl } from "@/site-settings/siteUrl";
// helper imports
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import getHeaderSetting from "@/utils/fetcher/getHeaderSetting";

// components imports
import Category from "@/components/Category";

export async function generateMetadata() {
  const headersetting = await getHeaderSetting();
  const websiteName = capitalizeFirstLetter(headersetting?.website_name);

  return {
      title: `${websiteName} | Category`,
      icons: { icon: `${imgUrl}${headersetting?.favicon}` },
  };
}

export default async function SubcategoryPage({
  params
}: {
  params: Promise<{ id: any }>
}) {
  const id = (await params).id

  return <Category catId={id}/>;
}
