import {
  Divider,
  InlineLayout,
  Link,
  Text,
  View,
} from '@shopify/ui-extensions/checkout';

// [START custom-header.render]
export default function renderExtension({root, api}) {
  const {i18n, buyerJourney, shop} = api;
  let assembledSteps = [];
  let activeStepHandle = null;
  let rendered = false;
  const customCart = {
    label: i18n.translate('cart'),
    handle: 'cart',
    to: new URL('/cart', shop.storefrontUrl).href,
  };

  buyerJourney.steps.subscribe(steps => {
    renderApp(steps);
  });
  buyerJourney.activeStep.subscribe(activeStep => {
    renderApp(null, activeStep);
  });

  function renderApp(steps = null, activeStep = null) {
    if (rendered && activeStep?.handle === activeStepHandle) return;

    if (steps !== null) {
      assembledSteps = [customCart, ...steps];
    }

    if (activeStep !== null && activeStep?.handle !== activeStepHandle) {
      activeStepHandle = activeStep?.handle;
      rendered = false;
    }

    const activeStepIndex = assembledSteps.findIndex(
      ({handle}) => handle === activeStepHandle,
    );

    if (assembledSteps.length > 0 && activeStepHandle != null && !rendered) {
      rendered = true;
      const breadcrumbs = createBreadcrumbs(
        root,
        assembledSteps,
        activeStep,
        activeStepIndex,
      );
      root.replaceChildren(breadcrumbs);
    }
  }
}
// [END custom-header.render]

function createBreadcrumbs(
  root,
  steps = [],
  activeStep = {},
  activeStepIndex = -1,
) {
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
    [...createSteps(root, steps, activeStep, activeStepIndex)],
  );
}

function createSteps(root, steps = [], activeStep = {}, activeStepIndex = -1) {
  return steps.map(({label, handle, to}, index) => {
    return root.createComponent(
      InlineLayout,
      {
        key: handle,
        accessibilityRole: 'listItem',
        blockAlignment: 'center',
        inlineAlignment: 'end',
        spacing: 'none',
        columns: ['fill', 'auto'],
      },
      [
        ...createStep({
          root,
          steps,
          activeStep,
          activeStepIndex,
          index,
          label,
          handle,
          to,
        }),
      ],
    );
  });
}

function createStep({
  root,
  steps,
  activeStep,
  activeStepIndex,
  index,
  label,
  handle,
  to,
}) {
  const step = [
    root.createComponent(
      View,
      {
        background: activeStep?.handle === handle ? 'subdued' : 'transparent',
        cornerRadius:
          index === steps.length - 1
            ? ['none', 'base', 'base', 'none']
            : 'none',
        inlineAlignment: 'center',
        minInlineSize: '100%',
        padding: 'extraTight',
      },
      [
        index < activeStepIndex || handle === 'cart'
          ? root.createComponent(
              Link,
              {
                to: to,
              },
              [label],
            )
          : root.createComponent(
              Text,
              {
                emphasis: activeStep?.handle === handle ? 'bold' : undefined,
                appearance:
                  activeStep?.handle !== handle ? 'subdued' : undefined,
              },
              [label],
            ),
      ],
    ),
    createDivider(root, index, steps),
  ].filter(s => s !== undefined);
  return step;
}

function createDivider(root, index, steps) {
  if (index < steps.length - 1) {
    return root.createComponent(Divider, {direction: 'block'});
  }
}
