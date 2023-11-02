export type ElementState = {
	compared: boolean;
	beingSwapped: boolean;
	swapped: boolean;
	lastElementOfUnsortedRegion: boolean;
	bubbling: boolean;
};

export type FrameElement = {
	value: number;
	states: ElementState;
};

export type FrameState = {
	elementStates: FrameElement[];
	frameDescription: string;
	swapCount: number;
	comparisonCount: number;
};

export const bubbleSort = (
	dataset: number[],
	size: number,
	frameStates: FrameState[],
): void => {
	let swapCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDescription: string,
		indexDetails: {
			lastElementofUnsortedRegion: number;
			bubbling: number;
			compared: number[];
			beingswapped: number[];
			swapped: number[];
		},
	): void => {
		const {
			lastElementofUnsortedRegion,
			bubbling,
			compared,
			beingswapped,
			swapped,
		} = indexDetails;

		const elementStates: FrameElement[] = [];
		for (let i = 0; i < dataset.length; i++) {
			elementStates.push({
				value: dataset[i],
				states: {
					compared: compared.includes(i),
					beingSwapped: beingswapped.includes(i),
					swapped: swapped.includes(i),
					lastElementOfUnsortedRegion:
						i === lastElementofUnsortedRegion,
					bubbling: i === bubbling,
				},
			});
		}

		const currFrameState: FrameState = {
			swapCount,
			comparisonCount,
			elementStates,
			frameDescription,
		};
		frameStates.push(currFrameState);
	};

	generateFrameState("Unsorted input.", {
		lastElementofUnsortedRegion: -1,
		bubbling: -1,
		compared: [],
		beingswapped: [],
		swapped: [],
	});

	for (
		let offset = 0;
		offset < size - 1;
		offset++
	) {
		generateFrameState(
			`Set [${
				size - offset - 1
			}] as the last unsorted element.`,
			{
				lastElementofUnsortedRegion:
					size - offset - 1,
				bubbling: -1,
				compared: [],
				beingswapped: [],
				swapped: [],
			},
		);
		for (let k = 0; k < size - offset - 1; k++) {
			comparisonCount++;
			generateFrameState(
				`Compare [${k}] against [${k + 1}].`,
				{
					lastElementofUnsortedRegion:
						size - offset - 1,
					bubbling: k,
					compared: [k, k + 1],
					beingswapped: [],
					swapped: [],
				},
			);

			const a = dataset[k];
			const b = dataset[k + 1];

			if (b >= a) {
				continue;
			}

			generateFrameState(
				`Swap [${k}] and [${k + 1}].`,
				{
					lastElementofUnsortedRegion:
						size - offset - 1,
					bubbling: k,
					compared: [],
					beingswapped: [k, k + 1],
					swapped: [],
				},
			);

			dataset[k] = b;
			dataset[k + 1] = a;
			swapCount++;

			generateFrameState(
				`Swapped [${k}] and [${k + 1}].`,
				{
					lastElementofUnsortedRegion:
						size - offset - 1,
					bubbling: k + 1,
					compared: [],
					beingswapped: [],
					swapped: [k, k + 1],
				},
			);
		}
		generateFrameState(
			"Largest element is the last element of the unsorted region.",
			{
				lastElementofUnsortedRegion:
					size - offset - 1,
				bubbling: size - offset - 1,
				compared: [],
				beingswapped: [],
				swapped: [],
			},
		);
	}

	generateFrameState(
		`Set [0] as the last unsorted element.`,
		{
			lastElementofUnsortedRegion: 0,
			bubbling: -1,
			compared: [],
			beingswapped: [],
			swapped: [],
		},
	);

	generateFrameState(
		`Size of unsorted region is one. Sorting complete.`,
		{
			lastElementofUnsortedRegion: 0,
			bubbling: -1,
			compared: [],
			beingswapped: [],
			swapped: [],
		},
	);

	generateFrameState(
		`Sorted input in ascending order.`,
		{
			lastElementofUnsortedRegion: -1,
			bubbling: -1,
			compared: [],
			beingswapped: [],
			swapped: [],
		},
	);
};
