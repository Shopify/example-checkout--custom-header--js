import {extension, InlineLayout, Text} from '@shopify/ui-extensions/checkout';

// [START custom-header.render]
export default function renderExtension({root, api}) {
  const {i18n, buyerJourney, shop} = api;
  let assembledSteps = [];
  let activeStepHandle = '';
  const customCart = {
    label: i18n.translate('cart'),
    handle: 'cart',
    to: new URL('/cart', shop.storefrontUrl).href,
  };
  const app = createApp(root);

  buyerJourney.steps.subscribe(steps => {
    renderApp(steps);
  });
  buyerJourney.activeStep.subscribe(activeStep => {
    renderApp(null, activeStep);
  });

  function renderApp(steps = null, activeStep = null) {
    if (steps !== null) {
      assembledSteps = [customCart, ...steps];
    }

    if (activeStep !== null) {
      activeStepHandle = activeStep?.handle;
    }

    const activeStepIndex = assembledSteps.findIndex(
      ({handle}) => handle === activeStepHandle,
    );
    // TODO: uhhhh
    console.log('activeStepIndex', activeStepIndex);
  }

  // TODO: render app with actual stuff
  root.appendChild(app);
}
// [END custom-header.render]

function createApp(root) {
  return root.createComponent(
    InlineLayout,
    {
      accessibilityRole: 'orderedList',
      spacing: 'none',
      maxInlineSize: 'fill',
      border: 'base',
      padding: 'none',
      cornerRadius: 'base',
    },
    [root.createComponent(Text, {}, ['hello world'])],
  );
}
