import { serve } from "@novu/framework/next";
import { workflows } from "../../workflows/all-workflows";

// the workflows collection can hold as many workflow definitions as you need
export const { GET, POST, OPTIONS } = serve({
  workflows: workflows,
});