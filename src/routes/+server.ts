import type { RequestHandler } from '@sveltejs/kit';
export const GET: RequestHandler = async ({ url, fetch }) => {
   // const url = 'https://git.nfdi4plants.org/api/v4/projects/1427/packages/generic/isa_arc_json/0.0.1/arc-ro-crate-metadata.json';
    const target = url.searchParams.get('target');

    if(!target) {
        return new Response(JSON.stringify({
            error: 'Missing target param',
            status: 400,
            headers: { 'Content-Type': 'application/json'}
        }))
    }

    const res = await fetch(target);
    const data = await res.arrayBuffer();
    return new Response(data, {
        headers: {
            'Content-Type': res.headers.get('content-type') ?? 'application/octet-stream',
        }
    });
};