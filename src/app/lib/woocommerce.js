import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOO_URL_PROD,
  consumerKey: process.env.NEXT_PUBLIC_WOO_CONSUMER_KEY_PROD || "",
  consumerSecret: process.env.NEXT_PUBLIC_WOO_CONSUMER_SECRET_PROD || "",
  version: "wc/v3"
});

export default api;