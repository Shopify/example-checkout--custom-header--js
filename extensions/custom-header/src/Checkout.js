import {extension} from '@shopify/ui-extensions/checkout';

import renderExtension from './Extension.js';

export default extension('purchase.checkout.header.render-after', (root) => {
  renderExtension({root});
});
