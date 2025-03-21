import type { HydrogenComponentSchema } from "@weaverse/hydrogen";
import { type VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { forwardRef } from "react";
import Heading from "~/components/heading";
import Link, { type LinkProps, type LinkStyleProps, linkStylesInputs } from "~/components/link";
import Paragraph from "~/components/paragraph";
import { Section } from "~/components/section";

let variants = cva("", {
  variants: {
    alignment: {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    },
    height: {
      small: "min-h-[40vh]",
      medium: "min-h-[50vh]",
      large: "min-h-[60vh]",
    },
  },
});

interface MapSectionProps
  extends Omit<SectionProps, "backgroundColor">,
    VariantProps<typeof variants>,
    LinkStyleProps {
  heading: string;
  description: string;
  customHtmlContent: string; // Accept HTML content
  alignment: "left" | "center" | "right";
  buttonVariant: LinkProps["variant"];
  buttonText: LinkProps["children"];
  boxBgColor: string;
  boxTextColor: string;
  boxBorderRadius: number;
}

let MapSection = forwardRef<HTMLElement, MapSectionProps>((props, ref) => {
  let {
    height,
    alignment,
    heading,
    description,
    customHtmlContent, // Use custom HTML content
    boxBgColor,
    boxTextColor,
    boxBorderRadius,
    buttonText,
    buttonVariant,
    backgroundColor,
    textColor,
    borderColor,
    backgroundColorHover,
    textColorHover,
    borderColorHover,
    ...rest
  } = props;

  return (
    <Section
      ref={ref}
      {...rest}
      containerClassName={clsx("flex items-start p-6 md:p-12", variants({ height, alignment }))}
    >
      <div
        className="w-full h-full object-cover relative z-[-1]"
        dangerouslySetInnerHTML={{ __html: customHtmlContent }} // Render custom HTML
      />
      <div
        className="w-80 max-w-full shadow-2xl p-8 space-y-3 md:space-y-6"
        style={{
          backgroundColor: boxBgColor,
          color: boxTextColor,
          borderRadius: `${boxBorderRadius}px`,
        }}
      >
        {heading && <Heading content={heading} as="h6" alignment="left" />}
        {description && <Paragraph content={description} />}
        {buttonText && (
          <Link
            to={`https://www.google.com/maps/search/${description}`} // Change this to relevant URL or action
            openInNewTab
            variant={buttonVariant}
            backgroundColor={backgroundColor}
            textColor={textColor}
            borderColor={borderColor}
            backgroundColorHover={backgroundColorHover}
            textColorHover={textColorHover}
            borderColorHover={borderColorHover}
          >
            {buttonText}
          </Link>
        )}
      </div>
    </Section>
  );
});

export default MapSection;

export let schema: HydrogenComponentSchema = {
  type: "map",  // You can keep the type as "map" or change it to something like "custom-html"
  title: "Custom HTML Section",
  inspector: [
    {
      group: "Layout",
      inputs: [
        {
          type: "select",
          name: "height",
          label: "Section height",
          configs: {
            options: [
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ],
          },
          defaultValue: "small",
        },
        {
          type: "toggle-group",
          name: "alignment",
          label: "Content alignment",
          configs: {
            options: [
              { value: "left", label: "Left", icon: "align-start-vertical" },
              { value: "center", label: "Center", icon: "align-center-vertical" },
              { value: "right", label: "Right", icon: "align-end-vertical" },
            ],
          },
          defaultValue: "center",
        },
      ],
    },
    {
      group: "Custom HTML",
      inputs: [
        {
          type: "richtext",  // Use richtext for HTML content input
          label: "Custom HTML Content",
          name: "customHtmlContent",  // Field for custom HTML content
          defaultValue: "<p>Insert your custom HTML content here.</p>",  // Example default content
        },
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Custom HTML Section",
        },
        {
          type: "richtext",
          label: "Description",
          name: "description",
          defaultValue: "<p>Enter your description here.</p>",
        },
        {
          type: "color",
          name: "boxBgColor",
          label: "Background color",
          defaultValue: "#ffffff",
        },
        {
          type: "color",
          name: "boxTextColor",
          label: "Text color",
        },
        {
          type: "range",
          name: "boxBorderRadius",
          label: "Border radius",
          configs: {
            min: 0,
            max: 40,
            step: 2,
            unit: "px",
          },
          defaultValue: 0,
        },
        {
          type: "heading",
          label: "Direction button (optional)",
        },
        {
          type: "text",
          name: "buttonText",
          label: "Button text",
          defaultValue: "Get directions",
        },
        {
          type: "select",
          name: "variant",
          label: "Variant",
          configs: {
            options: [
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Outline", value: "outline" },
              { label: "Link", value: "link" },
            ],
          },
          defaultValue: "primary",
        },
        ...linkStylesInputs,
      ],
    },
  ],
};