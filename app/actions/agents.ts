export interface CreateAgentData {
  name: string;
  model: string;
  capabilities: string[];
  industry: string;
  systemPrompt: string;
}

export async function createAgent(_data: CreateAgentData) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true, message: "Agent created successfully" };
}
