import {HttpHeader} from "./http-header";

export interface HttpRequest {
    method: string;
    url: string;
    headers: HttpHeader[];
    body?: string;
}