import { Fragment } from "react";

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
	frameDescription: React.ReactNode;
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
		frameDescription: React.ReactNode,
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
			<Fragment>
				Set{" "}
				<code>
					input[{`${size - offset - 1}`}]
				</code>{" "}
				as the last unsorted element.
			</Fragment>,
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
				<Fragment>
					Compare <code>input[{`${k}`}]</code>{" "}
					against <code>input[{`${k + 1}`}]</code>
					.
				</Fragment>,
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
				<Fragment>
					Swap <code>input[{`${k}`}]</code> and{" "}
					<code>input[{`${k + 1}`}]</code>.
				</Fragment>,
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
				<Fragment>
					Swapped <code>input[{`${k}`}]</code>{" "}
					against <code>input[{`${k + 1}`}]</code>
					.
				</Fragment>,
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
		<Fragment>
			Set <code>input[0]</code> as the last
			unsorted element.
		</Fragment>,
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
