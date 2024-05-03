<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { memo } from '../types/index';

  let dialog: HTMLDialogElement;
  let disabled = true;
  let data: memo[] = [];
  let memo: memo = { id: null, content: null, createdAt: null };

  const dispatch = createEventDispatcher();
  export function show(m: memo) {
    memo = m;
    dialog.showModal();
  }

  export function close() {
    dialog.close();
  }

  function submit() {
    memoUpdate();
    dispatch('complete');
    close();
  }

  function memoUpdate() {
    let jsonData: string = localStorage.getItem('memoList') ?? '';
    data = JSON.parse(jsonData);
    data = data.map((v) => {
      return v.id === memo.id ? memo : v;
    });

    jsonData = JSON.stringify(data);
    localStorage.setItem('memoList', jsonData);
  }

  $: memo?.content ? (disabled = false) : (disabled = true);
</script>

<dialog
  bind:this={dialog}
  class="modal border-solid border border-main rounded-lg p-5 w-[50%]"
>
  <div class="flex flex-col w-full m-auto">
    <textarea
      class="peer w-full border-solid border border-main rounded-lg"
      rows="10"
      bind:value={memo.content}
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
