import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOO_URL,
  consumerKey: process.env.NEXT_PUBLIC_WOO_CONSUMER_KEY || "",
  consumerSecret: process.env.NEXT_PUBLIC_WOO_CONSUMER_SECRET || "",
  version: "wc/v3"
});

export default api;