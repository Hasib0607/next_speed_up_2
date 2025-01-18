import Register from "@/components/Register";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

import { imgUrl } from "@/site-settings/siteUrl";
import getHeaderSetting from "@/utils/fetcher/getHeaderSetting";

export async function generateMetadata() {
  const headersetting = await getHeaderSetting();
  const websiteName = capitalizeFirstLetter(headersetting?.website_name);

  return {
    title: `${websiteName} | Register`,
    icons: { icon: `${imgUrl}${headersetting?.favicon}`},
  };
}

const Signup = async () => {
  return <Register />;
};

export default Signup;
