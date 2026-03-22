export const FILTER_CONFIG = {
  earrings: [
    {
      key: "priceSort",
      type: "select",
      label: "sort_price",
      source: "availablePriceSort",
    },

    {
      key: "clasp",
      type: "select",
      label: "type_clasp",
      source: "availableClasps",
    },
    {
      key: "stoneColor",
      type: "select",
      label: "color",
      source: "availableColors",
    },
  ],

  bracelets: [
    {
      key: "priceSort",
      type: "select",
      label: "sort_price",
      source: "availablePriceSort",
    },
    {
      key: "length",
      type: "select",
      label: "length",
      source: "availableLengths",
    },
    {
      key: "width",
      type: "select",
      label: "width",
      source: "availableWidths",
    },
    {
      key: "stoneColor",
      type: "select",
      label: "color",
      source: "availableColors",
    },
    {
      key: "clasp",
      type: "select",
      label: "type_clasp",
      source: "availableBraceletClasps",
    },
  ],

  chains: [
    {
      key: "priceSort",
      type: "select",
      label: "sort_price",
      source: "availablePriceSort",
    },
    {
      key: "length",
      type: "select",
      label: "length",
      source: "availableLengths",
    },
    {
      key: "width",
      type: "select",
      label: "width",
      source: "availableWidths",
    },
    {
      key: "clasp",
      type: "select",
      label: "type_clasp",
      source: "availableChainClasps", // spring, carabiner
    },
  ],

  crosses: [
    {
      key: "priceSort",
      type: "select",
      label: "sort_price",
      source: "availablePriceSort",
    },
    { key: "withStones", type: "boolean", label: "stone" },
    {
      key: "stoneColor",
      type: "select",
      label: "color",
      source: "availableColors",
    },
  ],

  pendants: [
    {
      key: "priceSort",
      type: "select",
      label: "sort_price",
      source: "availablePriceSort",
    },
    { key: "hasLetter", type: "boolean", label: "letters" },
    { key: "withStones", type: "boolean", label: "stone" },
    {
      key: "stoneColor",
      type: "select",
      label: "color",
      source: "availableColors",
    },
  ],
  rings: [
    {
      key: "priceSort",
      type: "select",
      label: "sort_price",
      source: "availablePriceSort",
    },
    {
      key: "ringSize",
      type: "select",
      label: "size",
      source: "availableRingSizes",
    },
    { key: "withStones", type: "boolean", label: "stone" },
    {
      key: "stoneColor",
      type: "select",
      label: "color",
      source: "availableColors",
    },
  ],
  incense: [
    {
      key: "priceSort",
      type: "select",
      label: "sort_price",
      source: "availablePriceSort",
    },
  ],
};
