<script>
    import {arcData} from "$lib/store/appData.js";

    let orgaName = $derived($arcData['@graph'].find((element) => {
        return element['@type'] === 'Organization';
    }));
</script>

<p class="">Here you find some general information...</p>

<div>Organization: {orgaName.name}</div>

