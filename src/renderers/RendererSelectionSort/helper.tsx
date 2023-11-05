import { Fragment, ReactNode } from "react";

type ElementState = {
	compared: boolean;
	beingSwapped: boolean;
	swapped: boolean;
	pivot: boolean;
	firstElementOfUnsortedRegion: boolean;
};

export type FrameElement = {
	value: number;
	states: ElementState;
};

export type FrameState = {
	elementStates: FrameElement[];
	swapCount: number;
	comparisonCount: number;
	frameDescription: ReactNode;
};

export const selectionSort = (
	xs: number[],
	size: number,
	frameStates: FrameState[],
): void => {
	let swapCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDescription: ReactNode,
		indexDetails: {
			pivot: number;
			firstElementOfUnsortedRegion: number;
			compared: number[];
			beginSwapped: number[];
			swapped: number[];
		},
	): void => {
		const {
			pivot,
			firstElementOfUnsortedRegion,
			compared,
			beginSwapped,
			swapped,
		} = indexDetails;

		const elementStates: FrameElement[] = [];
		for (let i = 0; i < xs.length; i++) {
			elementStates[i] = {
				value: xs[i],
				states: {
					pivot: i === pivot,
					firstElementOfUnsortedRegion:
						i === firstElementOfUnsortedRegion,
					compared: compared.includes(i),
					beingSwapped: beginSwapped.includes(i),
					swapped: swapped.includes(i),
				},
			};
		}

		frameStates.push({
			frameDescription,
			swapCount,
			comparisonCount,
			elementStates,
		});
	};

	generateFrameState(
		<Fragment>
			Unsorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			pivot: -1,
			firstElementOfUnsortedRegion: -1,
			compared: [],
			beginSwapped: [],
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
				pivot: offset,
				firstElementOfUnsortedRegion: offset,
				compared: [],
				beginSwapped: [],
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
					pivot: pivotIndex,
					firstElementOfUnsortedRegion: offset,
					compared: [i, pivotIndex],
					beginSwapped: [],
					swapped: [],
				},
			);

			if (xs[pivotIndex] > xs[i]) {
				pivotIndex = i;
				generateFrameState(
					<Fragment>
						Consider <code>input[{i}]</code> as
						the new pivot.
					</Fragment>,
					{
						pivot: pivotIndex,
						firstElementOfUnsortedRegion: offset,
						compared: [i, pivotIndex],
						beginSwapped: [],
						swapped: [],
					},
				);
			}
		}

		generateFrameState(
			<Fragment>
				Swapping <code>input[{pivotIndex}]</code>{" "}
				and <code>input[{offset}]</code>.
			</Fragment>,
			{
				pivot: pivotIndex,
				firstElementOfUnsortedRegion: offset,
				compared: [],
				beginSwapped: [offset, pivotIndex],
				swapped: [],
			},
		);
		const temp: number = xs[offset];
		xs[offset] = xs[pivotIndex];
		xs[pivotIndex] = temp;

		swapCount++;
		generateFrameState(
			<Fragment>
				Swapped <code>input[{pivotIndex}]</code>{" "}
				and <code>input[{offset}]</code>.
			</Fragment>,
			{
				pivot: offset,
				firstElementOfUnsortedRegion: offset,
				compared: [],
				beginSwapped: [],
				swapped: [offset, pivotIndex],
			},
		);
	}

	generateFrameState(
		"No more pivot to consider. Sorting complete",
		{
			firstElementOfUnsortedRegion: -1,
			pivot: -1,
			compared: [],
			beginSwapped: [],
			swapped: [],
		},
	);

	generateFrameState(
		<Fragment>
			Sorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			firstElementOfUnsortedRegion: -1,
			pivot: -1,
			compared: [],
			beginSwapped: [],
			swapped: [],
		},
	);
};
