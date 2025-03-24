import type { HydrogenComponentSchema } from "@weaverse/hydrogen";
import { type VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { forwardRef } from "react";
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

interface CustomHtmlSectionProps
  extends Omit<SectionProps, "backgroundColor">,
    VariantProps<typeof variants> {
  customHtmlContent: string; // Accept HTML content
  alignment: "left" | "center" | "right";
  boxBgColor: string;
  boxTextColor: string;
  boxBorderRadius: number;
}

let CustomHtmlSection = forwardRef<HTMLElement, CustomHtmlSectionProps>((props, ref) => {
  let { customHtmlContent, boxBgColor, boxTextColor, boxBorderRadius, ...rest } = props;

  const handleButtonClick = () => {
    alert('Button clicked!');
  };

  return (
    <Section
      ref={ref}
      {...rest}
      containerClassName={clsx("flex items-start p-6 md:p-12", variants({ alignment: props.alignment }))}
    >
      {/* Here we use JSX for button and other content */}
      <div
        className="w-full h-full object-cover relative z-[-1]"
        style={{ backgroundColor: boxBgColor, borderRadius: `${boxBorderRadius}px` }}
      >
        <div className="text-center" style={{ color: boxTextColor }}>
          {/* Render the custom HTML content */}
          <div dangerouslySetInnerHTML={{ __html: customHtmlContent }} />
          {/* Example of a clickable button */}
          <a
            href="/products"  // Add a valid link for redirection
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all duration-300"
          >
            Shop Now
          </a>
        </div>
      </div>
    </Section>
  );
});

export default CustomHtmlSection;

export let schema: HydrogenComponentSchema = {
  type: "custom-html",  // Change type to custom-html
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
      ],
    },
  ],
};