<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import dayjs from 'dayjs';
  import { v4 as uuidV4 } from 'uuid';
  import type { memo } from '../types/index';

  let dialog: HTMLDialogElement;
  let content: string = '';
  let disabled = true;
  let data: memo[] = [];

  const dispatch = createEventDispatcher();
  export function show() {
    dialog.showModal();
  }

  export function close() {
    content = '';
    dialog.close();
  }

  function submit() {
    memoCreate();
    dispatch('complete');
    close();
  }

  function memoCreate() {
    let memo: memo = {
      id: uuidV4(),
      content,
      createdAt: dayjs(),
    };
    let jsonData: string = localStorage.getItem('memoList') ?? null;
    data = jsonData ? JSON.parse(jsonData) : [];
    data.push(memo);

    jsonData = JSON.stringify(data);
    localStorage.setItem('memoList', jsonData);
  }

  $: content ? (disabled = false) : (disabled = true);
</script>

<dialog
  bind:this={dialog}
  class="modal border-solid border border-main rounded-lg p-5 w-[50%]"
>
  <div class="flex flex-col w-full m-auto">
    <textarea
      class="peer w-full border-solid border border-main rounded-lg"
      rows="10"
      bind:value={content}
      required
    />
    <input
      class="mt-2 cursor-pointer p-4 text-center text-white rounded-md
      {disabled ? 'bg-gray-400' : 'bg-main'}"
      type="button"
      value="作成"
      on:click={submit}
      {disabled}
    />
  </div>
</dialog>

<style>
  /* モーダル背景 */
  .modal::backdrop {
    background: rgba(0, 0, 0, 0.4);
  }
</style>
