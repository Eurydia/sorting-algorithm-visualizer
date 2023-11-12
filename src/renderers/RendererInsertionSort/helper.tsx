import { Link } from "@mui/material";
import { Fragment, ReactNode } from "react";

type IndexDetails = {
	compared: number[];
	swapped: number[];
	leftMostUnsortedElement: number;
	pivot: number;
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
			compared: [],
			swapped: [],
			leftMostUnsortedElement: -1,
			pivot: -1,
		},
	);

	for (
		let pivotIndex = 0;
		pivotIndex < size;
		pivotIndex++
	) {
		let mover: number = pivotIndex;
		while (mover > 0) {
			comparisonCount++;
			generateFrameState(
				<Fragment>
					Compare <code>input[{mover}]</code>{" "}
					against <code>input[{mover - 1}]</code>.
				</Fragment>,
				{
					compared: [mover, mover - 1],
					swapped: [],
					leftMostUnsortedElement: pivotIndex + 1,
					pivot: mover,
				},
			);
			if (dataset[mover] >= dataset[mover - 1]) {
				break;
			}

			const a: number = dataset[mover];
			const b: number = dataset[mover - 1];
			dataset[mover] = b;
			dataset[mover - 1] = a;

			swapCount++;
			generateFrameState(
				<Fragment>
					Swapped <code>input[{mover}]</code> and{" "}
					<code>input[{mover - 1}]</code>. (
					<Link href="#insertion-sort-additional-explanation-two">
						Explanation
					</Link>
					)
				</Fragment>,
				{
					compared: [],
					swapped: [mover, mover - 1],
					leftMostUnsortedElement: pivotIndex + 1,
					pivot: mover - 1,
				},
			);

			mover--;
		}

		generateFrameState(
			<Fragment>
				Moves pivot to the left-most unsorted
				element. (
				<Link href="#insertion-sort-additional-explanation-one">
					Explanation
				</Link>
				)
			</Fragment>,
			{
				compared: [],
				swapped: [],
				leftMostUnsortedElement: pivotIndex + 1,
				pivot: pivotIndex + 1,
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
