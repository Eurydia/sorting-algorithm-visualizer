import { Fragment, ReactNode } from "react";

type IndexDetails = {
	compared: number[];
	swapped: number[];
	pivot: number[];
	leftMostOfUnsortedRegion: number[];
};

export type FrameState = IndexDetails & {
	frameDescription: ReactNode;
	elementStates: number[];
	swapCount: number;
	comparisonCount: number;
};

export const selectionSort = (
	dataset: number[],
	size: number,
	frameStates: FrameState[],
): void => {
	let swapCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDescription: ReactNode,
		indexDetails: IndexDetails,
	): void => {
		frameStates.push({
			frameDescription,
			elementStates: [...dataset],
			swapCount,
			comparisonCount,
			...indexDetails,
		});
	};

	generateFrameState(
		<Fragment>
			Unsorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			pivot: [],
			leftMostOfUnsortedRegion: [],
			compared: [],
			swapped: [],
		},
	);

	for (let offset = 0; offset < size; offset++) {
		let pivotIndex: number = offset;
		generateFrameState(
			<Fragment>
				Consider <code>input[{pivotIndex}]</code>{" "}
				as pivot.
			</Fragment>,
			{
				pivot: [offset],
				leftMostOfUnsortedRegion: [offset],
				compared: [],
				// beginSwapped: [],
				swapped: [],
			},
		);

		for (let i = offset + 1; i < size; i++) {
			comparisonCount++;
			generateFrameState(
				<Fragment>
					Compare <code>input[{pivotIndex}]</code>{" "}
					against <code>input[{i}]</code>.
				</Fragment>,
				{
					pivot: [pivotIndex],
					leftMostOfUnsortedRegion: [offset],
					compared: [i, pivotIndex],
					// beginSwapped: [],
					swapped: [],
				},
			);

			if (dataset[pivotIndex] <= dataset[i]) {
				continue;
			}

			pivotIndex = i;

			generateFrameState(
				<Fragment>
					Consider <code>input[{i}]</code> as the
					new pivot.
				</Fragment>,
				{
					pivot: [pivotIndex],
					leftMostOfUnsortedRegion: [offset],
					compared: [],
					// beginSwapped: [],
					swapped: [],
				},
			);
		}

		const a: number = dataset[offset];
		const b: number = dataset[pivotIndex];
		dataset[offset] = b;
		dataset[pivotIndex] = a;

		swapCount++;
		generateFrameState(
			<Fragment>
				Swapped <code>input[{pivotIndex}]</code>{" "}
				and <code>input[{offset}]</code>.
			</Fragment>,
			{
				pivot: [offset],
				leftMostOfUnsortedRegion: [offset],
				compared: [],
				// beginSwapped: [],
				swapped: [offset, pivotIndex],
			},
		);
	}

	generateFrameState(
		"No more pivot to consider. Sorting complete",
		{
			leftMostOfUnsortedRegion: [],
			pivot: [],
			compared: [],
			// beginSwapped: [],
			swapped: [],
		},
	);

	generateFrameState(
		<Fragment>
			Sorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			leftMostOfUnsortedRegion: [],
			pivot: [],
			compared: [],
			// beginSwapped: [],
			swapped: [],
		},
	);
};
