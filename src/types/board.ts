import { Task } from "./task";

export type BoardType = {
    id: string;
    name: string;
    tasks: Array<Task>;
}