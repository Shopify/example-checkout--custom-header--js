import {Image, InlineLayout} from '@shopify/ui-extensions/checkout';

// The image URLs to display in the header; replace these with your own images. Learn more:
// https://help.shopify.com/en/manual/shopify-admin/productivity-tools/file-uploads
const images = [
  'https://cdn.shopify.com/path/to/image/file_name_1.png',
  'https://cdn.shopify.com/path/to/image/file_name_2.png',
  'https://cdn.shopify.com/path/to/image/file_name_3.png',
  'https://cdn.shopify.com/path/to/image/file_name_4.png',
  'https://cdn.shopify.com/path/to/image/file_name_5.png',
  'https://cdn.shopify.com/path/to/image/file_name_6.png',
  'https://cdn.shopify.com/path/to/image/file_name_7.png',
  'https://cdn.shopify.com/path/to/image/file_name_8.png',
];

export default function renderExtension({root}) {
  // In case this is a re-render, then remove all previous children
  for (const child of root.children) {
    root.removeChild(child);
  }

  // Create each of the images as an Image component
  const imagesUi = images.map((source, index) => {
    return root.createComponent(Image, {
      key: index,
      source,
      aspectRatio: 1,
    });
  });

  // Create an InlineStack component as a container to render each of the images horizontally
  const header = root.createComponent(
    InlineLayout,
    {
      columns: '1fr',
      spacing: 'loose',
    },
    imagesUi,
  );

  root.appendChild(header);
}
