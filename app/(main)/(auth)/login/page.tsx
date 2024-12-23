import SignIn from "@/components/SignIn";

import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import getHeaderSetting from "@/utils/fetcher/getHeaderSetting";
import { imgUrl } from "@/site-settings/siteUrl";

export async function generateMetadata() {
  const headersetting = await getHeaderSetting();
  const websiteName = capitalizeFirstLetter(headersetting?.website_name);

  return {
    title: `${websiteName} | Login`,
    icons: { icon: imgUrl + headersetting?.favicon },
  };
}

const LoginPage = async () => {
  return <SignIn/>;
};

export default LoginPage;
