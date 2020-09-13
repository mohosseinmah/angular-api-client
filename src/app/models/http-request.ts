import {HttpHeader} from "./http-header";
import {HttpMethod} from "./http-method";

export interface HttpRequest {
    method: HttpMethod;
    url: string;
    headers: HttpHeader[];
    body?: string;
}