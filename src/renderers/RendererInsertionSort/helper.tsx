import { Fragment, ReactNode } from "react";

type IndexDetails = {
	leftMostUnsorted: number[];
	compared: number[];
	swapped: number[];
	pivot: number[];
};

export type FrameState = IndexDetails & {
	frameDescription: ReactNode;
	elementStates: number[];
	swapCount: number;
	comparisonCount: number;
};

export const insertionSort = (
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
			leftMostUnsorted: [],
			pivot: [],
			compared: [],
			// beginSwapped: [],
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
				leftMostUnsorted: [pivotIndex],
				pivot: [pivotIndex],
				compared: [],
				swapped: [],
			},
		);

		let mover: number = pivotIndex;
		while (
			mover > 0 &&
			dataset[mover - 1] > dataset[mover]
		) {
			comparisonCount++;
			generateFrameState(
				<Fragment>
					Compare <code>input[{mover}]</code>{" "}
					against <code>input[{mover - 1}]</code>.
				</Fragment>,
				{
					leftMostUnsorted: [pivotIndex + 1],
					pivot: [mover],
					compared: [mover, mover - 1],
					// beginSwapped: [],
					swapped: [],
				},
			);

			const temp: number = dataset[mover];
			dataset[mover] = dataset[mover - 1];
			dataset[mover - 1] = temp;

			swapCount++;
			generateFrameState(
				<Fragment>
					Swapped <code>input[{mover}]</code> and{" "}
					<code>input[{mover - 1}]</code>.
				</Fragment>,
				{
					leftMostUnsorted: [pivotIndex + 1],
					pivot: [mover - 1],
					compared: [],
					// beginSwapped: [],
					swapped: [mover, mover - 1],
				},
			);
			mover--;
		}

		if (mover === 0) {
			continue;
		}

		comparisonCount++;
		generateFrameState(
			<Fragment>
				Compare <code>input[{mover}]</code>{" "}
				against <code>input[{mover - 1}]</code>.
			</Fragment>,
			{
				leftMostUnsorted: [pivotIndex + 1],
				pivot: [mover],
				compared: [mover, mover - 1],
				swapped: [],
			},
		);
	}

	generateFrameState(
		"No more pivot to consider. Sorting complete",
		{
			leftMostUnsorted: [],
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
			leftMostUnsorted: [],
			pivot: [],
			compared: [],
			swapped: [],
		},
	);
};
