<script lang="ts">
	import { onMount } from "svelte";
  import Chatwindow from "./chatwindow.svelte";
	import type { AgentType } from "$lib";
	import { get } from "svelte/store";



  let agents: AgentType[] = [];

  let loading = false;


  const sendMessage = (prompt: string, index: number) => {
    loading = true;
    fetch("http://localhost:4321/llm/", 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        index,
      }),
    }
      )
      .then((response) => response.json())
      .then((data) => {
        getAgents();
        console.log(agents);
        loading = false;
      });
  }

  const getAgents = () => {
    fetch("http://localhost:4321/llm/agents")
      .then((response) => response.json())
      .then((data) => {
        agents = data;
        console.log(agents);
      });
  }

  onMount(() => {
    getAgents();
  });
</script>

<div class="container">
  {#each agents as agent, i}
    <Chatwindow agent={agent}
      index={i}
      messages={agent.chatHistory}
      send={sendMessage}
      loading={loading}
    />
  {/each}
 
  
</div>  

<style>
  .container {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
  }
  
</style>