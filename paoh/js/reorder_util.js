/**
 * Created by pao on 2/14/17.
 */

reorder.debug = false;

reorder.barycentricOrder = (adjacency) => {
    const graph = reorder.mat2graph(adjacency);
    const barycenter = reorder.barycenter_order(graph);
    const improved = reorder.adjacent_exchange(graph,
        barycenter[0],
        barycenter[1]);
    return improved[0];

}

reorder.leafOrder = (adjacency) => {
    const reorderLeafOrder = reorder.optimal_leaf_order()
        .distance(science.stats.distance.manhattan);
    const order = reorderLeafOrder(adjacency);
    return order;
};

reorder.reverseCuthillMckee =  (adjacency) => {

    const graph = reorder.mat2graph(adjacency);

    const rcm = reorder.reverse_cuthill_mckee_order(graph);

    return rcm;
};

reorder.spectralOrder = (adjacency) => {
    const graph = reorder.mat2graph(adjacency);
    const spectral = reorder.barycenter_order(graph);
    return spectral[0];
};
console.log(reorder);
