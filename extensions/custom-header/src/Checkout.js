import { extension, Banner } from "@shopify/ui-extensions/checkout";

export default extension("purchase.checkout.block.render", (root) => {
  root.appendChild(
    root.createComponent(
      Banner,
      { title: "custom-header" },
      'Welcome'
    )
  );
});
