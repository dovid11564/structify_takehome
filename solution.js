function countIntersectingChords(radians, identifiers) {
    const startPoints = {};
    const endPoints = {};

    identifiers.forEach((element, index) => {
        if (element.includes('s')) {
            startPoints[element] = index;
        } else if (element.includes('e')) {
            endPoints[element] = index;
        }
    });

    const sortedStartPoints = Object.fromEntries(Object.entries(startPoints).sort());
    const sortedEndPoints = Object.fromEntries(Object.entries(endPoints).sort());

    const sortedChords = new Array(radians.length).fill(0);

    let ptr = 0;

    Object.keys(sortedStartPoints).forEach((key) => {
        sortedChords[ptr] = radians[sortedStartPoints[key]];
        ptr += 2;
    });

    ptr = 1;

    Object.keys(sortedEndPoints).forEach((key) => {
        sortedChords[ptr] = radians[sortedEndPoints[key]];
        ptr += 2;
    });

    const remembered = new Set();
    let intersectionCount = 0;

    for (let i = 0; i < sortedChords.length; i += 2) {
        for (let j = 0; j < sortedChords.length; j += 2) {
            if (i === j) {
                continue;
            }

            if (
                (sortedChords[i] >= sortedChords[j] && sortedChords[i] <= sortedChords[j + 1]) ||
                (sortedChords[i + 1] >= sortedChords[j] && sortedChords[i + 1] <= sortedChords[j + 1])
            ) {
                const intersectingChords = `${sortedChords[i] + sortedChords[i + 1] + sortedChords[j] + sortedChords[j + 1]}`;

                if (!remembered.has(intersectingChords)) {
                    intersectionCount += 1;
                    remembered.add(intersectingChords);
                }
            }
        }
    }

    return `${intersectionCount} intersections found`;
}

console.log(countIntersectingChords([0.78, 1.47, 1.77, 3.92], ["s_1", "s_2", "e_1", "e_2"]));
console.log(countIntersectingChords([0.9, 1.3, 1.70, 2.92], ["s1", "e1", "s2", "e2"]));
