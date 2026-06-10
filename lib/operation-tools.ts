import {
  ClipboardCheckIcon,
  Code2Icon,
  FileQuestionIcon,
  FileTextIcon,
  MailIcon,
  PenLineIcon,
  TriangleAlertIcon,
} from "lucide-react";

export const operationTools = [
  {
    href: "/site-instruction",
    title: "Create Site Instruction",
    description: "Turn field direction into clear site instruction wording.",
    icon: PenLineIcon,
  },
  {
    href: "/srr",
    title: "SRR Generator",
    description: "Generate professional Site/Surveillance Report Request wording.",
    icon: ClipboardCheckIcon,
  },
  {
    href: "/rfi",
    title: "RFI Generator",
    description: "Draft clear Requests for Information for design or construction clarifications.",
    icon: FileQuestionIcon,
  },
  {
    href: "/deficiency",
    title: "Deficiency Report Generator",
    description: "Create structured deficiency reports with corrective recommendations.",
    icon: TriangleAlertIcon,
  },
  {
    href: "/site-report",
    title: "Site Report Generator",
    description: "Prepare site visit summaries and next actions.",
    icon: FileTextIcon,
  },
  {
    href: "/code-checker",
    title: "Code Citation Checker",
    description: "Validate and format code citation checks from provided references.",
    icon: Code2Icon,
  },
  {
    href: "/email",
    title: "Email Draft Generator",
    description: "Draft professional internal and client-facing emails.",
    icon: MailIcon,
  },
] as const;
