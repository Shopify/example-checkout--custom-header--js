import {Image, InlineLayout} from '@shopify/ui-extensions/checkout';

// The image URLs to display in the header; replace these with your own images. Learn more:
// https://help.shopify.com/en/manual/shopify-admin/productivity-tools/file-uploads
const images = [
  "https://cdn.shopify.com/s/files/1/0772/5026/5392/files/watering-can-white-300.png",
  "https://cdn.shopify.com/s/files/1/0772/5026/5392/files/snake-300.png",
  "https://cdn.shopify.com/s/files/1/0772/5026/5392/files/office.png",
  "https://cdn.shopify.com/s/files/1/0772/5026/5392/files/monstera-300.png",
  "https://cdn.shopify.com/s/files/1/0772/5026/5392/files/fiddle-fig-300.png",
  "https://cdn.shopify.com/s/files/1/0772/5026/5392/files/cat-palm-300.png",
  "https://cdn.shopify.com/s/files/1/0772/5026/5392/files/living.png",
  "https://cdn.shopify.com/s/files/1/0772/5026/5392/files/watering-can-black-300.png",
];

export default function renderHeader({root}) {
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
