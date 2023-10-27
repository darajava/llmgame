type PromptMessage = {
  role: string;
  content: string;
};

export interface AgentType {
  name: string;
  about: string;
  position: string;
  age: number;
  gender: string;
  pregnant?: boolean;
  iq: number;
  attractiveness: number;
  promiscuity: number;
  otherAgents: Agent[];
  chatHistory: PromptMessage[];
}

export class Agent {
  name: string;
  about: string;
  position: string;
  age: number;
  gender: string;
  pregnant?: boolean;
  iq: number;
  attractiveness: number;
  promiscuity: number;
  chatHistory: PromptMessage[] = [];

  constructor(agent: AgentType) {
    this.name = agent.name;
    this.about = agent.about;
    this.position = agent.position;
    this.age = agent.age;
    this.gender = agent.gender;
    this.pregnant = agent.pregnant;
    this.iq = agent.iq;
    this.attractiveness = agent.attractiveness;
    this.promiscuity = agent.promiscuity;
    this.chatHistory = agent.chatHistory;
  }

  generatePrompt(
    promptMessage: PromptMessage,
    otherAgents: Agent[]
  ): Array<PromptMessage> {
    this.chatHistory.push(promptMessage);

    const prompt = [
      {
        role: "system",
        content: `The following people are all working at MegaCorp:
        
        ${otherAgents.map((agent) => agent.toString()).join("\n\n")}.
        
You are ${this.name}. You respond like ${
          this.name
        } should based on their personality.

        ${this.toString()}

        You are having a conversation with a new employee, Frank. Frank is high ranking and you want to impress him. You may disclose info about the other employees, but do not disclose anything private about them.
        `,
      },
      ...this.chatHistory,
    ];

    for (const message of prompt) {
      console.log(message.content);
    }

    return prompt;
  }

  addToHistory(message: PromptMessage) {
    this.chatHistory.push(message);
  }

  toString(): string {
    return `${this.name} an employee for MegaCorp. ${this.name} is a ${
      this.age
    } year old ${this.gender}. ${this.name}'s IQ is ${this.iq}. ${
      this.name
    }'s rank in the company is ${this.position}. ${this.name} is ${
      this.attractiveness
    }/10 in attractiveness. ${this.name} is ${
      this.promiscuity
    }/10 in promiscuity. ${this.name} is ${
      this.pregnant ? "pregnant" : "not pregnant"
    }.
    
  Some more about ${this.name} including their personality:
  ${this.about}
    `;
  }
}
