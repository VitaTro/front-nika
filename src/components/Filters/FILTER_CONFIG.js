export const FILTER_CONFIG = {
  earrings: [
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
      key: "length",
      type: "select",
      label: "length",
      source: "availableLengths",
    },
    {
      key: "stoneColor",
      type: "select",
      label: "color",
      source: "availableColors",
    },
  ],

  chains: [
    {
      key: "length",
      type: "select",
      label: "length",
      source: "availableLengths",
    },
  ],

  crosses: [{ key: "withStones", type: "boolean", label: "stone" }],

  pendants: [
    { key: "hasLetter", type: "boolean", label: "letters" },
    { key: "withStones", type: "boolean", label: "stone" },
    {
      key: "stoneColor",
      type: "select",
      label: "color",
      source: "availableColors",
    },
  ],
};
