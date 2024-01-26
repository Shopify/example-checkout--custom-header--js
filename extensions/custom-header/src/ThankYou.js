import { extension } from "@shopify/ui-extensions/checkout";
import renderHeader from './Header.js';

export default extension("purchase.thank-you.header.render-after", (root) => {
  renderHeader({root});
});
