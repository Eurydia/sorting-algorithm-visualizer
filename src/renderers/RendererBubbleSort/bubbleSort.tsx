import { Fragment, ReactNode } from "react";
import { Link } from "@mui/material";

type IndexDetails = {
	compared: number[];
	swapped: number[];
	rightMostUnsortedElement: number;
	pivot: number;
};

export type FrameState = IndexDetails & {
	frameDescription: ReactNode;
	elementStates: number[];
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
			pivot: -1,
			rightMostUnsortedElement: -1,
			compared: [],
			swapped: [],
		},
	);

	for (
		let offset = 0;
		offset < size - 1;
		offset++
	) {
		for (let i = 0; i < size - offset - 1; i++) {
			comparisonCount++;
			generateFrameState(
				<Fragment>
					Compare <code>input[{i}]</code> against{" "}
					<code>input[{i + 1}]</code>.
				</Fragment>,
				{
					rightMostUnsortedElement:
						size - offset - 1,
					pivot: i,
					compared: [i, i + 1],
					swapped: [],
				},
			);

			const a = dataset[i];
			const b = dataset[i + 1];

			if (b >= a) {
				generateFrameState(
					<Fragment>
						Move pivot to{" "}
						<code>input[{i + 1}]</code>. (
						<Link href="#bubble-sort-additional-explanation-one">
							Explanation
						</Link>
						)
					</Fragment>,
					{
						compared: [i, i + 1],
						swapped: [],
						rightMostUnsortedElement:
							size - offset - 1,
						pivot: i + 1,
					},
				);
				continue;
			}

			dataset[i] = b;
			dataset[i + 1] = a;
			swapCount++;

			generateFrameState(
				<Fragment>
					Swapped <code>input[{i}]</code> and{" "}
					<code>input[{i + 1}]</code>. (
					<Link href="#bubble-sort-additional-explanation-two">
						Explanation
					</Link>
					)
				</Fragment>,
				{
					rightMostUnsortedElement:
						size - offset - 1,
					pivot: i + 1,
					compared: [],
					swapped: [i, i + 1],
				},
			);
		}
		generateFrameState(
			<Fragment>
				Move pivot to <code>input[0]</code>. (
				<Link href="#bubble-sort-additional-explanation-three">
					Explanation
				</Link>
				)
			</Fragment>,
			{
				rightMostUnsortedElement:
					size - offset - 2,
				pivot: 0,
				compared: [],
				swapped: [],
			},
		);
		generateFrameState(
			<Fragment>
				Move pivot to <code>input[0]</code>. (
				<Link href="#bubble-sort-additional-explanation-three">
					Explanation
				</Link>
				)
			</Fragment>,
			{
				rightMostUnsortedElement:
					size - offset - 2,
				pivot: 0,
				compared: [],
				swapped: [],
			},
		);
	}

	generateFrameState(
		<Fragment>
			Sorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		{
			rightMostUnsortedElement: -1,
			pivot: -1,
			compared: [],
			swapped: [],
		},
	);
};
