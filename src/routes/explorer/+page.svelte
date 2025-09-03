<script lang="ts">
import { userSettings } from "$lib/store/UserSettings.svelte";


</script>

<p>You selected Arc: {userSettings.selectedArc?.name}</p>
<p>Use the <strong>tabs</strong> to explore different metadata categories</p>