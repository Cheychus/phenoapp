<script lang="ts">
    export let url = "";
    export let name = "";
</script>

<div class="flex justify-start bg-base-300 w-fit min-w-80 p-2 rounded items-center gap-4">
    <div class="btn btn-primary">Download</div>
    <div class="">
        <a class="text-info" href={url} target="_blank">
            {name}
        </a>
    </div>
    <div class="flex items-center gap-2">
        <div class="">Status: </div>
        <div class="status status-success"></div>
    </div>

</div>