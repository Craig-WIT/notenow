import Rect from "$lib/rect";
import type { Reroute, Transport } from "@sveltejs/kit";

export const reroute: Reroute = ({url}) => {
    if(url.pathname === '/posts') {
        return 'blog';
    }
};

export const transport: Transport = {
    Rect: {
        encode: (value) => value instanceof Rect && [value.x, value.y, value.width, value.height],
        decode: ([x,y,width,height]) => new Rect(x,y,width,height),
    }
}