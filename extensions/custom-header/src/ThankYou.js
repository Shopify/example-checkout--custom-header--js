import { extension } from "@shopify/ui-extensions/checkout";
import renderExtension from './Extension.js';

export default extension("purchase.thank-you.header.render-after", (root) => {
  renderExtension({root});
});
