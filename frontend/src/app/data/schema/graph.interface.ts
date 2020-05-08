import { Node } from '@data/schema/node.interface';

export interface Graph {
    _id?: string;
    name: string;
    description?: string;
}

export interface NodesGraph {
    _id?: string;
    graph: Graph;
    node_source: Node;
    node_target: Node;
    description?: string;
}
