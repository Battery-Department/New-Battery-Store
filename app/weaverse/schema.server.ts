import type { HydrogenThemeSchema } from "@weaverse/hydrogen";
import { COUNTRIES } from "~/utils/const";
import pkg from "../../package.json";

export let themeSchema: HydrogenThemeSchema = {
  info: {
    version: pkg.version,
    author: "Weaverse",
    name: "Pilot",
    authorProfilePhoto:
      "https://cdn.shopify.com/s/files/1/0838/0052/3057/files/Weaverse_logo_-_3000x_e2fa8c13-dac2-4dcb-a2c2-f7aaf7a58169.png?v=1698245759",
    documentationUrl: "https://weaverse.io/docs",
    supportUrl: "https://weaverse.io/contact",
  },
  i18n: Object.values(COUNTRIES).map((i) => {
    return {
      language: i.language,
      country: i.country,
      label: i.label,
    };
  }),
  defaultLocale: "en-us",
  inspector: [
    {
      group: "Custom sections",  // This groups it under Content, you can change this if needed
      inputs: [
        {
          type: "custom-html",  // This type will trigger the custom HTML input section
          name: "HtmlContent",  // The name of the input field
          label: "HTML Content",  // Label for the field
          defaultValue: "<p>Default HTML content</p>",  // Example of default HTML content
        },
      ],
    },
    {
      group: "Layout",
      inputs: [
        {
          type: "range",
          label: "Page width",
          name: "pageWidth",
          configs: {
            min: 1000,
            max: 1600,
            step: 10,
            unit: "px",
          },
          defaultValue: 1280,
        },
        {
          type: "range",
          label: "Nav height (mobile)",
          name: "navHeightMobile",
          configs: {
            min: 2,
            max: 8,
            step: 1,
            unit: "rem",
          },
          defaultValue: 3,
        },
        {
          type: "range",
          label: "Nav height (tablet)",
          name: "navHeightTablet",
          configs: {
            min: 2,
            max: 8,
            step: 1,
            unit: "rem",
          },
          defaultValue: 4,
        },
        {
          type: "range",
          label: "Nav height (desktop)",
          name: "navHeightDesktop",
          configs: {
            min: 2,
            max: 8,
            step: 1,
            unit: "rem",
          },
          defaultValue: 6,
        },
      ],
    },
    {
      group: "Scrolling announcements",
      inputs: [
        {
          type: "richtext",
          name: "topbarText",
          label: "Content",
          defaultValue: "",
        },
        {
          type: "range",
          label: "Content gap",
          name: "topbarScrollingGap",
          configs: {
            min: 0,
            max: 100,
            step: 1,
            unit: "px",
          },
          defaultValue: 44,
        },
        {
          type: "range",
          label: "Height",
          name: "topbarHeight",
          configs: {
            min: 10,
            max: 100,
            step: 1,
            unit: "px",
          },
          defaultValue: 36,
        },
        {
          type: "range",
          label: "Scrolling speed",
          name: "topbarScrollingSpeed",
          configs: {
            min: 1,
            max: 20,
            step: 1,
            unit: "x",
          },
          defaultValue: 5,
        },
      ],
    },
    {
      group: "Header",
      inputs: [
        {
          type: "select",
          name: "headerWidth",
          label: "Header width",
          configs: {
            options: [
              { value: "full", label: "Full page" },
              { value: "stretch", label: "Stretch" },
              { value: "fixed", label: "Fixed" },
            ],
          },
          defaultValue: "fixed",
        },
        {
          type: "switch",
          label: "Enable transparent header",
          name: "enableTransparentHeader",
          defaultValue: true,
          helpText: "Header is transparent in home page only.",
        },
        {
          type: "image",
          name: "logoData",
          label: "Logo",
          defaultValue: {
            id: "gid://shopify/MediaImage/34144817938616",
            altText: "Logo",
            url: "https://cdn.shopify.com/s/files/1/0623/5095/0584/files/Pilot_logo_b04f1938-06e5-414d-8a47-d5fcca424000.png?v=1697101908",
            width: 320,
            height: 116,
          },
        },
        {
          type: "image",
          name: "transparentLogoData",
          label: "Logo on transparent header",
          defaultValue: {
            id: "gid://shopify/MediaImage/34144817938616",
            altText: "Logo",
            url: "https://cdn.shopify.com/s/files/1/0838/0052/3057/files/transparent_Pilot_logo.png?v=1718763594",
            width: 320,
            height: 116,
          },
          condition: "enableTransparentHeader.eq.true",
        },
        {
          type: "range",
          name: "logoWidth",
          label: "Logo width",
          configs: {
            min: 50,
            max: 500,
            step: 1,
            unit: "px",
          },
          defaultValue: 150,
        },
      ],
    },
    // Add additional sections if needed...
  ],
};