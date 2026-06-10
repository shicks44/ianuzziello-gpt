import { ToolForm } from "@/components/ToolForm";

export default function SiteInstructionPage() {
  return (
    <ToolForm
      description="Generate contract-administration ready site instruction wording from provided notes."
      mode="site-instruction"
      title="Create Site Instruction"
    />
  );
}
