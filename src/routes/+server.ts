import type { RequestHandler } from '@sveltejs/kit';
export const GET: RequestHandler = async ({ fetch }) => {
    const url = 'https://git.nfdi4plants.org/api/v4/projects/1427/packages/generic/isa_arc_json/0.0.1/arc-ro-crate-metadata.json';
    const res = await fetch(url);
    const data = await res.json();
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};