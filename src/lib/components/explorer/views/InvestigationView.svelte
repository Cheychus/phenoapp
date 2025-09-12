<script lang="ts">
    import { arcData } from "$lib/store/ArcData.svelte";
    import type { Comment, Person } from "$lib/types/types";
    import CommentView from "./CommentView.svelte";
    import PersonView from "./PersonView.svelte";

    let { investigation }: { investigation: Investigation } = $props();

    interface Investigation {
        ["@id"]?: string;
        ["@type"]?: string;
        additionalType?: string;
        citation?: any;
        comment?: any;
        creator?: any;
        datePublished?: any;
        hasPart?: any;
        identifier?: string;
        license?: string;
        name?: string;
        description?: string;
    }

    $inspect(investigation);

    function fallback<T>(
        value: T | null | undefined,
        defaultValue: string = "-",
    ) {
        if (value === null || value === undefined) {
            return defaultValue;
        }
        if (typeof value === "object") {
            return JSON.stringify(value);
        }
        return String(value);
    }

    function getCreator(creatorId: string) {
        const creatorObject: Person = arcData.getObjectById(creatorId);
        if (!creatorObject) {
            return null;
        }

        return creatorObject;
    }

    function getComment(commentId: string) {
        const comment: Comment = arcData.getObjectById(commentId);
        if (!comment) {
            return null;
        }

        return comment;
    }
</script>

{#if investigation}
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Investigation:</th>
                    <td> {fallback(investigation.name, "unknown name")}</td>
                </tr>
                <tr>
                    <th>Identifier:</th>
                    <td>
                        {fallback(
                            investigation.identifier,
                            "--- no identifier ---",
                        )}</td
                    >
                </tr>
                <tr>
                    <th>Experiments:</th>
                    <td>
                        {fallback(
                            investigation.hasPart,
                            "--- no experiments ---",
                        )}</td
                    >
                </tr>
                <tr>
                    <th>Description:</th>
                    <td>
                        {fallback(
                            investigation.description,
                            "---no description ---",
                        )}</td
                    >
                </tr>
                <tr>
                    <th>Published at: </th>
                    <td>{fallback(investigation.datePublished)}</td>
                </tr>
                <tr>
                    <th>License:</th>
                    <td>{fallback(investigation.license)}</td>
                </tr>
                <tr>
                    <th>Author:</th>
                    <td>
                        {#if investigation.creator?.["@id"]}
                            <PersonView
                                person={getCreator(
                                    investigation.creator["@id"],
                                )}
                            />
                        {:else}
                            <p>--- no creator ---</p>
                        {/if}
                    </td>
                </tr>
                <tr>
                    <th>Comment:</th>
                    <td>
                        {#if investigation.comment?.["@id"]}
                            <CommentView
                                comment={getComment(
                                    investigation.comment["@id"],
                                )}
                            />
                        {:else}
                            <p>--- no comment ---</p>
                        {/if}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
{:else}
    <p>No investigation data...</p>
{/if}
