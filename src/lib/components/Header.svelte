<script>
    import { goto } from "$app/navigation";

</script>

<header class="bg-gray-300 p-1 flex gap-2">
    <button class="p-2 bg-slate-700 hover:bg-slate-800 rounded-md" onclick={() => {goto("/")}}><div class="p-2 text-white font-bold">Home</div></button>
    <button class="p-2 bg-slate-700 hover:bg-slate-800 rounded-md" onclick={() => {goto("/studies")}}><div class="p-2 text-white font-bold">Studies</div></button>
    <button class="p-2 bg-slate-700 hover:bg-slate-800 rounded-md" onclick={() => {goto("/assays")}}><div class="p-2 text-white font-bold">Assays</div></button>
</header>
