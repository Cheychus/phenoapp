<script>
    import { goto } from "$app/navigation";

</script>


<header class="navbar w-full flex gap-2 h-16 p-2 fixed top-0 left-0 bg-gray-200 z-50">
    <button class="p-4 bg-slate-700 hover:bg-slate-800 rounded-md text-white font-bold" onclick={() => {goto("/")}}>Home</button>
    <button class="p-4 bg-slate-700 hover:bg-slate-800 rounded-md text-white font-bold" onclick={() => {goto("/studies")}}>Studies</button>
    <button class="p-4 bg-slate-700 hover:bg-slate-800 rounded-md text-white font-bold" onclick={() => {goto("/assays")}}>Assays</button>
</header>

