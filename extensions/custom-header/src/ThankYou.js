import {extension} from '@shopify/ui-extensions/checkout';

import renderExtension from './Extension.js';

// [START custom-header.ext-point]
export default extension('purchase.thank-you.header.render-after', (root) => {
  renderExtension({root});
});
// [END custom-header.ext-point]
