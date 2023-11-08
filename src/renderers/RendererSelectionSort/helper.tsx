import { Fragment, ReactNode } from "react";

type IndexDetails = {
	compared: number[];
	swapped: number[];
	pivot: number;
	leftMostUnsortedElement: number;
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
			compared: [],
			swapped: [],
			pivot: -1,
			leftMostUnsortedElement: -1,
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
				compared: [],
				swapped: [],
				pivot: offset,
				leftMostUnsortedElement: offset,
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
					compared: [i, pivotIndex],
					swapped: [],
					pivot: pivotIndex,
					leftMostUnsortedElement: offset,
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
					compared: [],
					swapped: [],
					pivot: pivotIndex,
					leftMostUnsortedElement: offset,
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
				compared: [],
				swapped: [offset, pivotIndex],
				pivot: offset,
				leftMostUnsortedElement: offset,
			},
		);
	}

	generateFrameState(
		<Fragment>
			Sorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			compared: [],
			swapped: [],
			leftMostUnsortedElement: -1,
			pivot: -1,
		},
	);
};
