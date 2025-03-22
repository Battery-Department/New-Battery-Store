import { HydrogenComponentProps, HydrogenComponentSchema } from "@weaverse/hydrogen";

// Define the component to display the HTML content
interface CustomHtmlSectionProps extends HydrogenComponentProps {
  htmlContent: string;
}

const CustomHtmlSection = ({ htmlContent }: CustomHtmlSectionProps) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

// Define the schema for the custom HTML section in the Weaverse customizer
export const schema: HydrogenComponentSchema = {
  type: "custom-html-section",  // Custom name for this section
  title: "Custom HTML Section",
  limit: 1,  // Optional, if you want to limit the number of instances
  enabledOn: {
    pages: ["HOME", "PRODUCT", "BLOG"],  // Specify on which pages this can be used
  },
  inspector: [
    {
      group: "Content",  // Group for the Weaverse inspector
      inputs: [
        {
          type: "richtext",  // Richtext input for HTML content
          name: "htmlContent",  // Name for the field
          label: "HTML Content",  // Label shown in the Weaverse UI
          defaultValue: "<p>Default HTML content</p>", // Default HTML if no input is provided
        },
      ],
    },
  ],
};

export default CustomHtmlSection;