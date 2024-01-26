import { extension } from "@shopify/ui-extensions/checkout";
import renderHeader from './Header.js';

export default extension("purchase.checkout.header.render-after", (root) => {
  renderHeader({root});
});
