<script lang="ts">
	import type { AgentType, PromptMessage } from "$lib";

  
   export let agent: AgentType;
    export let index: number;
   
    export let messages: PromptMessage[];
 
    export let send: (message: string, index: number) => void;
    export let loading: boolean;

  let value = "";
</script>


<div class="container">

  <h1>{agent.name}</h1>

  {#each messages as message}
    <p
      class="message"
      class:agent={message.role === "assistant"}
    >{message.content}</p>
  {/each}

  <input
    type="text"
    bind:value
    on:keydown={(e) => {
      if (loading) return;

      if (e.key === "Enter") {
        send(value, index);
        value = "";
        
      }
    }}
  />
</div>

<style>

  .container {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
    p {
        margin: 0;
    }
    input {
        display: flex;
    }

    .message {
        padding: 0.5rem;
        margin: 0.5rem;
        border-radius: 0.5rem;
        background-color: #eee;
        max-width: 80%;
    }

    .agent {
        align-self: flex-end;
        background-color: #ddd;
    }
</style>