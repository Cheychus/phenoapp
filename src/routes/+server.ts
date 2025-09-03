import type { RequestHandler } from '@sveltejs/kit';
export const GET: RequestHandler = async ({ url, fetch }) => {
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