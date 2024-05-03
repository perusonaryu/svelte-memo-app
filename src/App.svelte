<script lang="ts">
  import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  import type { memo } from './types/index';
  import CreateDialog from './components/CreateDialog.svelte';
  import UpdateDialog from './components/UpdateDialog.svelte';
  import Icon from 'mdi-svelte';
  import {
    mdiPlusCircleOutline,
    mdiTrashCanOutline,
    mdiClockOutline,
    mdiPencil,
  } from '@mdi/js';

  onMount(() => {
    load();
  });

  let content: string = '';
  let data: memo[] = [];
  let disabled = true;

  let createDialog: CreateDialog;
  let updateDialog: UpdateDialog;

  function load() {
    let jsonData: string = localStorage.getItem('memoList') ?? '';
    data = JSON.parse(jsonData);
    data = data;
  }

  function memoDelete(k: any) {
    data = data.filter((i) => i.id !== k);
    localStorageUpdate();
  }

  function localStorageUpdate() {
    const jsonData = JSON.stringify(data);
    localStorage.setItem('memoList', jsonData);
  }

  function getTitle(content: string) {
    return content.split('\n')[0]; // 1行目はメモのタイトルにする
  }

  function getDetail(content: string) {
    if (!content.includes('\n')) return ''; // 改行がなければ空文字を返却
    return content.split('\n')[1]; // 2行目のテキストを取得
  }

  $: if (content) {
    disabled = false;
  }
</script>

<main class="md:max-w-[800px] m-4 md:m-auto p-5">
  <h1 class="text-center text-5xl text-main mb-10">memo app</h1>
  <ul class="grid grid-cols-2 md:mx-0 gap-x-6 gap-y-6">
    {#each data as item}
      <li
        class="relative p-2 h-[90px] border-dashed border-2 border-white bg-main/20 shadow-[0_0_0_8px_rgba(136,192,208,0.2)] rounded-lg group"
      >
        <p class="text-xs flex items-center">
          <span class="mr-1"><Icon path={mdiClockOutline} size="12px" /></span>
          {dayjs(item.createdAt).format('YY/MM/DD HH:mm:ss')}
        </p>
        <h2 class="text-2xl whitespace-pre-line truncate">
          {getTitle(item.content)}
        </h2>
        <p class="text-base truncate">{getDetail(item.content)}</p>
        <div
          class="hidden absolute right-2 top-2 cursor-pointer group-hover:inline-block"
        >
          <button
            class="rounded-md"
            on:click={() => updateDialog.show(item)}
          >
            <Icon path={mdiPencil} size="20px" />
          </button>
          <button
            class="text-red-500 rounded-md"
            on:click={() => memoDelete(item.id)}
          >
            <Icon path={mdiTrashCanOutline} size="20px" />
          </button>
        </div>
      </li>
    {/each}
  </ul>
  <button
    on:click={() => createDialog.show()}
    class="fixed bottom-[5%] right-[5%] p-3 text-main/80 hover:text-main/100"
  >
    <Icon path={mdiPlusCircleOutline} size="60px" />
  </button>

  <CreateDialog bind:this={createDialog} on:complete={load} />
  <UpdateDialog bind:this={updateDialog} on:complete={load} />
</main>

<style>
</style>
