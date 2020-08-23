import {HttpHeader} from "./http-header";

export interface HttpResponse {
    status: number;
    statusText: string;
    headers: HttpHeader[];
    body?: string;
}