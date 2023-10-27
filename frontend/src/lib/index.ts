// place files you want to import through the `$lib` alias in this folder.
export type PromptMessage = {
	role: string;
	content: string;
};

export type AgentType = {
	name: string;
	about: string;
	position: string;
	age: number;
	gender: string;
	pregnant?: boolean;
	iq: number;
	attractiveness: number;
	promiscuity: number;
	otherAgents: AgentType[];
	chatHistory: PromptMessage[];
};
