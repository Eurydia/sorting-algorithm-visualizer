import { Fragment, ReactNode } from "react";

type ElementState = {
	lastElementOfSortedRegion: boolean;
	compared: boolean;
	beingSwapped: boolean;
	swapped: boolean;
	pivot: boolean;
};

export type FrameElement = {
	value: number;
	states: ElementState;
};

export type FrameState = {
	elementStates: FrameElement[];
	frameDescription: ReactNode;
	swapCount: number;
	comparisonCount: number;
};

export const insertionSort = (
	xs: number[],
	size: number,
	frameStates: FrameState[],
): void => {
	let swapCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDescription: ReactNode,
		indexDetails: {
			lastElementOfSortedRegion: number;
			pivot: number;
			compared: number[];
			beginSwapped: number[];
			swapped: number[];
		},
	): void => {
		const {
			pivot,
			compared,
			beginSwapped,
			swapped,
			lastElementOfSortedRegion,
		} = indexDetails;

		const elementStates: FrameElement[] = [];
		for (let i = 0; i < xs.length; i++) {
			elementStates[i] = {
				value: xs[i],
				states: {
					lastElementOfSortedRegion:
						i === lastElementOfSortedRegion,
					compared: compared.includes(i),
					beingSwapped: beginSwapped.includes(i),
					swapped: swapped.includes(i),
					pivot: i === pivot,
				},
			};
		}
		const currFrameState: FrameState = {
			swapCount,
			comparisonCount,
			elementStates,
			frameDescription,
		};
		frameStates.push(currFrameState);
	};

	generateFrameState(
		<Fragment>
			Unsorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			lastElementOfSortedRegion: -1,
			pivot: -1,
			compared: [],
			beginSwapped: [],
			swapped: [],
		},
	);

	for (
		let pivotIndex = 0;
		pivotIndex < size;
		pivotIndex++
	) {
		generateFrameState(
			<Fragment>
				Consider <code>input[{pivotIndex}]</code>{" "}
				as pivot.
			</Fragment>,

			{
				lastElementOfSortedRegion: pivotIndex - 1,
				pivot: pivotIndex,
				compared: [],
				beginSwapped: [],
				swapped: [],
			},
		);

		let mover: number = pivotIndex;
		while (
			mover > 0 &&
			xs[mover - 1] > xs[mover]
		) {
			comparisonCount++;
			generateFrameState(
				<Fragment>
					Compare <code>input[{mover}]</code>{" "}
					against <code>input[{mover - 1}]</code>.
				</Fragment>,
				{
					lastElementOfSortedRegion: pivotIndex,
					pivot: mover,
					compared: [mover, mover - 1],
					beginSwapped: [],
					swapped: [],
				},
			);
			generateFrameState(
				<Fragment>
					Swap <code>input[{mover}]</code> and{" "}
					<code>input[{mover - 1}]</code>.
				</Fragment>,
				{
					lastElementOfSortedRegion: pivotIndex,
					pivot: mover,
					compared: [],
					beginSwapped: [mover, mover - 1],
					swapped: [],
				},
			);

			const temp: number = xs[mover];
			xs[mover] = xs[mover - 1];
			xs[mover - 1] = temp;

			swapCount++;
			generateFrameState(
				<Fragment>
					Swapped <code>input[{mover}]</code> and{" "}
					<code>input[{mover - 1}]</code>.
				</Fragment>,
				{
					lastElementOfSortedRegion: pivotIndex,
					pivot: mover - 1,
					compared: [],
					beginSwapped: [],
					swapped: [mover, mover - 1],
				},
			);
			mover--;
		}

		if (mover === 0) {
			// generateFrameState(
			// 	"No more element to compare. Consider next pivot.",
			// 	{
			// 		lastElementOfSortedRegion: pivotIndex,
			// 		pivot: 0,
			// 		compared: [],
			// 		beginSwapped: [],
			// 		swapped: [],
			// 	},
			// );
			continue;
		}

		comparisonCount++;
		generateFrameState(
			`Comparing [${mover}] against [${
				mover - 1
			}].`,
			{
				lastElementOfSortedRegion: pivotIndex,
				pivot: mover,
				compared: [mover, mover - 1],
				beginSwapped: [],
				swapped: [],
			},
		);
	}

	generateFrameState(
		"No more pivot to consider. Sorting complete",
		{
			lastElementOfSortedRegion: -1,
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
			lastElementOfSortedRegion: -1,
			pivot: -1,
			compared: [],
			beginSwapped: [],
			swapped: [],
		},
	);
};
