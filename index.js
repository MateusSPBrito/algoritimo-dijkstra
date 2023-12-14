const graph = {
    A: { A: 0, B: 35, C: 3, D: Infinity, S: Infinity, T: Infinity },
    B: { A: 16, B: 0, C: 6, D: Infinity, S: Infinity, T: 21 },
    C: { A: Infinity, B: Infinity, C: 0, D: 2, S: Infinity, T: 7 },
    D: { A: 4, B: Infinity, C: 2, D: 0, S: Infinity, T: Infinity },
    S: { A: 15, B: Infinity, C: Infinity, D: 9, S: 0, T: Infinity },
    T: { A: Infinity, B: 5, C: 3, D: Infinity, S: Infinity, T: 0 },
}

const setStartData = (graph, start) => {
    const vertices = Object.keys(graph)
    const visited = [start]
    const { distance, previous } = setDistaceAndPrevious(vertices, start)
    return { vertices, visited, distance, previous }
}

const setDistaceAndPrevious = (vertices, start) => {
    const distance = {}
    const previous = {}
    vertices.forEach(vertex => {
        distance[vertex] = Infinity
        previous[vertex] = null
    });
    distance[start] = 0
    return { distance, previous }
}

const getMin = (distance, visited) => {
    let min
    Object.keys(distance).forEach((vertex) => {
        if (visited.includes(vertex)) return
        if (!min || distance[min] > distance[vertex]) min = vertex
    })
    return min
}

const dijkstra = (graph, start, vertices, visited, distance, previous) => {
    vertices && visited && distance && previous ? undefined :
        { vertices, visited, distance, previous } = setStartData(graph, start)

    if (visited.length == vertices.length) return { distance, previous }

    visited.forEach(curretVertex => {
        const distanceFromCurrent = graph[curretVertex]

        Object.keys(distanceFromCurrent).forEach((vertex) => {
            if (!isFinite(distanceFromCurrent[vertex]) || !isFinite(distanceFromCurrent[vertex]) || distanceFromCurrent[vertex] == 0) return
            if (distance[vertex] > distanceFromCurrent[vertex] + distance[curretVertex]) {
                distance[vertex] = distanceFromCurrent[vertex] + distance[curretVertex]
                previous[vertex] = curretVertex
            }
        })
    });

    const min = getMin(distance, visited)
    visited.push(min)

    return dijkstra(graph, 'S', vertices, visited, distance, previous)
}

const result = (origin, destiny) => {
    const { distance, previous } = dijkstra(graph, origin)
    const path = []

    let curretVertex = destiny
    while (curretVertex != origin) {
        path.unshift({ vertex: curretVertex, distance: distance[curretVertex] })
        curretVertex = previous[curretVertex]
    }
    path.unshift({ vertex: origin, distance: distance[origin] })


    let pathStr = ''
    let distanceValue = 0
    path.forEach((vertex, index) => {
        distanceValue += vertex.distance
        if (index + 1 == path.length) {
            pathStr += `${vertex.vertex}\n`
            return
        }
        pathStr += `${vertex.vertex} \u2192 `
    });

    return 'Menor caminho: ' + pathStr + 'Custo: ' + distanceValue
}

console.log(result('S', 'T'))