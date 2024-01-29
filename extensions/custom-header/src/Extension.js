import {Image} from '@shopify/ui-extensions/checkout';

// [START custom-header.render]
export default function renderExtension({root}) {
  // Create the header's image using an Image component.
  // Replace the source with your own image url. Learn more:
  // https://help.shopify.com/en/manual/shopify-admin/productivity-tools/file-uploads
  const image = root.createComponent(Image, {
    source: 'https://cdn.shopify.com/path/to/image/file_name.png',
  })

  root.appendChild(image);
}
// [END custom-header.render]
